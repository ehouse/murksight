import { arrayPick } from './library'
import { randomNumber, randomNoise, randomWord } from './mutator'

enum LengthReqEnum {
    short = 14,
    medium = 18,
    long = 24
}

function haddock(length: PWLength = 'medium') {
    const mutateMethod = {
        'short': [
            () => [randomWord('short'), randomNoise(), randomWord('medium')],
            () => [randomWord('medium'), randomNoise(), randomWord('short')],
        ],
        'medium': [
            () => [randomWord('short'), randomNoise(), randomWord('long')],
            () => [randomWord('long'), randomNoise(), randomWord('short')],
            () => [randomWord('medium'), randomNoise(), randomWord('medium')],
            () => [randomWord('short'), randomNoise(), randomWord('medium'), randomNoise()],
            () => [randomWord('medium'), randomNoise(), randomWord('short'), randomNoise()]
        ],
        'long': [
            () => [randomWord('medium'), randomNoise(), randomWord('long')],
            () => [randomWord('long'), randomNoise(), randomWord('medium')],
            () => [randomWord('short'), randomNoise(), randomWord('medium'), randomNoise(), randomWord('medium')],
            () => [randomWord('medium'), randomNoise(), randomWord('short'), randomNoise(), randomWord('medium')],
            () => [randomWord('short'), randomNoise(), randomWord('medium'), randomWord('medium'), randomNoise()],
            () => [randomWord('medium'), randomNoise(), randomWord('short'), randomWord('medium'), randomNoise()],
        ]
    }
    const genPass = () => (arrayPick(mutateMethod[length])().join(''))

    var password: string = ''
    var satisfied = false
    if (length === 'short') {
        do {
            password = genPass()
            if (password.length <= 10) {
                password += randomWord('short')
            }
            if (password.length >= 12 && password.length <= 16) {
                satisfied = true
            }
        } while (satisfied === false)
    }
    else if (length === 'medium') {
        do {
            password = genPass()
            if (password.length <= 12) {
                password += randomWord('short')
            }
            if (password.length <= 15) {
                password += randomNoise()
            }
            if (password.length >= 16 && password.length <= 20) {
                satisfied = true
            }
        } while (satisfied === false)
    } else if (length === 'long') {
        do {
            password = genPass()
            if (password.length <= 14) {
                password += randomWord('medium')
            }
            if (password.length <= 18) {
                password += randomWord('medium')
            }
            if (password.length <= 21) {
                password += randomNoise()
            }
            if (password.length >= 22) {
                satisfied = true
            }
        } while (satisfied === false)
    }
    return password
}

function passPhrase(length: PWLength): string {
    let password: string[] = []

    if (length === 'long') {
        for (let index = 0; index < 5; index++) {
            password.push(randomWord())
        }
    }
    else if (length === 'medium') {
        for (let index = 0; index < 4; index++) {
            password.push(randomWord())
        }
    }
    else {
        throw Error('Invalid Method Given')
    }

    // Recurse if password is too short
    if (password.join('').length <= 14) {
        return passPhrase(length)
    }
    return password.join('-')
}

/* Return random line noise */
function lineNoise(length: PWLength) {
    var returnString = ''
    const characterGroup = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[{]}|<>/?,.:;'

    for (var x = 0; x <= LengthReqEnum[length]; x++) {
        returnString += characterGroup.charAt(randomNumber(characterGroup.length))
    }
    return returnString
}

function nist800(){

}

export { haddock, lineNoise, passPhrase }