import { arrayPick } from './library';
import wordlist from './wordlist.json'

/** Generate random number
 * 
 * @param max max range for random number 
 * @returns Random number between 0 and max
 */
function randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

/** Return random word from imported wordlist.json
 * 
 * @param length Either short, medium or long
 * @returns Returns random word from wordlist
 */
function randomWord(length?: PWLength, exclude?: PWLength) {
    const lengthOptions: PWLength[] = ['short', 'medium', 'long']
    const selectLength = length ?? lengthOptions[randomNumber(3)]

    return arrayPick(wordlist[selectLength])
}

function randomNoise(): string {
    const noiseMethods = [
        () => [numberNoise(99), symbolNoise()],
        () => [symbolNoise(), numberNoise(99)],
        () => [symbolNoise(), symbolNoise()],
        () => [numberNoise(9), symbolNoise(), numberNoise(9)],
        () => [numberNoise(9), symbolNoise({ double: true })],
        () => [symbolNoise({ double: true }), numberNoise(9)],
        () => [numberNoise(999)],
        () => [symbolNoise({ double: true })],
        () => [randomNoise()]
    ]
    return arrayPick(noiseMethods)().join('')
}

/* Return random character symbol in given symbol string */
function symbolNoise({ symbol = "!@#$%^&*()-_=+[{]}|<>/?,.:;", double = false } = {}) {
    const returnSymbol = symbol.charAt(randomNumber(symbol.length))
    return double ? returnSymbol + returnSymbol : returnSymbol
}

/* return random integer of given length */
function numberNoise(length = 99) {
    return randomNumber(length)
}

export { randomNumber, numberNoise, symbolNoise, randomNoise, randomWord }