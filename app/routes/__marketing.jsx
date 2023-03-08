import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/services/cookiesService";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
}

export const loader = ({ request }) => {
	return getUserFromSession(request);
};

export const links = () => {
	return [{ rel: "stylesheet", href: marketingStyles }];
};
