const express = require('express')
const {
  createFav,
  getFavs,
  getFav,
  deleteFav
} = require('../controllers/favController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all poll routes
router.use(requireAuth)

// GET all favs
router.get('/all', getFavs)

//GET a single fav
router.get('/single', getFav)

// POST a new fav
router.post('/', createFav)

// DELETE a fav
router.delete('/:stock', deleteFav)



module.exports = router