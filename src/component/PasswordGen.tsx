import React, { PureComponent } from 'react';
import { haddock } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: PWLength;
    refreshTrigger: boolean;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    render(){
        var pwList = []
        
        for (var x = 0; x <= 10; x++) {
            pwList.push(<li key={x}><samp>{haddock(this.props.pwLength)}</samp></li>)
        }

        return <ul className='password-list is-family-monospace'>
                {pwList}
            </ul>
    }
}