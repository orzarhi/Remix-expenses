import { getExpenses } from "~/data/expenses.server";

export const loader = async () => {
	return await getExpenses();
};
