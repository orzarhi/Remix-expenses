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
		throw new Error("Faild to add expense.");
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
		throw new Error("Faild to get expenses.");
	}
};

export const getExpense = async (id) => {
	try {
		const expense = await prisma.expense.findFirst({ where: { id } });
		return expense;
	} catch (error) {
		throw new Error("Faild to get expense.");
	}
};

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
		throw new Error("Faild to update expense.");
	}
};

export const deleteExpense = async (id) => {
	try {
		await prisma.expense.delete({ where: { id } });
	} catch (error) {
		throw new Error("Faild to delete expense.");
	}
};
