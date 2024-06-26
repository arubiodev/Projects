
const Fav = require('../models/favModel')
const mongoose = require('mongoose')

// get all favs
const getFavs = async (req, res) => {
  const user_id = req.user._id

  const favs = await Fav.find({ user_id }).sort({ createdAt: -1 })



  res.status(200).json(favs)
}

// get a single fav
const getFav = async (req, res) => {
  const { stock } = req.body

  const user_id = req.user._id

  const fav = await Fav.find({ user_id, stock }).sort({ createdAt: -1 })



  res.status(200).json(fav)
}


// create new fav
const createFav = async (req, res) => {
  const {stock} = req.body



  // add doc to db
  try {
    const user_id = req.user._id
    const fav = await Fav.create({stock, user_id})
    res.status(200).json(fav)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a fav
const deleteFav = async (req, res) => {
  const { stock } = req.params

  const user_id = req.user._id


  const fav = await Fav.findOneAndDelete({stock,user_id})



  res.status(200).json(fav)
}


module.exports = {
  getFavs,
  getFav,
  createFav,
  deleteFav,
}