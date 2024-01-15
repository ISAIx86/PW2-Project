import React, { useState } from 'react';
import { BiCaretDown, BiChevronRight, BiSun, BiMoon } from "react-icons/bi";
import '../styles/settingsPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ThemeSwitcher from '../components/ThemeSwitcher';

function Settings() {

    const [isArrowDownPerfil, setIsArrowDownPerfil] = useState(false);
    const [isArrowDownAspecto, setIsArrowDownAspecto] = useState(false);
    const [perfilInfoVisible, setPerfilInfoVisible] = useState(false);
    const [aspectoInfoVisible, setAspectoInfoVisible] = useState(false);

    const handleClickPerfil = () => {
        setIsArrowDownPerfil(!isArrowDownPerfil);
        setPerfilInfoVisible(!perfilInfoVisible);
    };

    const handleClickAspecto = () => {
        setIsArrowDownAspecto(!isArrowDownAspecto);
        setAspectoInfoVisible(!aspectoInfoVisible);
    };



    return (

        <div className='d-flex flex-column vh-100 align-items-center '>

            <div className="header col-12 position-sticky">
                <h1>BYTE-STREAM</h1>
            </div>


            <div className="container col-8 d-flex justify-content-center mt-2 mb-5 h-100">

                <div className=' col-12 col-md-10 col-sm-10 col-xs-12 '>
                    
                    <div className="login col-12 col-md-10 col-sm-10 col-xs-12 d-flex w-100 mb-2">
                        <h2 className='mt-3'>Ajustes</h2>
                        <hr />
                    </div>


                    <div className='opcion-setting-menu'>

                        <div className='Perfil-Usuario'>

                            <div onClick={handleClickPerfil} className="login col-12 col-md-10 col-sm-10 col-xs-12 d-flex w-100 mb-2 ">

                                <div className="d-flex align-items-center">

                                    <div className='seccion-settings' >
                                        {isArrowDownPerfil ? <BiCaretDown className='icon-setting-flechas'/> : <BiChevronRight className='icon-setting-flechas'/>}
                                    </div>

                                    <h3 className="mt-3">Perfil Usuario</h3>

                                </div>

                            </div>


                            {perfilInfoVisible && (

                                <div className="info-content">

                                    <div className='login formulario'>

                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <img
                                                src="./user-icon.svg"
                                                alt="Imagen de usuario"
                                                className="user-image"
                                            />
                                        </div>


                                        <form className='form-ProfileUser mb-2'> 

                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Nombre de usuario"
                                                    required
                                                />

                                            </div>


                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="text"
                                                    id="Nombres"
                                                    name="nombres"
                                                    placeholder="Nombres"
                                                    required
                                                />

                                            </div>


                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="text"
                                                    id="Apellidos"
                                                    name="apellidos"
                                                    placeholder="Apellidos"
                                                    required
                                                />

                                            </div>


                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="date"
                                                    id="fechaNac"
                                                    name="fecha_nac"
                                                    placeholder="Fecha de nacimiento"
                                                    required
                                                />

                                            </div>


                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Contraseña"
                                                    required
                                                />

                                            </div>


                                            <div style={{display: 'flex', justifyContent: 'center'}}>

                                                <input
                                                    className="perfil_form-campo col-lg-10 col-sm-10"
                                                    type="password"
                                                    id="confirmPass"
                                                    name="conf_password"
                                                    placeholder="Confirmar contraseña"
                                                    required
                                                />

                                            </div>


                                            <div  style={{display: 'flex', justifyContent: 'center'}} >

                                                <button type="submit" className="perfil_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
                                                    Cambiar
                                                </button>


                                                <button type="submit" className="perfil_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
                                                    Eliminar
                                                </button>

                                            </div>
                            

                                        </form>

                                    </div>

                                </div>

                            )}

                        </div>



                        
                        <div className='Cambio-Tema'>

                            <div onClick={handleClickAspecto} className="login col-12 col-md-10 col-sm-10 col-xs-12 d-flex w-100 mb-2 ">

                                <div className="d-flex align-items-center">

                                    <div className='seccion-settings' >
                                        {isArrowDownAspecto ? <BiCaretDown className='icon-setting-flechas'/> : <BiChevronRight className='icon-setting-flechas'/>}
                                    </div>

                                    <h3 className="mt-3">Aspecto</h3>

                                </div>

                            </div>

                            {aspectoInfoVisible && (

                                <div className="info-content">
                                    <ThemeSwitcher />
                                </div>
                            )}


                        </div>

                        

                    </div>


                    














                    



                </div>



            </div>

        </div>

    )

}

export default Settings