import React, { PureComponent } from 'react';
import { haddock, lineNoise, passPhrase } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: PWLength;
    refreshTrigger: boolean;
    copyCallBack: Function;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    render() {
        let pwList: JSX.Element[] = []

        if (this.props.pwGenMethod === 'Haddock') {
            for (let x = 0; x <= 8; x++) {
                let password = haddock(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{password}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'Linenoise') {
            for (let x = 0; x <= 8; x++) {
                let password = lineNoise(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{password}</samp></li>)
            }
        }
        else if (this.props.pwGenMethod === 'Passphrase') {
            for (let x = 0; x <= 8; x++) {
                let password = passPhrase(this.props.pwLength)
                pwList.push(<li key={x}><samp className='c-hand' onClick={() => {navigator.clipboard.writeText(password); this.props.copyCallBack(true)}}>{password}</samp></li>)
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