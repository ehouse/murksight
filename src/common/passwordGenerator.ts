import { randomNumber, randomNoise, randomWord, ALLVALIDCHAR, UPPERCASE } from './mutator'

const LengthReqEnum = {
    short: 14,
    medium: 18,
    long: 24
} as const

const LengthJitter = {
    short: 3,
    medium: 2,
    long: 1
} as const

/**
 * Returns true if die lands on max face value. A 4 sided die will return true 25% of the time.
 * @param die number of faces on the die
 * @returns true if max face value was landed on
 */
function dieRoll(die: number): boolean {
    return (randomNumber(die) === die - 1)
}

/**
 * Loop over Password Object and reduce down to a single string 
 * @param password array of password segments 
 * @returns flattened password string
 */
function mapSegments(password: Password): string {
    return (password.map((i) => (i.data)).join(''))
}

/**
 * Generate a password from a series of words and noisy symbols
 * @param length password generation length
 * @returns password string 
 */
function haddock(length: PWLength = 'medium'): string {
    // Allows recalculation incase password length is absurd
    const calcPass = (): string => {
        let store: Password = []
        // Loop and fill store with words
        do {
            store.push({ type: 'word', data: randomWord() })
        } while (mapSegments(store).length <= LengthReqEnum[length] - 4)

        let noiseOdds = 1
        // Iterate over store and introduce noise at a decreasing rate flattening the nested array when done
        store = store.map((val) => {
            if (dieRoll(noiseOdds)) {
                noiseOdds += LengthJitter[length]
                const noise: Segment = { type: 'noise', data: randomNoise() }
                return [val, noise]
            }
            return [val]
        }).flat()
        return mapSegments(store)
    }
    // Recalculate if the length is too long
    let passString: string = calcPass()
    while (passString.length < LengthReqEnum[length] + 4) {
        passString = calcPass()
    }

    return passString
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
    let returnString = ''
    const characterGroup = ALLVALIDCHAR

    for (let x = 0; x <= LengthReqEnum[length]; x++) {
        returnString += characterGroup.charAt(randomNumber(characterGroup.length))
    }
    return returnString
}

/**
 * I hugely dislike this function AND this method... :(
 * @returns nist800 password string
 */
function nist800() {
    let store: Password = []
    do {
        store.push({ type: 'word', data: randomWord({ exclude: 'long' }) })
    } while (mapSegments(store).length <= LengthReqEnum['short'])

    let noiseCounter = store.length
    const wordLength = store.length
    for (let x = 1; x < wordLength; x++) {
        if (dieRoll(noiseCounter - 1)) {
            store.splice(x, 0, { type: 'noise', data: randomNoise() })
        } else {
            noiseCounter--
        }
    }

    // Loop through and uppercase first letters of words 
    store = store.map((val) => ({ type: val.type, data: val.data.charAt(0).toUpperCase() + val.data.slice(1) }))

    // Loop through and muttate every fourth character to uppercase to fulfille no repeating character group rule
    store = store.map((val) => {
        // Skip noise segments
        if (val.type === 'noise') return val

        // Loop over characters in the word
        const newVal = val.data.split('').reduce((acc, val) => {
            // Uppercase a letter only if there are 3 lowercase letters behind it
            if (UPPERCASE.includes(acc.split('').reverse()[3])) return acc + val.toUpperCase()
            return acc + val
        })
        return { type: 'word', data: newVal }
    })
    return mapSegments(store)
}

export { haddock, nist800, lineNoise, passPhrase }