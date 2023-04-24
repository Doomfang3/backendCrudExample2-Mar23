const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipe.model')

// All routes in there starts with /recipes

/* GET all recipes */
router.get('/', async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find()
    console.log(allRecipes)
    res.render('recipes/all', { recipes: allRecipes })
  } catch (error) {
    console.log(error)
  }
})

/* router.get('/about', (req, res, next) => {
  res.send('About recipe page')
}) */

/* GET one new recipe (form) */
router.get('/new', (req, res) => {
  res.render('recipes/new', { isUpdating: false })
})
/* POST one new recipe */
router.post('/new', async (req, res) => {
  try {
    // We can get the req.body only on post request
    const newRecipe = await Recipe.create({
      ...req.body,
      ingredients: req.body.ingredients.split(' '),
    })
    console.log(newRecipe)
    res.redirect(`/recipes/${newRecipe._id}`)
  } catch (error) {
    console.log(error)
  }
})

/* GET one recipe */
router.get('/:recipeId', async (req, res) => {
  // const { recipeId } = req.params
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    console.log(recipe)
    if (!recipe) {
      res.redirect('/recipes')
    } else {
      res.render('recipes/one', recipe)
    }
  } catch (error) {
    console.log(error)
  }
})

/* GET one recipe to update (form) */
router.get('/:recipeId/update', async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/new', { recipe, isUpdating: true })
})

/* POST one recipe to update */
router.post('/:recipeId/update', async (req, res) => {
  try {
    // We can get the req.body only on post request
    await Recipe.findByIdAndUpdate(req.params.recipeId, {
      ...req.body,
      ingredients: req.body.ingredients.split(' '),
    })
    res.redirect(`/recipes/${req.params.recipeId}`)
  } catch (error) {
    console.log(error)
  }
})

/* POST one recipe to delete */
router.post('/:recipeId/delete', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect('/recipes')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
