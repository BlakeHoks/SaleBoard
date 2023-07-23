import express from 'express'
import {createComment, getCommentsByUser, getCommentsByAuthor} from './comment.controller.js'


const router = express.Router()

router.route('/').post(createComment)
router.route('/user').get(getCommentsByUser)
router.route('/author').get(getCommentsByAuthor)

export default router