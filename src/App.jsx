import { useState } from 'react'
import TodoPage from './Todo-component/TodoPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <TodoPage />
    </>
  )
}

export default App
