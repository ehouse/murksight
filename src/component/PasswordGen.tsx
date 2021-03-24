import React, { PureComponent } from 'react';
import { haddock, lineNoise, nist800, passPhrase } from '../common/passwordGenerator';

interface PasswordGenProps {
    pwGenMethod: pwGenMethod;
    pwLength: PWLength;
    refreshTrigger: boolean;
    copyCallBack: Function;
}

export class PasswordGen extends PureComponent<PasswordGenProps>{
    render() {
        let pwList: string[] = []

        if (this.props.pwGenMethod === 'Haddock') {
            for (let x = 0; x <= 8; x++) pwList.push(haddock(this.props.pwLength))
        } else if (this.props.pwGenMethod === 'Linenoise') {
            for (let x = 0; x <= 8; x++) pwList.push(lineNoise(this.props.pwLength))
        } else if (this.props.pwGenMethod === 'Passphrase') {
            for (let x = 0; x <= 8; x++) pwList.push(passPhrase(this.props.pwLength))
        } else if (this.props.pwGenMethod === 'NIST.SP.800-53') {
            for (let x = 0; x <= 8; x++) pwList.push(nist800())
        }

        const pwJSX = pwList.map((password, index) => {
            return <li key={index}>
                <samp className='c-hand' onClick={() => { navigator.clipboard.writeText(password); this.props.copyCallBack(true) }}>
                    {password}
                </samp>
            </li>
        })

        return <ul className='password-list is-family-monospace'>
            {pwJSX}
        </ul>
    }
}