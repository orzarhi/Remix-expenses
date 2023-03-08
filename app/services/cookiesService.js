import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === "production",
		secrets: [SESSION_SECRET],
		sameSite: "lax",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: true,
	},
});

export const createUserSession = async (userId, redirectPath) => {
	const session = await sessionStorage.getSession();
	session.set("userId", userId);

	return redirect(redirectPath, {
		headers: {
			"Set-Cookie": await sessionStorage.commitSession(session),
		},
	});
};

export const getUserFromSession = async (request) => {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);

	const userId = session.get("userId");

	if (!userId) return null;

	return userId;
};

export const destroyUserSession = async (request) => {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);

	return redirect("/", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
};
