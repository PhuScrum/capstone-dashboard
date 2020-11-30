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
    data_by_crops: Array<Crop>
}

export interface DATASETS {
  key: number,
  title: string,
  description: string,
  features: number,
  length: number,
}
