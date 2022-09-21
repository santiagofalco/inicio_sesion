import { Server } from 'socket.io'
import MessageService from './messageService.js'
import Service from './service.js'

let io = undefined

const productService = new Service('./productos.json')
const messageService = new MessageService('./messages.json')

const newSocket = (server) => {
    if (!io) {
        io = new Server(server)

        io.on('connection', socket => {
            console.log('Cliente conectado en socket con id: ' + socket.id)

            socket.on('productoItem', async productoItem => {
                let producto = await productService.post(productoItem)
                let productList = await productService.getAll()
                io.emit('productList', productList) //envia todos los productos
            })

            socket.on('message', async data => {
                let mensaje = await messageService.post(data)
                let history = await messageService.getAllMessages()
                io.emit('mensajes', history) //envia todos los mensajes
            })
        })
    }

    return io
}

export const getSocket = () => {
    return io
}

export default newSocket