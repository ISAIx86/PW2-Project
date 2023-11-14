import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import makeToast from '../plugins/Toaster'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/login.css'
function Profile() {

	const [image, setImage] = useState('');
	const [nombres, setNombres] = useState('');
	const [correo, setCorreo] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [fechaNac, setFechaNac] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('CC_Token');

		if (token) {
			axios
				.get(`http://localhost:5000/user/profile_info`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					if (response.data.content) {
						setImage(response.data.content.image || '');
						setNombres(response.data.content.nombres || '');
						setApellidos(response.data.content.apellidos || '');
						const fechaFormateada = response.data.content.fecha_nac
							? new Date(response.data.content.fecha_nac).toISOString().split('T')[0]
							: '';
						setFechaNac(fechaFormateada);
						setUsername(response.data.content.username || '');
						setCorreo(response.data.content.email || '');
					}
				})
				.catch((err) => {
					if (!err.response || !err.response.data || !err.response.data.content) {
						makeToast('error', 'Server no responde!');
					} else {
						makeToast('error', err.response.data.content);
					}
				});
		} else {
			console.log('No se encontró un token en el Local Storage');
		}
	}, []);


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

	const handleUpdate = (event) => {
		event.preventDefault();
		const token = localStorage.getItem('CC_Token');
		event.preventDefault()

		const user = new FormData(event.target)
		console.log(user)
		if (selectedFile) user.append('image', selectedFile)

		if (!validate(user)) return

		axios.post('http://localhost:5000/user/update', user, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } })
			.then((response) => {
				makeToast('success', response.data.content)
			})
			.catch((err) => {
				if (!err.response && !err.response.data && !err.response.data.content)
					makeToast("error", "Server not responding!")
				else makeToast("error", err.response.data.content)
			})

	}


	function handleDelete(event) {
		event.preventDefault();
		const token = localStorage.getItem('CC_Token');

		axios.post(
			'http://localhost:5000/user/delete',
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				makeToast('success', response.data.content.message);
				navigate('/login');
			})
			.catch((err) => {
				if (!err.response && !err.response.data && !err.response.data.content)
					makeToast('error', "Server no responde!")
				else makeToast('error', err.response.data.content)
			});
	}

	return (
		<div className='d-flex flex-column vh-100 align-items-center'>
			<div className="header col-12 position-sticky">
				<h1>BYTE-STREAM</h1>
			</div>
			<div className="container d-flex justify-content-center mt-2 h-100">
				<div className="login col-12 col-md-10 col-sm-10 col-xs-12 profile-container">
					<h2 className='mt-3'>Perfil</h2>
					<hr />
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img
							src={`http://localhost:5000/public/img_users/${image}` || "./user-icon.svg"}
							alt="Imagen de usuario"
							className="user-image"
						/>
					</div>
					<form onSubmit={handleUpdate}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="username"
								name="username"
								placeholder="Nombre de usuario"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="email"
								id="email"
								name="email"
								placeholder="Correo electrónico"
								value={correo}
								onChange={(e) => setCorreo(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="Nombres"
								name="nombres"
								placeholder="Nombres"
								value={nombres}
								onChange={(e) => setNombres(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="Apellidos"
								name="apellidos"
								placeholder="Apellidos"
								value={apellidos}
								onChange={(e) => setApellidos(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="date"
								id="fechaNac"
								name="fecha_nac"
								placeholder="Fecha de nacimiento"
								value={fechaNac}
								onChange={(e) => setFechaNac(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="password"
								id="password"
								name="password"
								placeholder="Contraseña"
								onChange={(e) => setPass(e.target.value)}

							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="password"
								id="confirmPass"
								name="conf_password"
								placeholder="Confirmar contraseña"
								onChange={(e) => setConfirmPass(e.target.value)}

							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }} >
							<button type="submit" className="login_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
								Cambiar
							</button>
							<button type="button" onClick={handleDelete} className="login_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
								Eliminar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Profile