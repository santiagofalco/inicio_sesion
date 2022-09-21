import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    res.render('loginfail.pug', {
        message: 'Algo salio mal'
    })
})

router.get('/error', async (req, res) => {
    res.status(500).json({ status: 'error' })
})



export default router