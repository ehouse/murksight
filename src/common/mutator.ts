import { arrayPick } from './library';
import wordlist from './wordlist.json'

enum LineNoiseLengthEnum {
    short = 14,
    medium = 18,
    long = 24
}

/** Generate random number
 * 
 * @param max max range for random number 
 * @returns Random number between 0 and max
 */
function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

/** Return random word from imported wordlist.json
 * 
 * @param length Either short, medium or long
 * @returns Returns random word from wordlist
 */
function randomWord(length?: PWLength) {
    const lengthOptions: PWLength[] = ['short', 'medium', 'long']
    const selectLength = length ?? lengthOptions[getRandomInt(3)]

    return arrayPick(wordlist[selectLength])
}

function randomNoise() {
    const noiseMethods = [
        () => [numberNoise(), symbolNoise()],
        () => [symbolNoise(), numberNoise()],
        () => [numberNoise(9), symbolNoise(), numberNoise(9)],
        () => [numberNoise(9), symbolNoise({ double: true })],
        () => [symbolNoise({ double: true }), numberNoise(9)],
        () => [numberNoise(999)],
        () => [symbolNoise({ double: true })],
        () => [symbolNoise()]
    ]
    return arrayPick(noiseMethods)().join('')
}

/* Return random character symbol in given symbol string */
function symbolNoise({ symbol = "!@#$%^&*()-_=+[{]}|<>/?,.:;", double = false } = {}) {
    const returnSymbol = symbol.charAt(getRandomInt(symbol.length))
    return double ? returnSymbol + returnSymbol : returnSymbol
}

/* return random integer of given length */
function numberNoise(length = 99) {
    return getRandomInt(length)
}

/* Return random line noise */
function lineNoise(length: PWLength) {
    var returnString = ''
    const characterGroup = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[{]}|<>/?,.:;'


    for (var x = 0; x <= LineNoiseLengthEnum[length]; x++) {
        returnString += characterGroup.charAt(getRandomInt(characterGroup.length))
    }
    return returnString
}

export { getRandomInt, lineNoise, numberNoise, symbolNoise, randomNoise, randomWord }