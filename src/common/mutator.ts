import wordlist from './wordlist.json'

/* Random integer */
function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

/* Return random word from imported wordlist.json */
function randomWord(length?: PWLength){
    const lengthOptions: PWLength[] = ['short', 'medium', 'long']
    const selectLength = length ?? lengthOptions[getRandomInt(3)]
    
    const wordlistLength = wordlist[selectLength].length
    return wordlist[selectLength][getRandomInt(wordlistLength)]
}

function randomNoise(){
    const noiseMethods = [
        () => [numberNoise(), symbolNoise()],
        () => [symbolNoise(), numberNoise()],
        () => [numberNoise(9), symbolNoise(), numberNoise(9)],
        () => [numberNoise(9), symbolNoise({double: true})],
        () => [symbolNoise({double: true}), numberNoise(9)],
        () => [numberNoise(999)],
        () => [symbolNoise({double: true})],
        () => [symbolNoise()]
    ]
    return noiseMethods[getRandomInt(noiseMethods.length)]().join('')
}

/* Return random character symbol in given symbol string */
function symbolNoise({symbol = "!@#$%^&*()-_=+[{]}|<>/?,.:;", double = false} = {}){
    const returnSymbol = symbol.charAt(getRandomInt(symbol.length))
    return double ? returnSymbol + returnSymbol : returnSymbol
}

/* return random integer of given length */
function numberNoise(length = 99){
    return getRandomInt(length)
}

export { getRandomInt, numberNoise, symbolNoise, randomNoise, randomWord }