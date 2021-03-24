import React, { useEffect, useReducer, useState } from 'react';
import './common/main.css';
import { PasswordGen } from './component/PasswordGen';

interface AppStateType {
  length: PWLength;
  method: pwGenMethod;
  refreshTrigger: boolean;
}

type ButtonState = 'active' | 'disabled' | ''

interface LengthAction { type: 'length', payload: PWLength }
interface MethodAction { type: 'method', payload: pwGenMethod }

type ValidAction =
  | LengthAction
  | MethodAction

type AppReducerAction =
  | ValidAction
  | { type: 'refresh' }


function appReducer(state: AppStateType, action: AppReducerAction): AppStateType {
  switch (action.type) {
    case 'length':
      return { ...state, length: action.payload }
    case 'method':
      // Safely set state if invalid inputs are provided
      if (state.length === 'short' && action.payload === 'Passphrase') {
        return { ...state, method: action.payload, length: 'medium' }
      }
      return { ...state, method: action.payload }
    case 'refresh':
      return { ...state, refreshTrigger: !state.refreshTrigger }
    default:
      return state
  }
}

function App() {
  const initialState: AppStateType = { length: 'medium', method: 'Haddock', refreshTrigger: false }
  const [stateCopy, setStateCopy] = useState(false)
  const [state, dispatch] = useReducer(appReducer, initialState)

  const pwGenMethodList: pwGenMethod[] = ['Haddock', 'NIST.SP.800-53', 'Passphrase', 'Linenoise']
  const pwGenLengthList: PWLength[] = ['short', 'medium', 'long']

  useEffect(() => {
    if (stateCopy === true) {
      setTimeout(() => setStateCopy(false), 1400)
    }
  }, [stateCopy])

  /* Determine if button is active or disabled */
  const getButtonState = ({ type, payload }: ValidAction): ButtonState => {
    if (type === 'length' && payload === 'short' && state.method === 'Passphrase') return 'disabled' // Disabled short passphrase
    if (type === 'length' && state.method === 'NIST.SP.800-53') return 'disabled' // Disable length selection for Nist800
    return (state[type] === payload ? 'active' : '')
  }

  /* Create specific button with stateful actions */
  const createButton = (buttons: ValidAction[]) => {
    const returnArray: JSX.Element[] = []
    buttons.forEach((item) => {
      returnArray.push(<button key={item.payload} className={`btn ${getButtonState(item)}`} onClick={() => dispatch(item)}>{item.payload}</button>
      )
    })
    return <>{returnArray}</>
  }

  const getSubHeader = (method: pwGenMethod) => {
    switch (method) {
      case 'Haddock': return 'Memorable secure passwords constructed from words and symbols.'
      case 'Linenoise': return 'Random characters passwords great for password managers.'
      case 'NIST.SP.800-53': return 'Strong goverment password requirement.'
      case 'Passphrase': return 'Easy to remember and incredibly strong.'
    }
  }

  /* Gemeric JSX logic for selection sidebar */
  const createButtonCode = () => (<>
    <h5>Password Method</h5>
    <div className='verticle-btn-grp method-picker'>
      {createButton(pwGenMethodList.map((gen_method) => ({ type: 'method', payload: gen_method })))}
    </div>
    <div className='length-picker'>
      <h5>Length</h5>
      <div className="btn-group btn-group-block">
        {createButton(pwGenLengthList.map((gen_method) => ({ type: 'length', payload: gen_method })))}
      </div>
    </div>
    <button className='btn password-refresh' onClick={() => dispatch({ type: 'refresh' })}><i className='icon icon-refresh mr-1'></i>Refresh</button>
  </>)

  return (<div className='app'>
    <header className='navbar'>
      <div className='container grid-lg'>
        <section className="navbar-section">
          <div className="off-canvas show-lg">

            <a className="off-canvas-toggle btn btn-primary btn-action" href="#sidebar">
              <i className="icon icon-menu"></i>
            </a>

            <div id="sidebar" className="off-canvas-sidebar">
              <div className='sidebar-button-list'>
                {createButtonCode()}
              </div>
            </div>

            <a className="off-canvas-overlay" href="#passwords">Close Sidebar</a>
          </div>
          <a href="/" className="navbar-brand text-bold mr-2">Murksight</a>
          <a href="https://github.com/ehouse/murksight" className="btn btn-link">GitHub</a>
        </section>
      </div>
    </header>

    <div className='container grid-lg'>
      <div className='columns'>
        <div className='column col-3 pt-2 hide-lg'>
          {createButtonCode()}
        </div>
        <div className='column'>
          <div className='card card-custom'>
            <div className="card-header">
              <div className="card-title h5">{state.method}</div>
              <div className="card-subtitle text-gray">{getSubHeader(state.method)}</div>
            </div>
            <PasswordGen pwLength={state.length} pwGenMethod={state.method} refreshTrigger={state.refreshTrigger} copyCallBack={setStateCopy} />
          </div>
        </div>
      </div>
      <div className={`toast toast-success clipboard-alert ${stateCopy ? '' : 'd-hide'}`}>
        <span className='h6'>Copied to Clipboard!</span>
      </div>
    </div>
  </div>
  )
}

export default App;
