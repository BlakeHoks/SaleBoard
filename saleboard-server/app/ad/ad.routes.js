import express from 'express'
import {
    getAdById,
    getAds,
    createAd,
    updateAd,
    deleteAd,
    updateAdStatus,
    getAdByAuthorId,
    getAdByCategory
} from './ad.controller.js'


const router = express.Router()

router.route('/').post(createAd).get(getAds)
router.route('/:id').get(getAdById).put(updateAd).patch(updateAdStatus).delete(deleteAd)
router.route('/user/:id').get(getAdByAuthorId)
router.route('/category/:category_name').get(getAdByCategory)
export default router