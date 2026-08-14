import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOder/PlaceOrder'
import Footer from './Component/Footer/Footer'
import LoginForm from './Component/LoginPopup/LoginForm'
import Verify from "./Pages/Verify/Verify"
import Myorder from './Pages/Myorder/Myorder'

function App() {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <BrowserRouter>
      {formOpen ? (
        <LoginForm setFormOpen={setFormOpen} />
      ) : null}
      <div className='app'>
        <Navbar setFormOpen={setFormOpen} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorder />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App