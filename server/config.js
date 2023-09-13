const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    },
    directories: {
        user_images: "storage/users_images",
        esrb_logos: "resources/esrb_classifications",
        game_covers: "resources/game_covers",
        game_images: "resources/game_images"
    }
}

module.exports = config