import { arrayPick } from './library';
import wordlist from './wordlist.json'

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER = '0123456789'
const EASYSYMBOL = '!@#$%^&*()-_=+[{]}|<>/?,.:;'
const ALLSYMBOL = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

// 89 Characters long in total 
const ALLVALIDCHAR = LOWERCASE + UPPERCASE + ALLSYMBOL + NUMBER

/** Generate random number
 * 
 * @param max max range for random number 
 * @returns Random number between 0 and max
 */
function randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

interface RandomWord {
    length?: PWLength;
    exclude?: PWLength
}

/** Return random word from imported wordlist.json
 * 
 * @param length Either short, medium or long
 * @returns Returns random word from wordlist
 */
function randomWord({ length, exclude }: RandomWord = {}) {
    const allOptions: PWLength[] = ['short', 'medium', 'long']

    const lengthOptions = exclude ? allOptions.filter((word) => (word !== exclude)) : allOptions
    const selectLength = length ?? lengthOptions[lengthOptions.length - 1]

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
        () => [symbolNoise({ double: true })]
    ]
    return arrayPick(noiseMethods)().join('')
}

/* Return random character symbol in given symbol string */
function symbolNoise({ symbol = EASYSYMBOL, double = false } = {}) {
    const returnSymbol = symbol.charAt(randomNumber(symbol.length))
    return double ? returnSymbol + returnSymbol : returnSymbol
}

/* return random integer of given length */
function numberNoise(length = 99) {
    return randomNumber(length)
}

export { randomNumber, numberNoise, symbolNoise, randomNoise, randomWord, ALLVALIDCHAR, LOWERCASE, UPPERCASE, EASYSYMBOL, ALLSYMBOL, NUMBER }