# Endpoints

Para los métodos POST, la información debe ir guardada en un FormData.
Por ejemplo, si tenemos un formulario de registro, se puede guardar en un objeto FormData
y pasarlo por axios. Al FormData se le puede añadir campos con el método .append().
EJEMPLO:
```
const handleSubmit = (event) => {                    // Evento de submit a un <form/>
    const user_form = new FormData(event.target)     // Obtiene la info de un <form/>
    user.append('image', selectedFile)          // Ejemplo para añadir la imagen.

    axios.post('http://localhost:5000/user/register', user_form, {headers: {"Content-Type": "multipart/form-data"}})
}

```

Para los métodos GET, los parámetros van en la URL.
Para realizar la operación de consulta, se tendría que inyectar un valor para
el parámetro en la URL.
EJEMPLO:
```
const name_id = document.getElementById('game').getAttribute('name_id') // Ejemplo hipotético de un elemento en HTML que contiene el name_id como atributo.
axios.get(`http://localhost:5000/games/details/${name_id}`)
```

## Usuarios

1. Registro
    Método: POST
    URL: http://localhost:5000/user/register
    Registro de usuario.
    Formulario:
    -   image: Imagen de perfil de usuario.
    -   nombres: Nombres del usuario. Requerido.
    -   apellidos: Apellidos del usuario. Requerido.
    -   username: Alias de usuario. Requerido. Único.
    -   fecha_nac: Fecha de nacimiento del usuario. Requerido.
    -   email: Correo electrónico del usuario. Requerido. Único.
    -   password: Contraseña. Requerido.
    -   conf_password: Confirmación de contraseña. Requerido.

2. Update
    Método: POST
    URL: http://localhost:5000/user/update
    Modificación de datos de usuario.
    Formulario:
    -   image: Imagen de usuario.
    -   nombres: Nombres del usuario.
    -   apellidos: Apellidos del usuario.
    -   username: Nombre de usuario único.
    -   fecha_nac: Fecha de nacimiento del usuario.
    -   email: Correo electrónico del usuario.

3. Login
    Método: POST
    URL: http://localhost:5000/user/login
    Ingreso del usuario.
    Formulario:
    -   email: Correo electrónico del usuario.
    -   password: Contraseña del usuario.

4. Login Mod
    Método: POST
    URL: http://localhost:5000/user/login_mod
    Ingreso de moderador.
    Formulario:
    -   email: Correo electrónico del usuario.
    -   password: Contraseña del usuario.

## Juegos

1. Create
    Método: POST
    URL: http://localhost:5000/games/create
    Registra un videojuego en el catálogo.
    Formulario:
    -   name_id: Código de nombre. Requerido. Único.
    -   title: Título del videojuego.
    -   descrip: Sinopsis o descripción del videojuego.
    -   image: Imagen de título del videojuego.
    -   cover: Imagen de portada del videojuego.
    -   classification: Clasificación de contenido de la ESRB.
    -   genre: Géneros asociados al juego.
    -   developers: Desarrolladores que crearon el juego.
    -   platforms: Plataformas en los que está disponible el juego.

2. Modify
    Método: POST
    URL: http://localhost:5000/games/modify
    Modificar información de un videojuego.
    Formulario:
    -   id: ID del videojuego a modificar.
    -   title: Título del videojuego.
    -   descrip: Sinopsis o descripción del videojuego.
    -   image: Imagen de título del videojuego.
    -   cover: Imagen de portada del videojuego.
    -   classification: Clasificación de contenido de la ESRB.
    -   genre: Géneros asociados al juego.
    -   developers: Desarrolladores que crearon el juego.
    -   platforms: Plataformas en los que está disponible el juego.

3. Delete
    Método: POST
    URL: http://localhost:5000/games/delete
    Eliminar videojuego del catálogo.
    Formulario:
    -   id: ID del videojuego a modificar.

4. GetOne
    Método: GET
    URL: http://localhost:5000/games/details/:game_id
    Consulta información de un videojuego.
    Parámetros:
    -   game_id: Código de nombre.

## Clasificaciones

1. Create
    Método: POST
    URL: http://localhost:5000/classification/create
    Crea una clasificación por edad.
    Formulario:
    -   title: Título de la clasificación. Requerido.
    -   image: Logo ESRB de la clasificación. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/classification/modify
    Modifica una clasificación.
    Formulario:
    -   id: ID de la clasificación a modificar. Requerido.
    -   title: Título de la clasificación. Requerido.
    -   image: Logo ESRB de la clasificación. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/classification/delete
    Elimina una clasificación.
    Formulario:
    -   id: ID de la clasificación. Requerido.

## Desarrolladores

1. Create
    Método: POST
    URL: http://localhost:5000/developer/create
    Registra una desarrolladora de videojuegos.
    Formulario:
    -   title: Nombre de la desarrolladora. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/developer/modify
    Modifica una desarrolladora.
    Formulario:
    -   id: ID de la desarrolladora a modificar. Requerido.
    -   title: Nombre de la desarrolladora. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/developer/delete
    Elimina una desarrolladora.
    Formulario:
    -   id: ID de la desarrolladora. Requerido.

## Géneros

1. Create
    Método: POST
    URL: http://localhost:5000/genre/create
    Registra un género de videojuego.
    Formulario:
    -   title: Nombre del género. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/genre/modify
    Modifica un género.
    Formulario:
    -   id: ID del género a modificar. Requerido.
    -   title: Nombre del género. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/genre/delete
    Elimina un género.
    Formulario:
    -   id: ID del género. Requerido.

## Plataformas

1. Create
    Método: POST
    URL: http://localhost:5000/platform/create
    Registra una plataforma de videojuegos.
    Formulario:
    -   title: Nombre de la plataforma. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/platform/modify
    Modifica una plataforma.
    Formulario:
    -   id: ID de la plataforma a modificar. Requerido.
    -   title: Nombre de la plataforma. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/platform/delete
    Elimina una plataforma.
    Formulario:
    -   id: ID de la plataforma. Requerido.