const UserModel = require("../Models/User");

const addExpenses = async (req,res) => {
    const body = req.body;
    const {_id} = req.user;
    try{
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            {
                $push: {
                    expenses: body
                }
            },
            {new: true}
        );

        const transactionType = body.type === 'income' ? 'Income' : 'Expense';

        return res.status(200).json({
            message: `${transactionType} added successfully`,
            success: true,
            data: userData?.expenses
        });
    }catch(err){
        return res.status(500)
        .json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const fetchExpenses = async (req,res) => {
    const {_id} = req.user;
    try{
        const userData = await UserModel.findById(_id).select('expenses');
        return res.status(200).json({
            message: "Fetched Expenses Successfully",
            success: true,
            data: userData?.expenses
        })
    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteExpenses = async (req,res) => {
    const {_id} = req.user;
    const { expenseId } = req.params;
    try{
        const userDataBefore = await UserModel.findById(_id).select('expenses');
        const expenseToDelete = userDataBefore.expenses.find(exp => exp._id.toString() === expenseId);
        const transactionType = expenseToDelete.type === 'income' ? 'Income' : 'Expense';
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            {
                $pull: {
                    expenses: {_id: expenseId}
                }
            },
            {new: true}
        );

        
        return res.status(200)
        .json({
            message: `${transactionType} Deleted Successfully`,
            success: true,
            data: userData?.expenses
        })
    }catch(err){
        return res.status(500)
        .json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
}