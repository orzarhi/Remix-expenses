import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from 'react-icons/fa'
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpense } from "~/data/expenses.server";

export default function ExpensesLayout() {
    const expenses = useLoaderData();

    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to='add'>
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>

    );
}

export const loader = () => {
    return getExpense();
}
