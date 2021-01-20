from flask import Flask, request, send_from_directory, send_file
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics
from flask_cors import cross_origin
import math
import os
from sklearn.model_selection import train_test_split
import json
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor
import IPython
import matplotlib
import re
from sklearn.multioutput import MultiOutputRegressor
import shap
import pickle
import urllib.request
shap.initjs()
app = Flask(__name__)
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
import codecs
from google.cloud import storage
import uuid
import config
from matplotlib import pyplot as plt
client = FaunaClient(secret="fnAD7ADnJXACDd2V6pO3pXItGGVXn9FCIQVww8D0")
app = Flask(__name__)
app.config.from_object(config.Config)
indexes = client.query(q.paginate(q.indexes()))
print(client.query(q.get(q.ref(q.collection("datasets"), "287406437783568909"))))
print(indexes)


def read_csv(address):
    return pd.read_csv(address)


def trainLinearModel(X_train, y_train):
    return LinearRegression().fit(X_train, y_train)


def trainRFR(X_train, y_train):
    return RandomForestRegressor().fit(X_train, y_train)


def trainLGB(X_train, y_train, multi):
    if multi:
        wrapper = MultiOutputRegressor(LGBMRegressor())
        return wrapper.fit(X_train, y_train)
    else:
        return LGBMRegressor().fit(X_train, y_train)


def trainXGB(X_train, y_train, multi):
    if multi:
        wrapper = MultiOutputRegressor(XGBRegressor())
        return wrapper.fit(X_train, y_train)
    else:
        return XGBRegressor().fit(X_train, y_train)


def predictResult(y_pred, y_test):
    result = {"r2_score": metrics.r2_score(y_test, y_pred),
              "MSE": metrics.mean_squared_error(y_test, y_pred),
              "MAE": metrics.mean_absolute_error(y_test, y_pred),
              "median_AE": metrics.median_absolute_error(y_test, y_pred),
              "RMSE": math.sqrt(metrics.mean_squared_error(y_test, y_pred))}
    return result


@app.route('/model-recommend', methods=["POST"])
@cross_origin()
def model_Recommend():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    did = req_data['did']
    data=  read_csv(dataUrl)
    X = data.drop(columns=target,axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    modelLinear = trainLinearModel(X_train, y_train)
    modelRFR = trainRFR(X_train, y_train)
    modelLGB = trainLGB(X_train, y_train,multi)
    modelXGB = trainXGB(X_train, y_train,multi)
    y_pred_modelLinear = modelLinear.predict(X_test)
    y_pred_modelRFR = modelRFR.predict(X_test)
    y_pred_modelLGB = modelLGB.predict(X_test)
    y_pred_modelXGB = modelXGB.predict(X_test)

    r2 = [metrics.r2_score(y_test, y_pred_modelLinear), metrics.r2_score(y_test, y_pred_modelRFR),
          metrics.r2_score(y_test, y_pred_modelLGB),
          metrics.r2_score(y_test, y_pred_modelXGB)]
    bestResult = None
    bestModel = None
    maxR2 = r2.index(max(r2))
    if maxR2 == 0:
        bestModel = "Linear"
        bestResult = predictResult(y_test, y_pred_modelLinear)

    elif maxR2 == 1:
        bestModel = "Random Forest"
        bestResult = predictResult(y_test, y_pred_modelRFR)
        if multi==False:
            explainer = shap.TreeExplainer(modelRFR)
            shap_values = explainer.shap_values(X_train)
            force_plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
            shap.save_html('out.html', force_plot)
            shap.summary_plot(shap_values, X_train, show=False)
            plt.savefig("summary.png", dpi=300, bbox_inches='tight')
            plt.figure().clear()
    elif maxR2 == 2:
        bestModel = "Light Gradient Boosting"
        bestResult = predictResult(y_test, y_pred_modelLGB)
        if multi == False:
            explainer = shap.TreeExplainer(modelLGB)
            shap_values = explainer.shap_values(X_train)
            force_plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
            shap.save_html('out.html', force_plot)
            shap.summary_plot(shap_values, X_train, show=False)
            plt.savefig("summary.png", dpi=300, bbox_inches='tight')
            plt.figure().clear()
    elif maxR2 == 3:
        bestModel = "Extreme Gradient Boosting"
        bestResult = predictResult(y_test, y_pred_modelXGB)
        if multi == False:
            explainer = shap.TreeExplainer(modelXGB)
            shap_values = explainer.shap_values(X_train)
            force_plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
            shap.save_html('out.html', force_plot)
            shap.summary_plot(shap_values, X_train, show=False)
            plt.savefig("summary.png", dpi=300, bbox_inches='tight')
            plt.figure().clear()
    else:
        print("error")
    result = {}
    if multi == False:
        storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
        bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)
        uid = str(uuid.uuid1())
        urlsumary = ""
        # urlforce=""
        urlHtml = ""
        with open('summary.png', 'rb') as file:
            page = file.read()

            sumaryname = uid + "summary.png"
            blob = bucket.blob(sumaryname)

            blob.upload_from_string(
                page,
                content_type="png"
            )
            urlsumary = blob.public_url
            print("done")
        # with open('force.png', 'rb') as file:
        #     page = file.read()
        #
        #     sumaryname =uid  + "force.png"
        #     blob = bucket.blob(sumaryname)
        #
        #     blob.upload_from_string(
        #         page,
        #         content_type="png"
        #     )
        #     urlforce=blob.public_url
        #     print("done")
        with open('out.html', encoding="utf8") as file:
            page = file.read()

            htmlname = uid + "out.html"
            blob = bucket.blob(htmlname)

            blob.upload_from_string(
                page,
                content_type="html"
            )
            urlHtml = blob.public_url
            print("done")
        result = {
            "best_model": bestModel,
            "best_model_shap":{ "force_plot_html": urlHtml,
                          "summary_plot":urlsumary},
            "bestResult": bestResult,
            "result": [{"model": "Linear", "result": predictResult(y_test, y_pred_modelLinear)},
                       {"model": "Random Forest", "result": predictResult(y_test, y_pred_modelRFR)},
                       {"model": "Light Gradient Boosting", "result": predictResult(y_test, y_pred_modelLGB)},
                       {"model": "Extreme Gradient Boosting", "result": predictResult(y_test, y_pred_modelXGB)}]
        }
    else:
        result = {
            "best_model": bestModel,
            "bestResult": bestResult,
            "result": [{"model": "Linear", "result": predictResult(y_test, y_pred_modelLinear)},
                       {"model": "Random Forest", "result": predictResult(y_test, y_pred_modelRFR)},
                       {"model": "Light Gradient Boosting", "result": predictResult(y_test, y_pred_modelLGB)},
                       {"model": "Extreme Gradient Boosting", "result": predictResult(y_test, y_pred_modelXGB)}]
        }
    json_object = json.dumps(result, indent=4)

    client.query(
        q.update(
            q.ref(q.collection("datasets"),did ),
            {"data": {"model_recommend":[result]}}
        ))

    return json_object


@app.route('/train-linear', methods=["POST"])
@cross_origin()
def trainLinear():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainLinearModel(X_train, y_train)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object


@app.route('/train-lgb', methods=["POST"])
@cross_origin()
def trainLGBR():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainLGB(X_train, y_train,multi)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object
# fnAD7ADnJXACDd2V6pO3pXItGGVXn9FCIQVww8D0
@app.route('/train-lgb-shap', methods=["POST"])
@cross_origin()
def trainLGBRShap():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainLGB(X_train, y_train,multi)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object

@app.route('/shap-value', methods=["POST"])
@cross_origin()
def trainShapValue():
    req_data = request.get_json()
    # try:
    dataUrl = req_data['dataUrl']
    sav_url= req_data['sav_url']
    target = req_data['target']
    size = req_data['size']
    did = req_data['did']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    model = pickle.load(open(sav_url, 'rb'))
    model_name = type(model).__name__
    print(model_name)
    support_model = ['LGBMRegressor','XGBRegressor','RandomForestRegressor']
    lenTranset =len(X_train)
    if model_name in support_model:
        shapcalrows= 150
        if lenTranset>shapcalrows:
            X_train=X_train.head(shapcalrows)
        print("start")
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X_train)
        force_plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
        shap.save_html('out.html', force_plot)
        shap.summary_plot(shap_values,X_train,show=False)
        plt.savefig("summary.png", dpi = 300, bbox_inches = 'tight')
        plt.figure().clear()
        #
        # shap.force_plot(explainer.expected_value, shap_values[0, :], X_train.iloc[0, :],show=False)
        # plt.savefig("force.png")
        storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
        bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)
        uid = str(uuid.uuid1())
        urlsumary=""
        urlHtml= ""
        with open('summary.png', 'rb') as file:
            page = file.read()

            sumaryname =uid  + "summary.png"
            blob = bucket.blob(sumaryname)

            blob.upload_from_string(
                page,
                content_type="png"
            )
            urlsumary=blob.public_url
            print("done")
        with open('out.html', encoding="utf8") as file:
            page = file.read()

            htmlname = uid + "out.html"
            blob = bucket.blob(htmlname)

            blob.upload_from_string(
                page,
                content_type="html"
            )
            urlHtml= blob.public_url
            print("done")
        jsonObject = {
            # "force_plot": urlforce,
        "force_plot_html": urlHtml,
                      "summary_plot":urlsumary}
            # os.remove("out.html")
        json_object = json.dumps(jsonObject, indent=4)
        if len(did)>0:
            client.query(
                q.update(
                    q.ref(q.collection("models"), did),
                    {"data": {"shap": [jsonObject]}}
                ))
        return json_object
    else:
        errormess ={
            "message":"This model is unsupported",
            "model":model_name
        }
        json_object = json.dumps(errormess, indent=4)
        return json_object
@app.route('/data-distribution', methods=["POST"])
@cross_origin()
def dataDistribute():
    req_data = request.get_json()
    # try:
    dataUrl = req_data['dataUrl']
    did = req_data['did']
    data = read_csv(dataUrl)
    plt.figure(figsize=(25, 15), constrained_layout=False)
    data.hist(figsize=(25, 15))
    plt.savefig("distribution.png", dpi = 200, bbox_inches = 'tight')
    storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
    bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)
    uid = str(uuid.uuid1())
    with open('distribution.png', 'rb') as file:
        page = file.read()

        distributionName = uid + "distribution.png"
        blob = bucket.blob(distributionName)

        blob.upload_from_string(
            page,
            content_type="png"
        )
    img_url = blob.public_url

    client.query(
        q.update(
            q.ref(q.collection("datasets"), did),
            {"data": {"distribution": img_url}}
        ))
    return send_file("distribution.png", mimetype='image/png')

@app.route('/train-xgb', methods=["POST"])
@cross_origin()
def trainXGBR():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainXGB(X_train, y_train,multi)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_train)
    plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
    shap.save_html('out.html', plot)
    storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
    bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)

    with open('out.html', encoding="utf8") as file:
        page = file.read()
        name = str(uuid.uuid1()) + "out.html"
        blob = bucket.blob(name)

        blob.upload_from_string(
            page,
            content_type="html"
        )

        # os.remove("out.html")
    return blob.public_url


@app.route('/train-xgb-shap', methods=["GET","POST"])
@cross_origin()
def trainXGBRShap():
    req_data = request.get_json()
    multi = False
    # try:
    dataUrl = req_data['dataUrl']
    target = req_data['target']
    if len(target) > 1:
        multi = True
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainXGB(X_train, y_train,multi)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_train)
    plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
    shap.save_html('out.html',plot)
    storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
    bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)

    with open('out.html', encoding="utf8") as file:
        page = file.read()
        name = str(uuid.uuid1())+"out.html"
        blob = bucket.blob(name)

        blob.upload_from_string(
            page,
            content_type="html"
        )

        # os.remove("out.html")
    return blob.public_url


@app.route('/shap-get', methods=["GET"])
@cross_origin()
def getShap():
    with open('out.html', encoding="utf8") as file:
        page = file.read()
        # os.remove("out.html")
    return page

@app.route('/train-random-forest', methods=["POST"])
@cross_origin()
def trainRandomForest():
    req_data = request.get_json()

    dataUrl = req_data['dataUrl']
    target = req_data['target']
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainRFR(X_train, y_train)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object
@app.route('/train-random-forest-shap', methods=["POST"])
@cross_origin()
def trainRandomForestShap():
    req_data = request.get_json()

    dataUrl = req_data['dataUrl']
    target = req_data['target']
    size = req_data['size']
    data = read_csv(dataUrl)
    X = data.drop(columns=target, axis=1)
    y = data[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainRFR(X_train, y_train)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_train)
    plot = shap.force_plot(explainer.expected_value, shap_values, X_train)
    shap.save_html('out.html', plot)
    storage_client = storage.Client.from_service_account_json(config.Config.GOOGLE_APPLICATION_CREDENTIALS)
    bucket = storage_client.get_bucket(config.Config.CLOUD_STORAGE_BUCKET)

    with open('out.html', encoding="utf8") as file:
        page = file.read()
        name = str(uuid.uuid1()) + "out.html"
        blob = bucket.blob(name)

        blob.upload_from_string(
            page,
            content_type="html"
        )

        # os.remove("out.html")
    return blob.public_url

@app.route('/csv-to-json', methods=["GET","POST"])
@cross_origin()
def csvToJson():
    req_data = request.get_json()
    url = req_data['url']
    csvfile= pd.read_csv(url)
    print(csvfile)
    return csvfile.to_json(orient='records')
@app.route('/favicon.ico')
@cross_origin()
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run()
