import { prisma } from "./database.server"

export const addExpense = async (expenseData) => {
    try {
        return await prisma.expense.create({
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getExpense = async () => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: {
                date: 'desc'
            }
        })
        return expenses;

    } catch (error) {
        throw error;
    }

}

