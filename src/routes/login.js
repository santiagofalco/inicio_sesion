import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/', async (req, res) => {
    res.render('login.pug', {
        message: 'Login de Usuario'
    })
})

router.post('/', passport.authenticate('login', {
    failureRedirect: '/loginfail/error'
}), async (req, res) => {
    try {
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        }
        console.log('name', req.session.user.name)
        res.send({ status: 'success', payload: req.session.user })
    } catch (error) {
        console.log(error)
    }
})
export default router
