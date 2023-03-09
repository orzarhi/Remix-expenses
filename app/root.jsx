import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useMatches,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css";
import Error from "./components/util/Error";

export const meta = () => ({
	charset: "utf-8",
	title: "Remix Expenses",
	viewport: "width=device-width,initial-scale=1",
});

const Document = ({ title, children }) => {
	const matches = useMatches();

	const disableJs = matches.some((match) => match.handle?.disableJs);
	return (
		<html lang="en">
			<head>
				{title && <title>{title}</title>}
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				{!disableJs && <Scripts />}
				<LiveReload />
			</body>
		</html>
	);
};

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export const CatchBoundary = () => {
	const caughtResponse = useCatch();

	return (
		<Document title={caughtResponse.statusText}>
			<main>
				<Error title={caughtResponse.statusText}>
					<p>
						{caughtResponse.data?.message ||
							"Something went wrong. Please try again later."}
					</p>
					<p>
						Back to <Link to="/">safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	);
};

export const ErrorBoundary = ({ error }) => {
	return (
		<Document title="An error occurred">
			<main>
				<Error title="An error occurred">
					<p>
						{error.message ||
							"Something went wrong. Please try again later."}
					</p>
					<p>
						Back to <Link to="/">safety</Link>.
					</p>
				</Error>
			</main>
		</Document>
	);
};

export const links = () => {
	return [{ rel: "stylesheet", href: sharedStyles }];
};
