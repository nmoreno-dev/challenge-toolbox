import express from 'express'
import logger from './lib/logger'

const PORT = 5000

;(() => {
    const server = express()

    server.use('/', (_, res) => {
        res.status(200).send()
    })

    server.listen(PORT, () => {
        logger.info(`Servidor corriendo en el puerto`)
    })
})()
