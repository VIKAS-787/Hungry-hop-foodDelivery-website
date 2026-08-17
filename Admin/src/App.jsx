import React from 'react'
import "./index.css"
import Navbar from './components/Navbar/Navbar'
import Slidebar from './components/Sidebar/Slidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './Pages/Add/Add'
import Order from './Pages/Orders/Order'
import List from './Pages/Lists/List'
import { ToastContainer} from 'react-toastify';


function App(){
  const Url = 'https://hungry-hop-fooddelivery.onrender.com'
  return (
    <BrowserRouter>
      <div>
        <ToastContainer/>
        <Navbar />
        <hr />
        <div className="app-container">
          <Slidebar />
          <Routes>
            <Route path='/add' element={<Add Url={Url} />} />
            <Route path='/order' element={<Order Url={Url} />} />
            <Route path='/lists' element={<List Url={Url} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
