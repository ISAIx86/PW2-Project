import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as BiIco from 'react-icons/bi';
import * as AiIco from 'react-icons/ai';

import { BiSearch, BiImageAdd, BiTrash, BiSolidStar, BiStar  } from "react-icons/bi";

import '../styles/addPage.css';

function Add() {

    const [activeTab, setActiveTab] = useState('Post');
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleMediaUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedMedia([...selectedMedia, ...files]);
    };

    const removeMedia = (index) => {
        const updatedMedia = [...selectedMedia];
        updatedMedia.splice(index, 1);
        setSelectedMedia(updatedMedia);
    };


    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Aquí puedes realizar acciones con la imagen y el archivo seleccionados, como subirlos a un servidor.
        // También puedes incluir el comentario (comment) 
    
        // Limpia los estados después de manejar la carga.
        setSelectedMedia(null);
        setComment('');
        setRating(null);
    };
    
    const [videogame, setVideogame] = useState([

        {
            id: 1,
            name: 'Juego 1',
            avatar: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0',
            desc: 'Descripción del juego 1',
            year: '2023',
        },

        {
            id: 2,
            name: 'Juego 2',
            avatar: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0',
            desc: 'Descripción del juego 2',
            year: '2021',
        },

        {
            id: 3,
            name: 'Juego 3',
            avatar: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0',
            desc: 'Descripción del juego 3',
            year: '2022',
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
                        <h2 className='mt-3 '>Nueva Publicación</h2>
                        <hr />
                    </div>


                    <div className='row buttons'>

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
                                <form className='Creacion-Post'>

                                    <div className='container d-flex justify-content-center mt-2 mb-4 h-100'>

                                        <div className='col-12 col-md-10 col-sm-10 col-xs-12'>

                                            <div className='userprofile-container mb-2'>

                                                <div className='input-container d-flex w-100'>
                                                    <BiIco.BiSearch className='icon' />
                                                    <input className='w-100' type='text' placeholder='Buscar' />
                                                </div> 
                                                
                                            </div>



                                            <div className='scrollable-div mb-5'>

                                                {videogame.map((videogame) => (
                                                    <div className='videogame-info left-info mb-3'>

                                                        <img
                                                            src={videogame.avatar}
                                                            alt={`Foto de perfil de ${videogame.name}`}
                                                            className='profile-img-videogame'
                                                        />


                                                        <div className='d-flex flex-column'>

                                                            <span className='username'>{videogame.name}</span>
                                                            <span className='description'>{videogame.desc}</span>
                                                            <span className='description'>{videogame.year}</span>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                            <div className='content-post-user mb-3'>
                                                <textarea
                                                    id="id-comentario"
                                                    name="comment"
                                                    rows={5} 
                                                    cols={40}
                                                    className="form-control"
                                                    placeholder="Escribe tu post aquí..."
                                                    style={{ height: '200px' , resize: 'none' }}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />

                                            </div>

                                            <div className='post-actions post-bottom'>

                                                <div className='post-activity'>

                                                    <label htmlFor="fileInput" className='addMedia-button mb-3'>
                                                        <BiImageAdd/>
                                                            <input
                                                                type='file'
                                                                id='fileInput'
                                                                multiple
                                                                accept='image/*,video/*'
                                                                onChange={handleMediaUpload}
                                                                style={{ display: 'none' }}
                                                            />
                                                    </label>


                                                    <div className='horizontal-scrollable' >

                                                        {selectedMedia.map((media, index) => (

                                                            <div key={index} className='media-preview'>

                                                                {media.type.startsWith('image/') && (

                                                                    <div style={{ position: 'relative' }}>

                                                                        <img
                                                                            src={URL.createObjectURL(media)}
                                                                            alt={`Media ${index + 1}`}
                                                                            className='selected-image-preview'
                                                                        />

                                                                    <button
                                                                            className='remove-media-button'
                                                                            onClick={() => removeMedia(index)}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: '5px', 
                                                                                right: '5px', 
                                                                                background: 'transparent',
                                                                                border: 'none',
                                                                                color: 'red', 
                                                                                cursor: 'pointer',
                                                                            }}
                                                                        >
                                                                            <BiIco.BiTrash />
                                                                        </button>

                                                                    </div>

                                                                )}

                                                                {media.type.startsWith('video/') && (

                                                                    <div style={{ position: 'relative' }}>

                                                                        <video 
                                                                            controls 
                                                                            className='selected-video-preview'>
                                                                            <source src={URL.createObjectURL(media)} type={media.type} />
                                                                            Tu navegador no soporta el tag de video.
                                                                        </video>

                                                                        <button
                                                                            className='remove-media-button'
                                                                            onClick={() => removeMedia(index)}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: '5px',
                                                                                right: '5px', 
                                                                                background: 'transparent',
                                                                                border: 'none',
                                                                                color: 'red', 
                                                                                cursor: 'pointer',
                                                                            }}
                                                                        >
                                                                            <BiIco.BiTrash />
                                                                        </button>

                                                                    </div>
                                                                )}

                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>

                                            </div>

                                            <div className='d-flex justify-content-center w-100'>
                                                <button type="submit" className="btn btn-primary mt-2 col-lg-4 col-xs-12 col-md-3 mb-3">Publicar</button>
                                            </div>

                                        </div>

                                    </div>

                                </form>

                            </>

                        )}
                        

                    </div>



                    <div className={`d-flex flex-column mt-2 ${activeTab === 'Resena' ? 'content-resena' : 'content-hidden'}`} >
        
                        {activeTab === 'Resena' &&  (
                            
                            <>
                                <form className='Creacion-Resena'>

                                    <div className='container d-flex justify-content-center mt-2 mb-4 h-100'>

                                        <div className='col-12 col-md-10 col-sm-10 col-xs-12'>

                                            <div className='userprofile-container mb-2'>

                                                <div className='input-container d-flex w-100'>
                                                    <BiIco.BiSearch className='icon' />
                                                    <input className='w-100' type='text' placeholder='Buscar' />
                                                </div> 
                                                
                                            </div>



                                            <div className='scrollable-div mb-5'>

                                                {videogame.map((videogame) => (
                                                    <div className='videogame-info left-info mb-3'>

                                                        <img
                                                            src={videogame.avatar}
                                                            alt={`Foto de perfil de ${videogame.name}`}
                                                            className='profile-img-videogame'
                                                        />


                                                        <div className='d-flex flex-column'>

                                                            <span className='username'>{videogame.name}</span>
                                                            <span className='description'>{videogame.desc}</span>
                                                            <span className='description'>{videogame.year}</span>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>


                                            <div className='content-resena-user mb-3'>
                                                <textarea
                                                    id="id-reseña"
                                                    name="comment"
                                                    rows={5} 
                                                    cols={40}
                                                    className="form-control"
                                                    placeholder="Escribe tu reseña aquí..."
                                                    style={{ height: '200px' , resize: 'none' }}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />

                                            </div>


                                            <div>

                                                <p>Tu calificación: {rating} estrellas</p>

                                                {[1, 2, 3, 4, 5].map((value) => (

                                                    <span
                                                        key={value}
                                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                                        onClick={() => handleStarClick(value)}
                                                    >
                                                        {value <= rating ? <BiSolidStar /> : <BiStar />}
                                                    </span>
                                                ))}

                                            </div>


                                            <div className='d-flex justify-content-center w-100'>
                                                <button type="submit" className="btn btn-primary mt-2 col-lg-4 col-xs-12 col-md-3 mb-3">Publicar</button>
                                            </div>

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

export default Add