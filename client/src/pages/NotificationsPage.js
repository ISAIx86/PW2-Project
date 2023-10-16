import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as BiIco from 'react-icons/bi';
import '../styles/home.css';


function Notification() {
  const [notif, setNotif] = useState([
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
      content: 'Le dio like a tu publicacion.',
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
      content: 'Comentó en tu publicación "Otra publicación interesante."',
      timestamp: 'Hace 3 horas',
    },
  ]);

  return (
    <div className='d-flex flex-column vh-100 align-items-center'>
      <div className='header col-12 position-sticky'>
        <h1>BYTE-STREAM</h1>
      </div>
      <div className='container col-8 d-flex justify-content-center mt-2 mb-5 h-100'>
        <div className=' col-12 col-md-10 col-sm-10 col-xs-12'>
          {notif.map((post) => (
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
                  <div className='game-info'>
                    <span className='username'>{post.game.name}</span>
                    <img
                      src={post.game.avatar}
                      alt={`Foto del juego ${post.game.name}`}
                      className='profile-img'
                    />
                  </div>
                  <div className='dropdown'>
                    <BiIco.BiDotsVerticalRounded className='dropdown-toggle drop-dots' data-bs-toggle='dropdown' aria-expanded='false' />
                    <ul className='dropdown-menu'>
                      <li><button className='dropdown-item' type='button'>Marcar como leído</button></li>
                      <li><button className='dropdown-item' type='button'>Reportar</button></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='post-body'>
                <p className='post-content'>{post.content}</p>
               
              </div>
              <div className='post-actions post-bottom'>
                
                <span className='timestamp'>{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
