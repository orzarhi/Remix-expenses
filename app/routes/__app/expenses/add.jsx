import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { requireUserSession } from "~/services/cookiesService";

export default function AddExpensesPage() {
	const navigate = useNavigate();
	const closeHandler = () => {
		navigate("..");
	};

	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
}

export const action = async ({ request }) => {
	const userId = await requireUserSession(request);

	const formData = await request.formData();
	const expenseData = Object.fromEntries(formData);

	try {
		validateExpenseInput(expenseData);
	} catch (error) {
		return error;
	}

	await addExpense(expenseData, userId);
	return redirect("/expenses");
};
