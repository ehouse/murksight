import React, { useReducer } from 'react';
import './common/main.css';
import { PasswordGen } from './component/PasswordGen';

interface AppStateType{
  length: PWLength;
  method: pwGenMethod;
  refreshTrigger: boolean;
}

interface ActionType{
  type: 'length' | 'method' | 'refresh';
  payload?: PWLength | pwGenMethod;
}

type buttonState = 'active' | 'disabled' | ''

function AppReducer(state: AppStateType, action: ActionType){
  if(action.type === 'length'){
    return {...state, length: action.payload} as AppStateType
  } 
  else if (action.type === 'method'){
    return {...state, method: action.payload} as AppStateType
  }
  else if (action.type === 'refresh'){
      return {...state, refreshTrigger: !state.refreshTrigger}
  }
  else{
    return state
  }
}

function App() {
  const initialState: AppStateType = {length: 'long', method: 'haddock', refreshTrigger: false}
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getButtonState = (action: 'length' | 'method', payload: PWLength | pwGenMethod): buttonState => {
    return (state[action] === payload ? 'active' : '')
  }

  return (<div className='app'>
    <header className='navbar'>
      <div className='container grid-lg'>
        <section className="navbar-center navbar-section">
          <a href="/" className="navbar-brand text-bold mr-2">Murksight</a>
          <a href="https://github.com/ehouse/murksight" className="btn btn-link">GitHub</a>
        </section>
      </div>
    </header>
    <div className='container grid-lg'>
      <div className='columns'>
        <div className='column col-3 pt-2'>
          <h5>Generation Method</h5>
          <div className='verticle-btn-grp method-picker'>
            <button className={`btn ${getButtonState('method', 'haddock')}`} onClick={() => dispatch({type: 'method', payload: 'haddock'})}>Haddock</button>
            <button className={`btn ${getButtonState('method', 'NIST.SP.800-53')}`} onClick={() => dispatch({type: 'method', payload: 'NIST.SP.800-53'})}>NIST.SP.800-53</button>
            <button className={`btn ${getButtonState('method', 'linenoise')}`} onClick={() => dispatch({type: 'method', payload: 'linenoise'})}>Line Noise</button>
          </div>
          <div className='length-picker'>
            <h5>Password Length</h5>
            <div className="btn-group btn-group-block">
              <button className={`btn disabled ${getButtonState('length', 'short')}`} onClick={() => dispatch({type: 'length', payload: 'short'})}>short</button>
              <button className={`btn ${getButtonState('length', 'medium')}`} onClick={() => dispatch({type: 'length', payload: 'medium'})}>Medium</button>
              <button className={`btn ${getButtonState('length', 'long')}`} onClick={() => dispatch({type: 'length', payload: 'long'})}>Long</button>
            </div>
          </div>
          <button className='btn password-refresh' onClick={() => dispatch({type: 'refresh'})}><i className='icon icon-refresh mr-1'></i>Refresh</button>
        </div>
        <div className='column'>
          <div className='card'>
            <PasswordGen pwLength={state.length} pwGenMethod={state.method} refreshTrigger={state.refreshTrigger}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App;
