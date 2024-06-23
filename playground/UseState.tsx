import * as React from 'react'
import { useState } from 'react';

function App() {
  //the output of use state is an array
  //within that array, the first item is the current value of that piece of state
  //then the second value is a setter function for that piece of state

  const [count, setCount] = useState(10);
  const [names, setNames] = useState(() => {
    const list = ['jack', 'jill', 'john'];

    return list;
  })

  function addOne() {

  }

  return (
    <div className='App'>
      <div>
        <ul>
          {
            names.map((name, nameIndex) => <li key={nameIndex}>{name}</li>)
          }
        </ul>
      </div>
      <button onClick={addOne}>Count = {count}</button>
      <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))}/>
    </div>
  )
}

export default App
