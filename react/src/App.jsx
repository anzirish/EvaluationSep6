import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './pages/Signup'
import Gallery from './pages/Gallery'
import AppRouter from './AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
