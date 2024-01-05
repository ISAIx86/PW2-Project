import React from 'react'

function Profile() {

  	return (

    	<div className='d-flex flex-column vh-100 align-items-center '>

      		<div className="header col-12 position-sticky">
        		<h1>BYTE-STREAM</h1>
      		</div>

      		<div className="container d-flex justify-content-center mt-2 h-100">

        		<div className="login col-12 col-md-10 col-sm-10 col-xs-12">

          			<h2 className='mt-3'>Perfil</h2>
          			<hr />

          			<div style={{display: 'flex', justifyContent: 'center'}}>
          				<img
							src="./user-icon.svg"
							alt="Imagen de usuario"
							className="user-image"
						/>
					</div>
     

	 				<form> 

      					<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
           						type="text"
								id="username"
								name="username"
								placeholder="Nombre de usuario"
								required
							/>

						</div>


          				<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="Nombres"
								name="nombres"
								placeholder="Nombres"
								required
							/>

						</div>


            			<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="text"
								id="Apellidos"
								name="apellidos"
								placeholder="Apellidos"
								required
							/>

						</div>


            			<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="date"
								id="fechaNac"
								name="fecha_nac"
								placeholder="Fecha de nacimiento"
								required
							/>

						</div>


            			<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="password"
								id="password"
								name="password"
								placeholder="Contraseña"
								required
							/>

						</div>


           				<div style={{display: 'flex', justifyContent: 'center'}}>

							<input
								className="login_form-campo col-lg-10 col-sm-10"
								type="password"
								id="confirmPass"
								name="conf_password"
								placeholder="Confirmar contraseña"
								required
							/>

						</div>


            			<div  style={{display: 'flex', justifyContent: 'center'}} >

              				<button type="submit" className="login_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
								Cambiar
							</button>


            				<button type="submit" className="login_form-button col-lg-4 col-xs-12 col-md-3 mb-3">
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