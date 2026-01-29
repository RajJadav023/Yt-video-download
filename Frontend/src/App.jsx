import React from 'react'
import Box from './Component/Box'
import ImageBox from './Component/ImageBox'
import Info from './Component/Info'
import { Route , Routes } from 'react-router-dom'
import Home from './Component/Home'

const App = () => {
  return (
    <div>
      <Routes>
         <Route path='/' element={<Home/>} />
      </Routes>

    
    </div>
  )
}

export default App
