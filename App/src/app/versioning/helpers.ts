export const formatToAntArray = (array: string[]) => {
  return array.map((item: string) => {
    return {value: item, label: item}
  })
}

export const generateTableOptions = (data: Array<any>, cols = 5, rows = 5) => {
  const keys = Object.keys(data[0]).slice(0, cols);
  const constructObjectFromKeys = (item: any) => {
    let obj = []
    for ( const i of keys) {
      // obj = {...obj, [i]: item[i]}
      obj = [...obj, item[i]]
    }
    return obj
  }

  const newArray = data.map(constructObjectFromKeys).slice(0, rows)

  return { headers: keys, data: newArray }
}
