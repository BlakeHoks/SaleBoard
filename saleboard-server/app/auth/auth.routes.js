import express from 'express'
import { authUser, confirmAuth, registerUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.route('/confirm').get(confirmAuth)
export default router
