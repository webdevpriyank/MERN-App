const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protected } = require('../middleware/authMiddleware')

router.route('/').get(protected, getGoals).post(protected, setGoal)
router.route('/:id').put(protected, updateGoal).delete(protected, deleteGoal)

// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router