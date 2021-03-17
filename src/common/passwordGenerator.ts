import { arrayPick } from './library'
import { numberNoise, randomNoise, randomWord, symbolNoise } from './mutator'

function haddock(length: PWLength = 'medium'){
    var retryAttempts = 0
    const mutateMethod = {
        'short': [],
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
            () => [ randomWord('medium'), randomNoise(), randomWord('long') ],
            () => [ randomWord('long'), randomNoise(), randomWord('medium') ],
            () => [ randomWord('short'), randomNoise(), randomWord('medium'), randomNoise(), randomWord('medium') ],
            () => [ randomWord('short'), randomNoise(), randomWord('medium'), randomWord('medium'), randomNoise() ],


        ] 
    }
    const genPass = () => (arrayPick(mutateMethod[length])().join(''))
    
    var password: string = ''
    var satisfied = false
    if(length === 'medium'){
        do{
            retryAttempts++
            password = genPass()
            if(password.length <= 13){
                password += randomWord('short')
            }
            if(password.length >= 14 && password.length <= 20){
                satisfied = true
            }
        } while(satisfied === false)
    } else if (length === 'long'){
        do{
            retryAttempts++
            password = genPass()
            if(password.length <= 14){
                password += randomWord('short')
            }
            if(password.length >= 16){
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