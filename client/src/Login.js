import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './login.css'
import axios from 'axios'

function Login() {

    const[post, setPost]= useState({
        usernameOrEmail: '',
        password: ''
    })
    const handleInput=(event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/posts', {post})
        .then(response => console.log(response))
        .catch(err => console.log(err))
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
                    <form onSubmit={handleSubmit}  className="login_form col-12">
                        <div>
                            <input
                                className="login_form-campo col-lg-10 col-sm-10"
                                type="text"
                                onChange={handleInput}
                                id="usernameOrEmail"
                                name="usernameOrEmail"
                                placeholder="Correo o nombre de usuario"
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="login_form-campo col-lg-10 col-sm-10"
                                type="password"
                                onChange={handleInput}
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
                        <a href="registro.html">Regístrate</a>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Login;
