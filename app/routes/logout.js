import { json } from "@remix-run/node";
import { destroyUserSession } from "../services/cookiesService";

export const action = ({ request }) => {
	if (request.method !== "POST") {
		throw json({ message: "Invalid request method" }, { status: 400 });
	}

	return destroyUserSession(request);
};
