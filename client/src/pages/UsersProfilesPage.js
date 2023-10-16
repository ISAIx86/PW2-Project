import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as BiIco from 'react-icons/bi';
import * as AiIco from 'react-icons/ai';
import * as CiIco from 'react-icons/ci';

import '../styles/users.css';


function UsersProfilesPage() {
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
                name: 'Usuario 1',
                avatar: 'https://th.bing.com/th/id/OIP.3hckg2BT4mldMAuuo6TUrQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            },
            content: 'Otra publicación interesante.',
            media: '',
            likes: 5,
            comments: 3,
            timestamp: 'Hace 3 horas',
        },
    ]);

    const [user, setUser] = useState([
        {
            id: 1,
            name: 'Usuario 1',
            avatar: 'https://th.bing.com/th/id/OIP.3hckg2BT4mldMAuuo6TUrQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            desc: 'Descripción del usuario',
            priv: false,
        },
    ]);

    const [following, setFollowing] = useState(false);
    const handleFollow = () => {
        setFollowing(!following);
    }
    return (
        <div className='d-flex flex-column vh-100 align-items-center'>
            <div className='header col-12 position-sticky'>
                <h1>BYTE-STREAM</h1>
            </div>
            <div className='container col-8 d-flex justify-content-center mt-2 mb-5 h-100'>
                <div className=' col-12 col-md-10 col-sm-10 col-xs-12'>
                    <div className='userprofile-container mb-2'>

                        <div className='user-info left-info'>
                            <img
                                src={user[0].avatar}
                                alt={`Foto de perfil de ${user[0].name}`}
                                className='profileuser-img'
                            />
                            <div className='d-flex flex-column mt-1'>
                                <span className='username'>{user[0].name}</span>
                                <span className='description'>{user[0].desc}</span>
                            </div>


                        </div>
                        <div className='user-actions right-info'>
                            <button
                                className={`btn ${following ? 'btn-following' : 'btn-follow'}`}
                                onClick={handleFollow}
                            >
                                {following ? 'Siguiendo' : 'Seguir'}
                            </button>
                            <div className='dropdown'>
                                <BiIco.BiDotsVerticalRounded className='dropdown-toggle drop-dots' data-bs-toggle='dropdown' aria-expanded='false' />
                                <ul className='dropdown-menu'>
                                    <li><button className='dropdown-item' type='button'>Reportar</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {user[0].priv ? (
                        <div className='private-profile-container'>
                            <div className='post-container private-profile'>
                                <CiIco.CiLock className='private' />
                                <p className='private-profile-message'>
                                    Este perfil es privado
                                </p>
                            </div>
                        </div>
                    ) : (

                        posts.map((post) => (
                            <>
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
                                                <AiIco.AiOutlineLike /> {post.likes}
                                            </button>
                                            <button className='comment-button'>
                                                <BiIco.BiComment /> {post.comments}
                                            </button>
                                        </div>
                                        <span className='timestamp'>{post.timestamp}</span>
                                    </div>
                                </div>
                            </>

                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UsersProfilesPage;
