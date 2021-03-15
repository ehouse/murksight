import React, { PureComponent } from 'react';
import { haddock } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: number;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    static defaultProps = {
        pwLength: 16,
        pwGenMethod: "haddock"
    }
    
    render(){
        var pwList = []
        
        for (var x = 0; x <= 10; x++) {
            pwList.push(<li key={x}>{haddock()}</li>)
        }

        return <ul>
            {pwList}
        </ul>
    }
}
