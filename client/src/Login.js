import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import makeToast from '../src/plugins/Toaster'

import 'bootstrap/dist/css/bootstrap.css'
import './login.css'

function Login() {

    function handleSubmit(event) {

        event.preventDefault()

        const userlog = new FormData(event.target)

        const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/
        if (!emailRegex.test(userlog.get('email'))) {
            makeToast('error', "Formato de correo no admitido")
            return
        }

        axios.post('http://localhost:5000/user/login', userlog)
        .then((response) => {
            makeToast('success', response.data.message)
            //localStorage.setItem('CC_Token', response.data.token)
        })
        .catch((err) => {
            if (!err.response && !err.response.data && !err.response.data.message)
                makeToast('error', "Server no responde!")
            else makeToast('error', err.response.data.message)
        })
        
    }

    return (
        <div className='d-flex flex-column vh-100 align-items-center '>
            <div className="header col-12 position-sticky">
                <h1>BYTE-STREAM</h1>
            </div>
            <div className="row login_container col-12 col-md-10 col-sm-10 col-xs-12">
                <div className="login col-lg-4 col-md-8 col-sm-8 col-xs-12">
                    <h2 className='mt-3'>Iniciar sesión</h2>
                    <hr />
                    <form onSubmit={handleSubmit} className="login_form col-12">
                        <div>
                            <input
                                className="login_form-campo col-lg-10 col-sm-10"
                                type="text"
                                id="usernameOrEmail"
                                name="email"
                                placeholder="Correo electrónico"
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="login_form-campo col-lg-10 col-sm-10"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <button  className="login_form-button col-lg-4 col-xs-12 col-md-3">
                            Iniciar Sesión
                        </button>
                    </form>
                    <hr />
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <Link to='/register'><a>Regístrate</a></Link>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default Login
