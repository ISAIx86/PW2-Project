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
    -   image: Imagen de perfil de usuario. Opcional.
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
    -   image: Imagen de usuario. Opcional.
    -   nombres: Nombres del usuario. Opcional.
    -   apellidos: Apellidos del usuario. Opcional.
    -   username: Nombre de usuario único. Opcional.
    -   fecha_nac: Fecha de nacimiento del usuario. Opcional.
    -   email: Correo electrónico del usuario. Opcional.

3. Password
    Método: POST
    URL: http://localhost:5000/user/update/password
    Cambiar contraseña
    Formulario
    -   password: Contraseña actual. Requerido.
    -   new_password: Nueva contraseña. Requerido.
    -   conf_password: Confirmación de contraseña. Requerido.

4. Delete
    Método: POST
    URL: http://localhost:5000/user/delete
    Cerrar perfil de usuario.
    - SIN FORMULARIO -

5. Login
    Método: POST
    URL: http://localhost:5000/user/login
    Ingreso del usuario.
    Formulario:
    -   email: Correo electrónico del usuario.
    -   password: Contraseña del usuario.

6. Login Mod
    Método: POST
    URL: http://localhost:5000/user/login_mod
    Ingreso de moderador.
    Formulario:
    -   email: Correo electrónico del usuario. Requerido.
    -   password: Contraseña del usuario. Requerido.

7. Search by Username
    Método: POST
    URL: http://localhost:5000/user/search/username
    Busca usuarios aproximados a la coincidencia.
    Formulario:
    -   text_input: Entrada de la barra de búsqueda. Requerido.

8. Perfil
    Método: GET
    URL: http://localhost:5000/user/profile/:_username?
    Obtiene información de perfil de un usuario.
    Parámetros:
    -   _username: Nombre de usuario del perfil buscado. Opcional.

## Juegos

1. Create
    Método: POST
    URL: http://localhost:5000/games/create
    Registra un videojuego en el catálogo.
    Formulario:
    -   name_id: Código de nombre. Requerido. Único.
    -   title: Título del videojuego. Requerido.
    -   descrip: Sinopsis o descripción del videojuego. Requerido.
    -   image: Imagen de título del videojuego. Requerido.
    -   cover: Imagen de portada del videojuego. Requerido.
    -   classification: Clasificación de contenido de la ESRB. Requerido.
    -   genre: Géneros asociados al juego. Requerido.
    -   developers: Desarrolladores que crearon el juego. Requerido.
    -   platforms: Plataformas en los que está disponible el juego. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/games/modify
    Modificar información de un videojuego.
    Formulario:
    -   id: ID del videojuego a modificar. Requerido.
    -   name_id: Código de nombre. Opcional.
    -   title: Título del videojuego. Opcional.
    -   descrip: Sinopsis o descripción del videojuego. Opcional.
    -   image: Imagen de título del videojuego. Opcional.
    -   cover: Imagen de portada del videojuego. Opcional.
    -   classification: Clasificación de contenido de la ESRB. Opcional.
    -   genre: Géneros asociados al juego. Opcional.
    -   developers: Desarrolladores que crearon el juego. Opcional.
    -   platforms: Plataformas en los que está disponible el juego. Opcional.

3. Delete
    Método: POST
    URL: http://localhost:5000/games/delete
    Eliminar videojuego del catálogo.
    Formulario:
    -   id: ID del videojuego a modificar. Requerido.

4. GetOne
    Método: GET
    URL: http://localhost:5000/games/details/:game_id
    Consulta información de un videojuego.
    Parámetros:
    -   _game_id: Código de nombre.

5. Search by Title
    Método: POST
    URL: http://localhost:5000/games/search
    Busca videojuegos que coincidan con la búsqueda.
    Parámetros:
    -   text_input: Entrada de la barra de búsqueda. Requerido.

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
    -   title: Título de la clasificación. Opcional.
    -   image: Logo ESRB de la clasificación. Opcional.

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