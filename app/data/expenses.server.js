import { prisma } from "./database.server";

export const addExpense = async (expenseData) => {
	try {
		return await prisma.expense.create({
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getExpenses = async () => {
	try {
		const expenses = await prisma.expense.findMany({
			orderBy: {
				date: "desc",
			},
		});
		return expenses;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// export const getExpense = async (id) => {
// 	try {
// 		const expense = await prisma.expense.findFirst({ where: { id } });
// 		return expense;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// };

export const updateExpense = async (id, expenseData) => {
	try {
		await prisma.expense.update({
			where: { id },
			data: {
				title: expenseData.title,
				amount: +expenseData.amount,
				date: new Date(expenseData.date),
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteExpense = async (id) => {
	try {
		await prisma.expense.delete({ where: { id } });
	} catch (error) {
		console.log(error);
		throw error;
	}
};
