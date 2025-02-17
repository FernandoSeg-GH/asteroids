import LoginForm from "@/components/auth/login";

export default function AuthPage() {
    return (
        <div className="max-w-md mx-auto mt-20   bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 sr-only">Login</h1>
            <LoginForm />
        </div>
    );
}
