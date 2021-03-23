import { randomNumber, randomNoise, randomWord } from './mutator'

enum LengthReqEnum {
    short = 14,
    medium = 18,
    long = 24
}

enum LengthJitter {
    short = 3,
    medium = 2,
    long = 1
}

/**
 * Returns true if die lands on max face value. A 4 sided die will return true 25 n% of the time.
 * @param die faces on die
 * @returns true if max face value was landed on
 */
function dieRoll(die: number): boolean {
    return (randomNumber(die) === die-1)
}

// Types for haddock passwords
type Segment = { type: 'noise' | 'word', data: string }
type Password = Segment[]

/**
 * Loop over Password Object and reduce down to a single string 
 * @param password array of password segments 
 * @returns flattened password string
 */
 function mapSegments(password: Password): string{
    return(password.map((i) => (i.data)).join(''))
}

/**
 * Generate a password from a series of words and noisy symbols
 * @param length password generation length
 * @returns password string 
 */
function haddock(length: PWLength = 'medium'): string {
    let store: Password
    // Loop to keep password length reasonable
    do {
        store = []
        // Loop and fill store with words
        do {
            store.push({ type: 'word', data: randomWord() })
        } while (mapSegments(store).length <= LengthReqEnum[length] - 4)

        let noiseOdds = 1
        // Iterate over store and introduce noise at a decreasing rate flattening the nested array when done
        store = store.map((val) => {
            if(dieRoll(noiseOdds)){
                noiseOdds += LengthJitter[length]
                const noise: Segment = { type: 'noise', data: randomNoise() }
                return [val, noise]
            }
            return [val]
        }).flat()
    } while(mapSegments(store).length < LengthReqEnum[length] + 4)

    return mapSegments(store)
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
        throw Error('Invalid length given')
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