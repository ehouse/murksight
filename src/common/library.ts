function arrayPick<T>(arr: T[]){
    return arr[Math.floor(Math.random() * arr.length)]
}

export { arrayPick }