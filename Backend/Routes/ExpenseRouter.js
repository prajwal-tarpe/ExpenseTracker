const  { fetchExpenses,addExpenses,deleteExpenses} = require('../Controllers/ExpenseController');

const router = require('express').Router();

router.post('/',addExpenses);
router.get('/',fetchExpenses);
router.delete('/:expenseId',deleteExpenses);

module.exports = router;