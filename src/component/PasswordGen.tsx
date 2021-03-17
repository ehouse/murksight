import React, { PureComponent } from 'react';
import { lineNoise } from '../common/mutator';
import { haddock, passPhrase } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: PWLength;
    refreshTrigger: boolean;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    render() {
        let pwList = []

        if (this.props.pwGenMethod === 'haddock') {
            for (let x = 0; x <= 10; x++) {
                pwList.push(<li key={x}><samp>{haddock(this.props.pwLength)}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'linenoise') {
            for (let x = 0; x <= 10; x++) {
                pwList.push(<li key={x}><samp>{lineNoise(this.props.pwLength)}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'passphrase') {
            for (let x = 0; x <= 10; x++) {
                pwList.push(<li key={x}><samp>{passPhrase(this.props.pwLength)}</samp></li>)
            }
        }
        else {
            return <div className="empty">
                <p className='empty-title h5'>Work in Progress</p>
            </div>
        }

        return <ul className='password-list is-family-monospace'>
            {pwList}
        </ul>
    }
}