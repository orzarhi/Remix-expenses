import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css"

export default function AuthPage() {
    return (
        <AuthForm />
    );
}

export const links = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}