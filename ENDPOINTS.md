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
    Headers:
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

2. Update
    Método: POST
    URL: http://localhost:5000/user/update
    Modificación de datos de usuario.
    Formulario:
    -   image: Imagen de usuario. Opcional.
    -   nombres: Nombres del usuario. Opcional.
    -   apellidos: Apellidos del usuario. Opcional.
    -   username: Nombre de usuario único. Opcional.
    -   descrip: Texto de descripción del usuario. Opcional.
    -   privacy: Configuración de privacidad del usuario. Opcional.
    -   default_img: Desactiva la imagen de perfil y coloca la imagen por defecto. Opcional
    -   fecha_nac: Fecha de nacimiento del usuario. Opcional.
    -   email: Correo electrónico del usuario. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

3. Password
    Método: POST
    URL: http://localhost:5000/user/update/password
    Cambiar contraseña
    Formulario
    -   password: Contraseña actual. Requerido.
    -   new_password: Nueva contraseña. Requerido.
    -   conf_password: Confirmación de contraseña. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

4. Delete
    Método: POST
    URL: http://localhost:5000/user/delete
    Cerrar perfil de usuario.
    - SIN FORMULARIO -
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

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

7. Follow
    Método: POST
    URL: http://localhost:5000/user/follow
    Seguir a otro usuario o dejar solicitud de seguimiento.
    Formulario:
    -   target_id: ID del usuario al que se quiere seguir.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

8. Accept Follow
    Método: POST
    URL: http://localhost:5000/user/accept_follower
    Aceptar petición de seguimiento.
    Formulario:
    -   req_id: ID del usuario al que se quiere aceptar su solicitud.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

9. Requests
    Método: GET
    URL: http://localhost:5000/user/requests
    Obtiene la lista de solicitudes de seguimiento del usuario.
    - SIN PARÁMETROS -
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

10. Unfollow
    Método: POST
    URL: http://localhost:5000/user/unfollow
    Dejar de seguir a un usuario.
    Formulario:
    -   target_id: ID del usuario al que se quiere dejar de seguir.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

11. Search by Username
    Método: POST
    URL: http://localhost:5000/user/search/username
    Busca usuarios aproximados a la coincidencia.
    Formulario:
    -   text_input: Entrada de la barra de búsqueda. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

12. Perfil
    Método: GET
    URL: http://localhost:5000/user/profile/:_username?
    Obtiene información de perfil de un usuario.
    Parámetros:
    -   _username: Nombre de usuario del perfil buscado. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

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
    -   release_date: Fecha de lanzamiento del videojuego. Requerido.
    -   classification: Clasificación de contenido de la ESRB. Requerido.
    -   genre: Géneros asociados al juego. Requerido.
    -   developers: Desarrolladores que crearon el juego. Requerido.
    -   platforms: Plataformas en los que está disponible el juego. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderador. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

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
    -   release_date: Fecha de lanzamiento del videojuego. Opcional.
    -   classification: Clasificación de contenido de la ESRB. Opcional.
    -   genre: Géneros asociados al juego. Opcional.
    -   developers: Desarrolladores que crearon el juego. Opcional.
    -   platforms: Plataformas en los que está disponible el juego. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de moderador. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

3. Delete
    Método: POST
    URL: http://localhost:5000/games/delete
    Eliminar videojuego del catálogo.
    Formulario:
    -   id: ID del videojuego a modificar. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderador. Requerido.

4. Follow
    Método: POST
    URL: http://localhost:5000/games/follow
    El usuario sigue un videojuego.
    Formulario:
    -   target_id: ID del videojuego que el usuario desea seguir. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

5. Unfollow
    Método: POST
    URL: http://localhost:5000/games/unfollow
    El usuario deja de seguir un videojuego.
    Formulario:
    -   target_id: ID del videojuego que se quiere dejar de seguir. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

6. Get One
    Método: GET
    URL: http://localhost:5000/games/details/:_game_id
    Consulta información de un videojuego.
    Parámetros:
    -   _game_id: Código de nombre.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

7. Search by Title
    Método: POST
    URL: http://localhost:5000/games/search
    Busca videojuegos que coincidan con la búsqueda.
    Formulario:
    -   text_input: Entrada de la barra de búsqueda. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

## Clasificaciones

1. Create
    Método: POST
    URL: http://localhost:5000/classification/create
    Crea una clasificación por edad.
    Formulario:
    -   title: Título de la clasificación. Requerido.
    -   image: Logo ESRB de la clasificación. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

2. Modify
    Método: POST
    URL: http://localhost:5000/classification/modify
    Modifica una clasificación.
    Formulario:
    -   id: ID de la clasificación a modificar. Requerido.
    -   title: Título de la clasificación. Opcional.
    -   image: Logo ESRB de la clasificación. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

3. Delete
    Método: POST
    URL: http://localhost:5000/classification/delete
    Elimina una clasificación.
    Formulario:
    -   id: ID de la clasificación. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

4. Search by Title
    Método: POST
    URL: http://localhost:5000/classification/search
    Busca clasificaciones por nombre.
    Formulario:
    -   text_input: Texto para buscar. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

5. Get by ID
    Método: GET
    URL: http://localhost:5000/classification/:_class_id
    Busca una clasificación por su ID.
    Parámetros:
    -   _class_id: ID de la clase a obtener. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

## Desarrolladores

1. Create
    Método: POST
    URL: http://localhost:5000/developer/create
    Registra una desarrolladora de videojuegos.
    Formulario:
    -   title: Nombre de la desarrolladora. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/developer/modify
    Modifica una desarrolladora.
    Formulario:
    -   id: ID de la desarrolladora a modificar. Requerido.
    -   title: Nombre de la desarrolladora. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/developer/delete
    Elimina una desarrolladora.
    Formulario:
    -   id: ID de la desarrolladora. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

4. Search by Title
    Método: POST
    URL: http://localhost:5000/developer/search
    Busca desarrolladores por nombre.
    Formulario:
    -   text_input: Texto para buscar. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

5. Get by ID
    Método: GET
    URL: http://localhost:5000/developer/:_dev_id
    Busca un desarrollador por su ID.
    Parámetros:
    -   _dev_id: ID del desarrollador a obtener. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

## Géneros

1. Create
    Método: POST
    URL: http://localhost:5000/genre/create
    Registra un género de videojuego.
    Formulario:
    -   title: Nombre del género. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/genre/modify
    Modifica un género.
    Formulario:
    -   id: ID del género a modificar. Requerido.
    -   title: Nombre del género. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/genre/delete
    Elimina un género.
    Formulario:
    -   id: ID del género. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

4. Search by Title
    Método: POST
    URL: http://localhost:5000/genre/search
    Busca géneros por nombre.
    Formulario:
    -   text_input: Texto para buscar. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

5. Get by ID
    Método: GET
    URL: http://localhost:5000/genre/:_genre_id
    Busca un género por su ID.
    Parámetros:
    -   _genre_id: ID del género a obtener. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

## Plataformas

1. Create
    Método: POST
    URL: http://localhost:5000/platform/create
    Registra una plataforma de videojuegos.
    Formulario:
    -   title: Nombre de la plataforma. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

2. Modify
    Método: POST
    URL: http://localhost:5000/platform/modify
    Modifica una plataforma.
    Formulario:
    -   id: ID de la plataforma a modificar. Requerido.
    -   title: Nombre de la plataforma. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

3. Delete
    Método: POST
    URL: http://localhost:5000/platform/delete
    Elimina una plataforma.
    Formulario:
    -   id: ID de la plataforma. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

4. Search by Title
    Método: POST
    URL: http://localhost:5000/platform/search
    Busca plataformas por nombre.
    Formulario:
    -   text_input: Texto para buscar. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

5. Get by ID
    Método: GET
    URL: http://localhost:5000/platform/:_plat_id
    Busca una plataforma por su ID.
    Parámetros:
    -   _plat_id: ID de la plataforma a obtener. Requerido.
    Headers:
    -   Authorization: Bearer Token. Token de moderadores. Requerido.

# Reseñas

1. Create
    Método: POST
    URL: http://localhost:5000/review/create
    Publica una reseña sobre un juego.
    Formulario:
    -   game_id: ID del juego al que va dirigida la reseña. Requerido
    -   rate: Calificación al juego del 0 a 5. Requerido.
    -   content: Comentarios del autor. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

2. Get by Game
    Método: GET
    URL: http://localhost:5000/review/by_game/:_game_id
    Obtener reseñas de un juego.
    Parámetros:
    -   _game_id: Código de nombre del juego.
    Query:
    -   page: Página de contenido.
    -   elem_per_page: Cantidad de elementos por página.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

# Publicaciones

1. Create
    Método: POST
    URL: http://localhost:5000/post/create
    Crear una publicación.
    Formulario:
    -   game_id: ID del juego relacionado con la publicacion. Opcional.
    -   content: Contenido de texto de la publicación. Requerido.
    -   multimedia: Archivos multimedia. Opcional.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.
    -   Content-Type: 'multipart/form-data'. Formulario con archivos multimedia.

2. Delete
    Método: POST
    URL: http://localhost:5000/post/delete
    Eliminar una publicación.
    Formulario:
    -   id: ID del post a eliminar.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

3. By Profile
    Método: GET
    URL: http://localhost:5000/post/:_username
    Busca publicaciones de un usuario.
    Parámetros:
    -   _username: Nombre de usuario a filtrar las publicaciones. Requerido.
    Query:
    -   page: Página de contenido.
    -   elem_per_page: Cantidad de elementos por página.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

4. By Game
    Método: GET
    URL: http://localhost:5000/post/:_game_id
    Busca publicaciones por juego.
    Parámetros:
    -   _game_id: Código de nombre del juego a filtrar. Requerido.
    Query:
    -   page: Página de contenido.
    -   elem_per_page: Cantidad de elementos por página.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.

5. Feed
    Método: GET
    URL: http://localhost:5000/post/feed
    Obtiene publicaciones del feed del usuario.
    Según juegos que sigue y usuarios que sigue.
    Query:
    -   page: Página de contenido.
    -   elem_per_page: Cantidad de elementos por página.
    Headers:
    -   Authorization: Bearer Token. Token de usuario. Requerido.