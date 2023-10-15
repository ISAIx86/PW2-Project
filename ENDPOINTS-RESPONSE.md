# Respuestas de Endpoints

Listado de las respuestas de operación exitosa de
cada endpoint del proyecto.

La estructura general de las respuestas es la siguiente:
``` 
{
    status: "",     // Estado de la respuesta. 'success' si fue exitoso. 'failed' para errores mínimos, formularios con información incorrecta, etc. 'error' si hubo algún error de ejecución.
    content: {}     // Contenido de la respuesta. Puede variar. Puede ser un objeto JSON o un texto simple.
}
```
Aquí se muestran solo las respuestas que contienen objetos JSON
resultado de consultas de información. Se saltaron los endpoints
que responden con puro texto.

## Usuarios

5. Login
```
{
    content: {
        message: "Bienvenido, ${user.username}.",   // Mensaje de bienvenida.
        token: "$BearerToken"                       // Token de autorización.
    }
}
```

6. Login Mod
```
{
    content: {
        message: "Bienvenido, ${user.username}.",   // Mensaje de bienvenida.
        token: "$BearerToken"                       // Token de autorización de moderador.
    }
}
```

9. Requests
Arreglo de elementos.
```
{
    content: [
        {
            {
                image: "$image",        // Imagen de perfil del usuario.
                username: "$username",  // Nombre de usuario.
                descrip: "$descrip"     // Descripción del usuario. *Puede no aparecer si no se ha escrito*.
            }
        }
    ]
}
```

11. Search by Username
Arreglo de elementos.
```
{
    content: [
        {
            image: "$image",                // Imagen de perfil del usuario.
            username: "$username",          // Nombre de usuario.
            descrip: "$descrip",            // Descripción del usuario. *Puede no aparecer si no se ha escrito*.
            is_following: "$Boolean"        // Muestra si sigues al usuario o no.
        }
    ]
}
```

12. Perfil
```
{
    content: {
        image: "$image",                // Imagen de perfil del usuario.
        username: "$username",          // Nombre de usuario.
        descrip: "$descrip",            // Descripción del usuario. *Puede no aparecer si no se ha escrito*.
        is_private: "$is_private",      // Configuración de privacidad. *TRUE o FALSE*.
        is_following: "$Boolean",       // Muestra si sigues al usuario o no.
        nombres. "$nombres",            // Nombres reales del usuario.
        apellidos: "$apellidos"         // Apellidos del usuario.
    }
}
```

## Juegos

6. Get One
```
{
    content: {
        image: "$image",                // Imagen del juego.
        cover: "$cover",                // Portada del juego.
        title: "$title",                // Título del juego.
        rating: "$rating",              // Calificación del juego.
        followers: "$Num.Int",          // Cantidad de seguidores.
        release_date: "$release_date",  // Fecha de lanzamiento.
        developers: [                   // ARREGLO de Desarrolladores.
            {
                title: "$dev.title"     // Título del desarrollador.
            }
        ],
        platforms: [                    // ARREGLO de Plataformas.
            {
                title: "$plat.title"    // Título de la plataforma.
            }
        ],
        genre: [                        // ARREGLO de Géneros.
            {
                title: "$gen.title"     // Título del Género.
            }
        ],
        descrip: "$descrip",            // Descripción del juego.
        classification: {               // Clasificación del juego.
            title: "class.title",       // Título de la clasificación.
            image: "class.image"        // Estampa de la clasificación.
        },
        is_following: "$Boolean"        // Muestra si sigues el juego o no.
    }
}
```

7. Search by Title
Arreglo de elementos.
```
{
    content: [
        name_id: "$name_id",            // Código de nombre del juego.
        image: "$image",                // Imágen del juego.
        title: "$title",                // Título del juego.
        developers: [                   // ARREGLO de Desarrolladores.
            {
                title: "$dev.title"     // Título del desarrollador.
            }     
        ],
        year: "$Num.Int",               // Año de lanzamiento.
        is_following: "$Boolean"        // Muestra si sigues el juego o no.
    ]
}
```

## Clasificaciones

4. Search by Title
Arreglo de elementos.
```
{
    content: [                  
        {
            _id: "$_id",        // ID de la clasificación.
            title: "$title",    // Título de la clasificación.
            image: "$image"     // Estampa de la clasificación.
        }
    ]
}
```

5. Get by ID
```
{
    content: {
        _id: "$_id",                        // ID de la clasificación.
        title: "$title",                    // Título de la clasificación.
        image: "$image",                    // Estampa de la clasificación.
        created_by: {                       // Información del creador. 
            image: "$user.image",           // Imagen de perfil del creador.
            username: "$user.username"      // Nombre de usuario del creador.
        }
    }
}
```

## Desarrolladores

4. Search by Title
Arreglo de elementos.
```
{
    content: [                  
        {
            _id: "$_id",        // ID del desarrollador.
            title: "$title"     // Título del desarrollador.
        }
    ]
}
```

5. Get by ID
```
{
    content: {
        _id: "$_id",                        // ID del desarrollador.
        title: "$title",                    // Título del desarrollador.
        created_by: {                       // Información del creador. 
            image: "$user.image",           // Imagen de perfil del creador.
            username: "$user.username"      // Nombre de usuario del creador.
        }
    }
}
```

## Géneros

4. Search by Title
Arreglo de elementos.
```
{
    content: [                  
        {
            _id: "$_id",        // ID del género.
            title: "$title"     // Título del género.
        }
    ]
}
```

5. Get by ID
```
{
    content: {
        _id: "$_id",                        // ID del género.
        title: "$title",                    // Título del género.
        created_by: {                       // Información del creador. 
            image: "$user.image",           // Imagen de perfil del creador.
            username: "$user.username"      // Nombre de usuario del creador.
        }
    }
}
```

## Plataformas

4. Search by Title
Arreglo de elementos.
```
{
    content: [                  
        {
            _id: "$_id",        // ID de la plataforma.
            title: "$title"     // Título de la plataforma.
        }
    ]
}
```

5. Get by ID
```
{
    content: {
        _id: "$_id",                        // ID de la plataforma.
        title: "$title",                    // Título de la plataforma.
        created_by: {                       // Información del creador. 
            image: "$user.image",           // Imagen de perfil del creador.
            username: "$user.username"      // Nombre de usuario del creador.
        }
    }
}
```

## Reseñas

2. Get by Game
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        }
        data: [                                                         // ARREGLO de resultados.
            {
                _id: "$_id",                                            // ID de la reseña.
                user_card: {                                            // Información del usuario autor.
                    image: "$user.image",                               // Imágen de perfil del usuario.
                    username: "$user.username"                          // Nombre de usuario.
                },
                container: {                                            // Contenido de la reseña.
                    content: "$content",                                // Texto de la reseña.
                    rate: "$rate"                                       // Calificación.
                },
                article_details: {                                      // Detalles de artículo.
                    publish_datetime: "$article.publish_datetime",      // Fecha de publicación.
                    you_like: "$Boolean",                               // Muestra si diste Like.
                    likes: "$Num.Int"                                   // Cantidad de likes.
                }
            }
        ]
    }   
}
```

## Publicaciones

3. By Profile
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        },
        data: [                                                         // ARREGLO de resultados.
            {
                _id: "$_id",                                            // ID de la publicación.
                user_card: {                                            // Información del usuario autor.
                    image: "$user.image",                               // Imágen de perfil del usuario.
                    username: "$user.username"                          // Nombre de usuario.
                },
                game_card: {                                            // Información del juego. *Puede no aparecer si la publicación no está relacionada con un juego*.
                    name_id: "$game.name_id",                           // Código de nombre del juego.
                    image: "$game.image",                               // Imágen del juego.
                    title: "$game.title"                                // Título del juego.
                },
                content: {                                              // Contenido de la publicación.
                    content: "$content",                                // Texto de la publicación.
                    multimedia: [                                       // Contenido multimedia.
                        {
                            source: "$multim.directory"                 // Nombre de archivo.
                        }
                    ]
                },
                article_details: {                                      // Detalles de artículo.
                    publish_datetime: "$article.publish_datetime",      // Fecha de publicación.
                    you_like: "$Boolean",                               // Muestra si diste Like.
                    likes: "$Num.Int"                                   // Cantidad de likes.
                }
            }
        ]
    }
}
```

4. By Game
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        },
        data: [                                                         // ARREGLO de resultados.
            {
                _id: "$_id",                                            // ID de la publicación.
                user_card: {                                            // Información del usuario autor.
                    image: "$user.image",                               // Imágen de perfil del usuario.
                    username: "$user.username"                          // Nombre de usuario.
                },
                game_card: {                                            // Información del juego. *Puede no aparecer si la publicación no está relacionada con un juego*.
                    name_id: "$game.name_id",                           // Código de nombre del juego.
                    image: "$game.image",                               // Imágen del juego.
                    title: "$game.title"                                // Título del juego.
                },
                content: {                                              // Contenido de la publicación.
                    content: "$content",                                // Texto de la publicación.
                    multimedia: [                                       // Contenido multimedia.
                        {
                            source: "$multim.directory"                 // Nombre de archivo.
                        }
                    ]
                },
                article_details: {                                      // Detalles de artículo.
                    publish_datetime: "$article.publish_datetime",      // Fecha de publicación.
                    you_like: "$Boolean",                               // Muestra si diste Like.
                    likes: "$Num.Int"                                   // Cantidad de likes.
                }
            }
        ]
    }
}
```

5. Feed
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        },
        data: [                                                         // ARREGLO de resultados.
            {
                _id: "$_id",                                            // ID de la publicación.
                user_card: {                                            // Información del usuario autor.
                    image: "$user.image",                               // Imágen de perfil del usuario.
                    username: "$user.username"                          // Nombre de usuario.
                },
                game_card: {                                            // Información del juego. *Puede no aparecer si la publicación no está relacionada con un juego*.
                    name_id: "$game.name_id",                           // Código de nombre del juego.
                    image: "$game.image",                               // Imágen del juego.
                    title: "$game.title"                                // Título del juego.
                },
                content: {                                              // Contenido de la publicación.
                    content: "$content",                                // Texto de la publicación.
                    multimedia: [                                       // Contenido multimedia.
                        {
                            source: "$multim.directory"                 // Nombre de archivo.
                        }
                    ]
                },
                article_details: {                                      // Detalles de artículo.
                    publish_datetime: "$article.publish_datetime",      // Fecha de publicación.
                    you_like: "$Boolean",                               // Muestra si diste Like.
                    likes: "$Num.Int"                                   // Cantidad de likes.
                }
            }
        ]
    }
}
```

## Denuncias

3. Get Report
LA ESTRUCTURA PUEDE VARIAR:
Cuando el artículo es una reseña.
```
{
    content: {
        _id: '$id',                                                 // ID del reporte.
        reporter_data: {                                            // Información del denunciante.
            id: '$reporter._id',                                    // ID del denunciante.
            image: '$reporter.image',                               // Imagen del denunciante.
            username: '$reporter.username',                         // Nombre de usuario del denunciante.
            is_deleted: '$reporter.is_deleted'                      // Estado activo del usuario.
        },
        author_data: {                                              // Información del autor del artículo.
            id: '$article_author._id',                              // ID del autor del artículo.
            image: '$article_author.image',                         // Imagen del autor del artículo.
            username: '$article_author.username',                   // Nombre de usuario del artículo.
            is_deleted: '$article_author.is_deleted'                // Estado activo del usuario.
        },
        article_type: '$article_details.article_type',              // Tipo de artículo.
        article_data: {                                             // Información del artículo.
            game_card: {                                            // Información del juego.
                name_id: '$game_data.name_id',                      // Código de nombre del juego.
                image: '$game_data.image',                          // Imágen de título del juego.
                title: '$game_data.title'                           // Título del juego.
            },
            container: {                                            // Contenido de la publicación.
                content: '$article_data.content',                   // Texto de la reseña.
                rate: '$article_data.rate'                          // Calificación de la reseña.
            },
            article_details: {                                      // Detalles de artículo. 
                publish_datetime: '$article_details.created_at',    // Fecha de publicación del artículo.
                likes: '$Num.Int'                                   // Cantidad de likes.
            },
            is_deleted: '$Boolean'                                  // Estado activo.
        }
    }
}
```
Cuando el artículo es una publicación.
```
{
    content: {
        _id: '$id',                                                 // ID del reporte.
        reporter_data: {                                            // Información del denunciante.
            id: '$reporter._id',                                    // ID del denunciante.
            image: '$reporter.image',                               // Imagen del denunciante.
            username: '$reporter.username',                         // Nombre de usuario del denunciante.
            is_deleted: '$reporter.is_deleted'                      // Estado activo del usuario.
        },
        author_data: {                                              // Información del autor del artículo.
            id: '$article_author._id',                              // ID del autor del artículo.
            image: '$article_author.image',                         // Imagen del autor del artículo.
            username: '$article_author.username',                   // Nombre de usuario del artículo.
            is_deleted: '$article_author.is_deleted'                // Estado activo del usuario.
        },
        article_type: '$article_details.article_type',              // Tipo de artículo.
        article_data: {                                             // Información del artículo.
            game_card: {                                            // Información del juego. *Puede no aparecer si la publicación no está relacionada con un juego*.
                name_id: '$game_data.name_id',                      // Código de nombre del juego.
                image: '$game_data.image',                          // Imágen de título del juego.
                title: '$game_data.title'                           // Título del juego.
            },
            container: {                                            // Contenido de la publicación.
                content: '$article_data.content',                   // Texto de la publicación.
                multimedia: [                                       // Contenido multimedia.
                    {
                        source: '$multim.directory'                 // Nombre de archivo.
                    }
                ]
            },
            article_details: {                                      // Detalles de artículo. 
                publish_datetime: '$article_details.created_at',    // Fecha de publicación del artículo.
                likes: '$Num.Int'                                   // Cantidad de likes.
            },
            is_deleted: '$Boolean'                                  // Estado activo.
        }
    }
}
```

4. Get Reports
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        },
        data: [
            {
                _id: "$_id"                                             // ID del reporte.
                article_id: '$article_detail._id',                      // ID del artículo denunciado.
                article_author: {                                       // Información del autor del artículo
                    id: '$article_author._id',                          // ID del autor del artículo.
                    image: '$article_author.image',                     // Imagen del autor del artículo.
                    username: '$article_author.username'                // Nombre de usuario del autor del artículo.
                },
                reporter: {                                             // Información del denunciante.
                    id: '$reporter._id',                                // ID del denunciante.
                    image: '$reporter.image',                           // Imagen del denunciante.
                    username: '$reporter.username'                      // Nombre de usuario del denunciante.
                },
                report_date: '$created_at',                             // Fecha de la denuncia.
                article_date: '$article_detail.created_at'              // Fecha de publicación del artículo.
            }
        ]
    }
}
```

5. Get Deleted
```
{
    content: {
        pagination_data: {                                              // Información de paginación.
            total_docs: "$Num.Int"                                      // Conteo de documentos consultados.
            page: "$Num.Int"                                            // Página actual.
            elements: "$Num.Int"                                        // Elementos por página.
        },
        data: [
            {
                _id: "$_id"                                             // ID del reporte.
                article_id: '$article_detail._id',                      // ID del artículo denunciado.
                article_author: {                                       // Información del autor del artículo
                    id: '$article_author._id',                          // ID del autor del artículo.
                    image: '$article_author.image',                     // Imagen del autor del artículo.
                    username: '$article_author.username',               // Nombre de usuario del autor del artículo.
                    is_deleted: '$Boolean'                              // Estado activo del usuario.
                },
                reporter: {                                             // Información del denunciante.
                    id: '$reporter._id',                                // ID del denunciante.
                    image: '$reporter.image',                           // Imagen del denunciante.
                    username: '$reporter.username',                     // Nombre de usuario del denunciante.
                    is_deleted: '$Boolean'                              // Estado activo del usuario.
                },
                report_date: '$created_at',                             // Fecha de la denuncia.
                article_date: '$article_detail.created_at'              // Fecha de publicación del artículo.
                solver_data: {                                          // Información del moderador que cerró la denuncia.
                    id: '$solver._id',                                  // ID del moderador.
                    image: '$solver.image',                             // Imágen del moderador.
                    username: '$solver.username'                        // Nombre de usuario del moderador.
                },
                justification: '$solved_text'                           // Texto de justificación del cierre.
            }
        ]
    }
}
```