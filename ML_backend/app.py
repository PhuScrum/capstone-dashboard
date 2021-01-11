from flask import Flask, request, send_from_directory
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
import re
from sklearn.multioutput import MultiOutputRegressor
app = Flask(__name__)
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient

client = FaunaClient(secret="fnAD7ADnJXACDd2V6pO3pXItGGVXn9FCIQVww8D0")

indexes = client.query(q.paginate(q.indexes()))

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
    elif maxR2 == 2:
        bestModel = "Light Gradient Boosting"
        bestResult = predictResult(y_test, y_pred_modelLGB)
    elif maxR2 == 3:
        bestModel = "Extreme Gradient Boosting"
        bestResult = predictResult(y_test, y_pred_modelXGB)
    else:
        print("error")
    result = {
        "best_model": bestModel,
        "bestResult": bestResult,
        "result": [{"model": "Linear", "result": predictResult(y_test, y_pred_modelLinear)},
                   {"model": "Random Forest", "result": predictResult(y_test, y_pred_modelRFR)},
                   {"model": "Light Gradient Boosting", "result": predictResult(y_test, y_pred_modelLGB)},
                   {"model": "Extreme Gradient Boosting", "result": predictResult(y_test, y_pred_modelXGB)}]
    }
    json_object = json.dumps(result, indent=4)
    return json_object


@app.route('/train-linear', methods=["POST"])
@cross_origin()
def trainLinear():
    req_data = request.get_json()

    # try:
    trainUrl = req_data['train']
    testUrl = req_data['test']
    size = req_data['size']
    X = read_csv(trainUrl)
    y = read_csv(testUrl)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
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

    # try:
    trainUrl = req_data['train']
    testUrl = req_data['test']
    size = req_data['size']
    X = read_csv(trainUrl)
    y = read_csv(testUrl)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    X_train = X_train.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    X_test = X_test.rename(columns=lambda x: re.sub('[^A-Za-z0-9_]+', '', x))
    model = trainLGB(X_train, y_train)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object
# fnAD7ADnJXACDd2V6pO3pXItGGVXn9FCIQVww8D0

@app.route('/train-xgb', methods=["POST"])
@cross_origin()
def trainXGBR():
    req_data = request.get_json()

    # try:
    trainUrl = req_data['train']
    testUrl = req_data['test']
    size = req_data['size']
    X = read_csv(trainUrl)
    y = read_csv(testUrl)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    model = trainXGB(X_train, y_train)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:s
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object


@app.route('/train-random-forest', methods=["POST"])
@cross_origin()
def trainRandomForest():
    req_data = request.get_json()

    # try:
    trainUrl = req_data['train']
    testUrl = req_data['test']
    size = req_data['size']
    X = read_csv(trainUrl)
    y = read_csv(testUrl)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, shuffle=False)
    model = trainRFR(X_train, y_train)
    y_pred = model.predict(X_test)
    result = predictResult(y_test, y_pred)

    # except:
    #     print("error")
    json_object = json.dumps(result, indent=4)
    return json_object


@app.route('/favicon.ico')
@cross_origin()
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run()