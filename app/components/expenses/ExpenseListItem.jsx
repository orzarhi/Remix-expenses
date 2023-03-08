import { Link, useFetcher } from "@remix-run/react";

const ExpenseListItem = ({ id, title, amount, date }) => {
	const fetcher = useFetcher();

	const deleteExpenseItemHandler = () => {
		const proceed = confirm("Are you sure you want to delete?");

		if (!proceed) return;

		fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
	};

	if (fetcher.state !== "idle") {
		return (
			<article className="expense-item locked">
				<p>Deleting...</p>
			</article>
		);
	}
	return (
		<article className="expense-item">
			<div className="expense-info">
				<span className="expense-title">{title}</span>
				<span className="expense-amount">₪{amount.toFixed(2)}</span>
				<span className="expense-date">
					{new Date(date).toLocaleDateString()}
				</span>
			</div>
			<menu className="expense-actions">
				<button onClick={deleteExpenseItemHandler}>Delete</button>
				<Link to={id}>Edit</Link>
			</menu>
		</article>
	);
};

export default ExpenseListItem;
