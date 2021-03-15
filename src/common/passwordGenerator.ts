import { getRandomInt, numberNoise, randomNoise, randomWord, symbolNoise } from './mutator'

type haddockF = (length?: 'medium' | 'long', complexity?: number) => string

let haddock: haddockF = function(length='medium', complexity=3){
    var retryAttempts = 0
    const mutateMethod = {
        'medium': [
            () => [ randomWord('short'), randomNoise(), randomWord('long') ],
            () => [ randomWord('long'), randomNoise(), randomWord('short') ],
            () => [ randomWord('medium'), randomNoise(), randomWord('medium') ],
            () => [ randomWord('short'), randomNoise(), randomWord('medium'), numberNoise() ],
            () => [ randomWord('medium'), randomNoise(), randomWord('short'), numberNoise() ],
            () => [ randomWord('short'), randomNoise(), randomWord('medium'), symbolNoise() ],
            () => [ randomWord('medium'), randomNoise(), randomWord('short'), symbolNoise() ]
        ],
        'long': [

        ] 
    }
    const genPass = () => (mutateMethod[length][getRandomInt(mutateMethod[length].length)]().join(''))
    
    var password: string = ''
    var satisfied = false
    if(length === 'medium'){
        do{
            retryAttempts++
            password = genPass()
            if(password.length <= 11){
                password += randomWord('short')
            }
            if(password.length >= 12 && password.length <= 20){
                satisfied = true
            }
        } while(satisfied === false)
    }else if (length === 'long'){
        do{
            retryAttempts++
            password = genPass()
            if(password.length <= 14){
                password += randomWord('short')
            }
            if(password.length >= 16 && password.length <= 28){
                satisfied = true
            }
        } while(satisfied === false)
    }
    if(retryAttempts >= 3){
        console.warn(`Too many retries on ${password}: ${retryAttempts}`)
    }
    return password
}

export { haddock }