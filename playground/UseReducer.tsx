import * as React from 'react';
import { useReducer } from 'react';

import './App.css';

function App() {
    const [state, dispatch] = useReducer(
        (state: any, action: { type: any; payload: any; }) => {
            switch (action.type) {
                case "SET_NAME":
                    return { ...state, name: action.payload };
                case "ADD_NAME":
                    return { ...state, name: "", names: [...state.names, action.payload] };
            }
        },
        {
            names: [],
            name: ""
        }
    )

    return (
        <div className="App">
            <div>{state.name}</div>
            <div>
                <ul>
                    {
                        state.names.map((name: any, nameIndex: number) => <li key={nameIndex}>{name}</li>)
                    }
                </ul>
            </div>
            <input
                type="text"
                value={state.name}
                onChange={
                    (e) => dispatch({ type: "SET_NAME", payload: e.target.value })
                } />
            <button onClick={() => dispatch({ type: "ADD_NAME", payload: state.name })}>add name</button>
        </div>
    );
}

export default App
