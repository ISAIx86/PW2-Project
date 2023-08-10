const express = require('express')

const app = express()

app.get('/endpoint', (req, res) => res.send('<h1>Esto es un endpoint!</h1>'))

app.listen(5005, () => console.log('SERVIDOR LEVANTADO'))