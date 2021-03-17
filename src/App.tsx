import React, { useEffect, useReducer, useState } from 'react';
import './common/main.css';
import { PasswordGen } from './component/PasswordGen';

interface AppStateType {
  length: PWLength;
  method: pwGenMethod;
  refreshTrigger: boolean;
}

interface ActionType {
  type: 'length' | 'method' | 'refresh';
  payload?: PWLength | pwGenMethod;
}

type buttonState = 'active' | 'disabled' | ''

function AppReducer(state: AppStateType, action: ActionType) {
  if (action.type === 'length') {
    return { ...state, length: action.payload } as AppStateType
  }
  else if (action.type === 'method') {
    return { ...state, method: action.payload } as AppStateType
  }
  else if (action.type === 'refresh') {
    return { ...state, refreshTrigger: !state.refreshTrigger }
  }
  else {
    return state
  }
}

function App() {
  const initialState: AppStateType = { length: 'long', method: 'haddock', refreshTrigger: false }
  const [stateCopy, setStateCopy] = useState(false)
  const [state, dispatch] = useReducer(AppReducer, initialState)

  useEffect(() => {
    if(stateCopy === true){
      setTimeout(()=>setStateCopy(false), 1000)
    }
  })

  /* Determine if button is active or disabled */
  const getButtonState = (action: 'length' | 'method', payload: PWLength | pwGenMethod): buttonState => {
    if (action === 'length' && payload === 'short' && state.method === 'passphrase') return 'disabled' // Disabled short passphrase
    return (state[action] === payload ? 'active' : '')
  }

  /* Create specific button with stateful actions */
  const createButton = (action: 'length' | 'method', payload: [PWLength | pwGenMethod, string][]) => {
    const returnArray: JSX.Element[] = []
    payload.forEach((item) => {
      returnArray.push(<button className={`btn ${getButtonState(action, item[0])}`} onClick={() => dispatch({ type: action, payload: item[0] })}>{item[1]}</button>
      )
    })
    return <>{returnArray}</>
  }

  /* Gemeric JSX logic for selection sidebar */
  const createButtonCode = () => (<>
    <h5>Password Method</h5>
    <div className='verticle-btn-grp method-picker'>
      {createButton('method', [['haddock', 'Haddock'], ['NIST.SP.800-53', 'NIST.SP.800-53'], ['passphrase', 'Passphrase'], ['linenoise', 'Linenoise']])}
    </div>
    <div className='length-picker'>
      <h5>Length</h5>
      <div className="btn-group btn-group-block">
        {createButton('length', [['short', 'short'], ['medium', 'medium'], ['long', 'long']])}
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
          <div className='card'>
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
