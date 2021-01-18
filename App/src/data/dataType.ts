interface CropData {
    year: number[],
    production: number[],
    yield: number[]
}

export interface Crop {
    name: string,
    data: CropData,
    prediction: CropData
}

export interface Data {
    name: string,
    r2_score: number,
    rmse: number,
    mse: number,
    mae: number,
    median_absolute_error: number,
    data_by_crops: Array<Crop>,
    url: string,
    fileName: string,
    originalName: string,
    slug: string,
    version: string,
    note: string,
    user: string,
    type: string
}

export interface DATASETS {
  date: string,
  url: string,
  version: string,
  fileName: string,
  originalName: string,
  note: string,
  features: number,
  length: number,
  user: string,
  model_recommend: any[],
  id: string
}

export interface PROFILE {
    email: string,
    username: string,
    name: string,
    id: string
}

