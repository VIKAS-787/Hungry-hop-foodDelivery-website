import React from 'react'
import "./AppDownload.css"
import {AppStore_icon,GooglePlay_icon} from "../../assets/assets"
function AppDownload() {

  return (
    <div className='appDownload' id='appDownload'>
        <p>For a Better Experience, Download the App <br /> HungryHop App</p>
        <div className="app-download-app">
             <img src={GooglePlay_icon} alt="Google Play" />
            <img src={AppStore_icon} alt="App Store" />
        </div>
    </div>
  )
}

export default AppDownload