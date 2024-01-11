import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as BiIco from 'react-icons/bi';
import * as AiIco from 'react-icons/ai';
import { BiSolidStar, BiStar  } from "react-icons/bi";

import '../styles/profilePage.css';

function Profile() {

	const [activeTab, setActiveTab] = useState('Post');

	const [posts, setPosts] = useState([

        {
            id: 1,
            game: {
                name: 'Resident Evil 5',
                avatar: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0'
            },
            user: {
                name: 'Usuario 1',
                avatar: 'https://th.bing.com/th/id/OIP.3hckg2BT4mldMAuuo6TUrQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            },
            content: 'Este es un comentario de prueba.',
            media: 'https://th.bing.com/th/id/OIP.Hx0TNUPJV4BMBbWI516P2wHaEo?w=301&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7', // URL de la imagen o video
            likes: 10,
            comments: 5,
            timestamp: 'Hace 2 horas',
        },

        {
            id: 2,
            game: {
                name: '',
                avatar: ''
            },
            user: {
                name: 'Usuario 2',
                avatar: 'https://th.bing.com/th/id/OIP.DMDfV6N9jhYjyQCLGLlH5QHaLH?pid=ImgDet&rs=1',
            },
            content: 'Las tortugas estan bonitas.',
            media: '',
            likes: 5,
            comments: 3,
            timestamp: 'Hace 3 horas',
        },

    ]);


	const [resenas, setResenas] = useState([

        {
            id: 1,
            game: {
                name: 'Resident Evil 5',
                avatar: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0'
            },
            user: {
                name: 'Usuario 1',
                avatar: 'https://th.bing.com/th/id/OIP.3hckg2BT4mldMAuuo6TUrQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            },
            content: 'Este es un comentario de prueba.',
            calf: '5',
            likes: 10,
            comments: 5,
            timestamp: 'Hace 2 horas',
        },

        {
            id: 2,
            game: {
                name: '',
                avatar: ''
            },
            user: {
                name: 'Usuario 2',
                avatar: 'https://th.bing.com/th/id/OIP.DMDfV6N9jhYjyQCLGLlH5QHaLH?pid=ImgDet&rs=1',
            },
            content: 'Las tortugas estan bonitas.',
            calf: '4',
            likes: 5,
            comments: 3,
            timestamp: 'Hace 3 horas',
        },

    ]);


  	return (

    	<div className='d-flex flex-column vh-100 align-items-center '>

			<div className="header col-12 position-sticky">
                <h1>BYTE-STREAM</h1>
            </div>


			<div className="container col-8 d-flex justify-content-center mt-2 mb-5 h-100">


				<div className=' col-12 col-md-10 col-sm-10 col-xs-12 '>

					<div className="login col-12 col-md-10 col-sm-10 col-xs-12 d-flex w-100 mb-2">
                        <h2 className='mt-3'>Perfil</h2>
                        <hr />
                    </div>


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


					<div className="login col-12 col-md-10 col-sm-10 col-xs-12 d-flex w-100 mt-3">
                        <h2 className='mt-3'>Tus publicaciones</h2>
                        <hr />
                    </div>


					<div className='row buttons mt-2'>

						<div className='col-6 d-flex justify-content-center p-0'>

							<button
								className={`col-10 btn btn-seccion ${activeTab === 'Post' ? 'bg-light' : ''}`}
								onClick={() => setActiveTab('Post')}
							>
								Post

							</button>

						</div>


						<div className='col-6 d-flex justify-content-center p-0'>

							<button
								className={`col-10 btn btn-seccion ${activeTab === 'Resena' ? 'bg-light' : ''}`}
								onClick={() => setActiveTab('Resena')}
							>
								Reseña

							</button>

						</div>

					</div>


					<div className={`d-flex flex-column mt-2 ${activeTab === 'Post' ? 'content-post' : 'content-hidden'}`} >

                        {activeTab === 'Post' &&   (
                            
                            <>
                                <form className='Tus-Post'>

                                    <div className='container d-flex justify-content-center mt-2 mb-4 h-100'>

										<div className=' col-12 col-md-10 col-sm-10 col-xs-12'>

											{posts.map((post) => (
												
												<div key={post.id} className='post-container mb-4'>

													<div className='post-top'>

														<div className='user-info'>

															<img
																src={post.user.avatar}
																alt={`Foto de perfil de ${post.user.name}`}
																className='profile-img'
															/>
															<span className='username'>{post.user.name}</span>
															
														</div>


														<div className='right-info'>

															{post.game.name && post.game.avatar && (

																<div className='game-info'>
																	
																	<span className='username'>{post.game.name}</span>
																	<img
																		src={post.game.avatar}
																		alt={`Foto del juego ${post.game.name}`}
																		className='profile-img'
																	/>

																</div>

															)}

															<div className='dropdown'>

																<BiIco.BiDotsVerticalRounded className='dropdown-toggle drop-dots' data-bs-toggle='dropdown' aria-expanded='false' />
																
																<ul className='dropdown-menu'>
																	<li><button className='dropdown-item' type='button'>Denunciar</button></li>
																	<li><button className='dropdown-item' type='button'>Guardar</button></li>
																</ul>

															</div>

														</div>


													</div>


													<div className='post-body'>

														<p className='post-content'>{post.content}</p>

														<div className='d-flex justify-content-center'>
															{post.media && ( 
																<img src={post.media} alt='Media' className='post-media' />
															)}
														</div>

													</div>


													<div className='post-actions post-bottom'>

														<div className='post-activity'>

															<button className='like-button'>
																<AiIco.AiOutlineLike/> {post.likes}
															</button>

															<button className='comment-button'>
																<BiIco.BiComment/> {post.comments}
															</button>

														</div>

														<span className='timestamp'>{post.timestamp}</span>

													</div>


												</div>

											))}

										</div>

                                    </div>

                                </form>

                            </>

                        )}
                        

                    </div>



					<div className={`d-flex flex-column mt-2 ${activeTab === 'Resena' ? 'content-resena' : 'content-hidden'}`} >
        
                        {activeTab === 'Resena' &&  (
                            
                            <>
                                <form className='Tus-Resena'>

                                    <div className='container d-flex justify-content-center mt-2 mb-4 h-100'>

										<div className=' col-12 col-md-10 col-sm-10 col-xs-12'>

											{resenas.map((resena) => (
												
												<div key={resena.id} className='resena-container mb-4'>

													<div className='resena-top'>

														<div className='user-info'>

															<img
																src={resena.user.avatar}
																alt={`Foto de perfil de ${resena.user.name}`}
																className='profile-img'
															/>
															<span className='username'>{resena.user.name}</span>
															
														</div>


														<div className='right-info'>

															{resena.game.name && resena.game.avatar && (

																<div className='game-info'>
																	
																	<span className='username'>{resena.game.name}</span>
																	<img
																		src={resena.game.avatar}
																		alt={`Foto del juego ${resena.game.name}`}
																		className='profile-img'
																	/>

																</div>

															)}

															<div className='dropdown'>

																<BiIco.BiDotsVerticalRounded 
																	className='dropdown-toggle drop-dots' 
																	data-bs-toggle='dropdown' 
																	aria-expanded='false' 
																/>
																
																<ul className='dropdown-menu'>
																	<li><button className='dropdown-item' type='button'>Denunciar</button></li>
																	<li><button className='dropdown-item' type='button'>Guardar</button></li>
																</ul>

															</div>

														</div>


													</div>


													<div className='resena-body'>
														<p className='resena-content'>{resena.content}</p>

														<div className='d-flex align-items-center justify-content-center'>
															{resena.calf && (
															<>
																<p className='mr-2'>Tu calificación: {resena.calf} estrellas</p>
																{[1, 2, 3, 4, 5].map((value) => (
																<span
																	key={value}
																	style={{ cursor: 'pointer', marginRight: '5px' }}
																>
																	{value <= resena.calf ? <BiSolidStar className='resena-calf' /> : <BiStar className='resena-calf' />}
																</span>
																))}
															</>
															)}
														</div>
													</div>


													<div className='resena-actions resena-bottom'>

														<div className='resena-activity'>

															<button className='like-button'>
																<AiIco.AiOutlineLike/> {resena.likes}
															</button>

															<button className='comment-button'>
																<BiIco.BiComment/> {resena.comments}
															</button>

														</div>

														<span className='timestamp'>{resena.timestamp}</span>

													</div>


												</div>

											))}

											</div>

                                    </div>

                                </form>

                            </>

                        )}
                        

                    </div>
											



				</div>


			</div>


		</div>
  
	)
}

export default Profile