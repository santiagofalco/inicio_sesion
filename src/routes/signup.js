import { Router } from 'express'
import passport from 'passport'


const router = Router()

router.get('/', async (req, res) => {
    res.render('signup.pug', {
        message: 'Registro de Usuario'
    })
})

router.post('/', passport.authenticate('register', {
    failureRedirect: '/registerfail/error'
}), async (req, res) => {
    try {
        console.log(req.user)
        res.send({ status: 'success', payload: req.user._id })
    } catch (error) {
        console.log(error)
    }
})

export default router