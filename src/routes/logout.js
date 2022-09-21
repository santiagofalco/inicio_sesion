import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    let sessUser = req.session;
    let user = req.session.user
    sessUser.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.render('logout.pug', {
            message: `Hasta luego ${user.name}`
        })
    });

});
export default router
