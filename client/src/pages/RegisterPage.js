import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'
import makeToast from '../plugins/Toaster'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/login.css'

function Icono() {
  return (
	<div>
	  <ArrowLeft color="black" size={32} />
	</div>
  )
}

function Register() {

	const navigate = useNavigate()

  	const [selectedFile, setSelectedFile] = useState(null)

	const validate = (formData) => {

		const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/
		const usernameRegex = /^[a-z0-9._]*$/
		const namesRegex = /^[_A-z]*((-|\s)*[_A-z])*$/
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?=.{6,})/

		if (!namesRegex.test(formData.get('nombres'))) {
			makeToast('error', "Los nombres no deben contener números ni caracteres especiales.")
			return false
		}

		if (!namesRegex.test(formData.get('apellidos'))) {
			makeToast('error', "Los apellidos no deben contener números ni caracteres especiales.")
			return false
		}

		if (!usernameRegex.test(formData.get('username'))) {
			makeToast('error', "El nombre de usuario no debe tener espacios ni mayúsculas.")
			return false
		}

		if (!dateRegex.test(formData.get('fecha_nac'))) {
			makeToast('error', "El formato de fecha no es válido.")
			return false
		}

		if (!emailRegex.test(formData.get('email'))) {
			makeToast('error', "Formato de correo no admitido.")
			return false
		}

		if (!passwordRegex.test(formData.get('password'))) {
			makeToast('error', "La contraseña no cumple con los criterios.\n-6 o más caracteres.\n-Al menos una letra.\n-Al menos un número.\n-Al menos un caractér especial.")
			return false
		}

		if (formData.get('password') !== formData.get('conf_password')) {
			makeToast('error', "No coincide la confirmación de contraseña.")
			return false
		}
			
		return true

	}

 	const handleFileChange = (e) => {
		const file = e.target.files[0]
		setSelectedFile(file)
  	}

	const handleSubmit = (event) => {

		event.preventDefault()
		
		const user = new FormData(event.target)
		if (selectedFile) user.append('image', selectedFile)
		
		if (!validate(user)) return

		axios.post('http://localhost:5000/user/register', user, {headers: {"Content-Type": "multipart/form-data"}})
		.then((response) => {
			makeToast('success', response.data.message)
			navigate('/login')
		})
		.catch((err) => {
			if (!err.response && !err.response.data && !err.response.data.messsage)
                makeToast("error", "Server not responding!")
            else makeToast("error", err.response.data.message)
		})

	}

  	return (
		<div className='d-flex flex-column vh-100 align-items-center '>
			<div className="header col-12 position-sticky">
				<h1>BYTE-STREAM</h1>
			</div>
			<div className="row login_container col-12 col-md-10 col-sm-10 col-xs-12">
				<div className="login col-lg-5 col-md-8 col-sm-8 col-xs-12">
					<div className='d-flex align-items-center mt-3'>
						<Link to='/login'>
							<button type="button" className="btn btn-link">
								{Icono()}
							</button>
						</Link>
						<h2>Crear usuario</h2>
					</div>
					<hr />
					<form onSubmit={handleSubmit} className="login_form col-12">
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
								name="nombres"
								placeholder="Nombres"
								required
							/>
						</div>
						<div>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="Apellidos"
								name="apellidos"
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
								name="fecha_nac"
								placeholder="Fecha de nacimiento"
								required
							/>
						</div>
						<div>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="email"
								id="correo"
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
						<div>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="password"
								id="confirmPass"
								name="conf_password"
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
  	)

}

export default Register