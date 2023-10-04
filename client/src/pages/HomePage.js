import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import makeToast from '../plugins/Toaster'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/login.css'

function Home() {


    return (
        <div className='d-flex flex-column vh-100 align-items-center '>
      <div className="header col-12 position-sticky">
        <h1>BYTE-STREAM</h1>
      </div>
      <div className="container d-flex justify-content-center mt-2 h-100">
        <div className="login col-12 col-md-10 col-sm-10 col-xs-12">
          <h2 className='mt-3'>Inicio</h2>
          <hr />
        </div>
      </div>
    </div>
    )

}

export default Home
