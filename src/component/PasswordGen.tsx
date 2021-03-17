import React, { PureComponent } from 'react';
import { lineNoise } from '../common/mutator';
import { haddock, passPhrase } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: PWLength;
    refreshTrigger: boolean;
    copyCallBack: Function;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    render() {
        let pwList = []

        if (this.props.pwGenMethod === 'haddock') {
            for (let x = 0; x <= 10; x++) {
                let password = haddock(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{password}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'linenoise') {
            for (let x = 0; x <= 10; x++) {
                let password = haddock(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{lineNoise(this.props.pwLength)}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'passphrase') {
            for (let x = 0; x <= 10; x++) {
                let password = haddock(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{passPhrase(this.props.pwLength)}</samp></li>)
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