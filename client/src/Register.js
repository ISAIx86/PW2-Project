import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { ArrowLeft } from 'react-bootstrap-icons';
import './login.css'

function Icono() {
  return (
    <div>
      <ArrowLeft color="black" size={32} />
    </div>
  );
}

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className='d-flex flex-column vh-100 align-items-center '>
      <div className="header col-12 position-sticky">
        <h1>BYTE-STREAM</h1>
      </div>
      <div className="row login_container col-12 col-md-10 col-sm-10 col-xs-12">
        <div className="login col-lg-5 col-md-8 col-sm-8 col-xs-12">
          <div className='d-flex align-items-center mt-3'>
            <button type="button" className="btn btn-link" onClick={() => alert('Regresando al login')}>
              {Icono()}
            </button>
            <h2>Crear usuario</h2>
          </div>

          <hr />
          <form action="#" method="" className="login_form col-12">
            <div className="d-flex flex-column align-items-center user-image-container">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Imagen de usuario"
                  className="user-image"
                />
              ) : (
                <img
                  src="./user-icon.svg"
                  alt="Imagen de usuario"
                  className="user-image"
                />
              )}
              <input
                type="file"
                accept="image/*"
                id="cargarImagen"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="cargarImagen" className="btn login_form-button cargar-imagen-button">
                Cargar Imagen
              </label>
            </div>
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="text"
                id="Nombres"
                name="Nombres"
                placeholder="Nombres"
                required
              />
            </div>
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="text"
                id="Apellidos"
                name="Apellidos"
                placeholder="Apellidos"
                required
              />
            </div>
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="text"
                id="username"
                name="username"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="date"
                id="fechaNac"
                name="fechaNac"
                placeholder="Fecha de nacimiento"
                required
              />
            </div>
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="email"
                id="correo"
                name="correo"
                placeholder="Correo o nombre de usuario"
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
            <div>
              <input
                className="login_form-campo col-lg-10 col-sm-10"
                type="password"
                id="confirmPass"
                name="confirmPass"
                placeholder="Confirmar contraseña"
                required
              />
            </div>
            <button type="submit" className="login_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
              Registrarse
            </button>
          </form>

        </div>
      </div>
    </div>
  );

}

export default Register;
