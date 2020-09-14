interface CropData {
    year: number[],
    production: number[],
    yield: number[]
}

interface Crop {
    name: string,
    data: CropData,
    prediction: CropData
}

export interface Data {
    // id: string,
    // name: string,
    // description: string,
    // price: number,
    // views: number

    name: string,
    r2_score: number,
    rmse: number,
    mse: number,
    mae: number,
    median_absolute_error: number,
    data_by_crops: Array<Crop>
}