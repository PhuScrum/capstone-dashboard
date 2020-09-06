interface Predict {
  "year": Array<Number>,
  "data":Array<Crop>
}

interface Crop {
  name:String,
  production: Array<Number>,
  yield: Array<Number>
}

interface State {
  name:String,
  data: Array<Crop>,
  predict: Predict
}

export interface Model {
  name: String,
  type: String,
  R2_Score: String,
  MSE: String,
  RMSE: String,
  Mean_Absolute_Error: String,
  Median_Absolute_Error: String,
  taget: Array<String>,
  data: {
      years: Array<Number>,
      state: Array<State>
  }
}

