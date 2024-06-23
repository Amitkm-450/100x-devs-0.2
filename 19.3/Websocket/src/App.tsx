import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((count) => count !== 0 ? count-1 : count)}>decrease</button>
      {count}
      <button onClick={() => setCount((count) => count !== 10 ? count+1 : count)}>increase</button>
    </>
  )
}

export default App
