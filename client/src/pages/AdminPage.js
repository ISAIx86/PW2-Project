import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as BiIco from 'react-icons/bi';
import '../styles/home.css';
import { Button } from 'bootstrap';

function Admin() {
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
      id_publication: 24234,
      content: 'Este es un comentario de prueba.',
      media: 'https://th.bing.com/th/id/OIP.Hx0TNUPJV4BMBbWI516P2wHaEo?w=301&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7', // URL de la imagen o video
      likes: 10,
      comments: 5,
      timestamp: '25/07/2023',
      report: '06/09/2023',
      name_report:'Usuario 6',
      avatar_report:'https://www.paredro.com/wp-content/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg',
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
      id_publication: 48352,
      content: 'Otra publicación interesante.',
      media: 'https://th.bing.com/th/id/R.24d86c1cc073d119639092931f49ba20?rik=lxtvGV4Y8ioSEw&pid=ImgRaw&r=0',
      likes: 5,
      comments: 3,
      timestamp: '13/06/2023',
      report: '26/08/2023',
      name_report:'Usuario 23',
      avatar_report:'https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1016474677.1697328000&semt=ais',
    },
    
  ]);

  return (
    <div className='d-flex flex-column vh-100 align-items-center '>
    <div className="header col-12 position-sticky">
        <h1>BYTE-STREAM</h1>
    </div>
    <div className="container d-flex justify-content-center h-100">
        <div className="login col-12 col-md-10 col-sm-10 col-xs-12">
        <h2 className='mt-1'>Usuarios</h2>
        <hr />
            {posts.map((post) => (
            <div key={post.id}>
              <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">ID Publicación</th>
      <th scope="col">Autor</th>
      <th scope="col">Denunciante</th>
      <th scope="col">Fecha de denuncia</th>
      <th scope="col">Fecha de publicación</th>
      <th scope="col">Reporte</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{post.id}</th>
      <th scope="row">{post.id_publication}</th>
      <td>{post.user.name} <img src={post.user.avatar}
                    alt={`Foto de perfil de ${post.user.name}`}
                    className='profile-img'></img> </td>
      <td>{post.name_report} <img src={post.avatar_report}
                    alt={`Foto de perfil de ${post.name_report}`}
                    className='profile-img'></img> </td>
      <td>{post.report}</td>
      <td>{post.timestamp}</td>
      <button  className="login_form-button col-lg-14 col-xs-12 col-md-14">Ver reporte</button>
    </tr>
  </tbody>
</table>
            </div>
          ))}
          
        </div>
    </div>
</div>
  )
}

export default Admin