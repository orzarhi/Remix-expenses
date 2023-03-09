import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/services/cookiesService";

export const loader = async ({ request }) => {
	const userId = await requireUserSession(request);

	return await getExpenses(userId);
};
