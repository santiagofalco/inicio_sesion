import { Router } from 'express'
import Service from '../services/service.js'


const router = Router()

const service = new Service('./products.json')

let io


router.get('/', async (req, res) => {
    let productos = await service.getAll()
    let user = req.session.user
    console.log('user en productos', user)
    console.log('req.session', req.session)
    if (req.session.user) {
        res.render('products.pug', {
            message: 'Lista de productos',
            welcomeMessage: `Bienvenido ${user.name}, email: ${user.email}`,
            productos
        })
    } else {
        res.redirect('/login')
    }
})

router.post('/', async (req, res) => {
    const producto = req.body
    if (!producto.name) {
        return res.status(400).send({ status: 'error', error: 'No se envio un nombre de producto' })
    }
    if (!producto.price) {
        return res.status(400).send({ status: 'error', error: 'No se envio un precio de producto' })
    }
    if (!producto.thumbnail) {
        return res.status(400).send({ status: 'error', error: 'No se envio una url de producto' })
    } else {
        const idInsertado = await service.post(producto)
        io.emit('productList', producto)
        res.send({ status: 'success', message: `Producto añadido con id ${idInsertado}` })
    }
})

const getRouter = (socket) => {
    io = socket
    return router
}

export default getRouter