import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
	return <AuthForm />;
}

export const action = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get("mode") || "login";

	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);

	try {
		validateCredentials(credentials);
	} catch (error) {
		return error;
	}

	try {
		if (authMode === "login") {
			return await login(credentials);
		} else {
			return await signup(credentials);
		}
	} catch (error) {
		if (error.status === 422 || error.status === 401) {
			return { credentials: error.message };
		}
		return { credentials: error.message };
	}
};

export const links = () => {
	return [{ rel: "stylesheet", href: authStyles }];
};
