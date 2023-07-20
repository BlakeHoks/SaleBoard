import express from 'express'
import {getUserProfile} from './user.controller.js'
import {authCheck} from "../middleware/auth.middleware.js";


const router = express.Router()

router.route('/profile').get(authCheck, getUserProfile)

export default router