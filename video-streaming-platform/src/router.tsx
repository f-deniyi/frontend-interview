import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favourite from './pages/Favourite'



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Home />} />
                <Route  path='/favourite' element={<Favourite />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
