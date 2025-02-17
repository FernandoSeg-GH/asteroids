import RegisterForm from "@/components/auth/register";

export default function AuthPage() {
    return (
        <div className="max-w-md mx-auto mt-20   bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 sr-only">Register</h1>
            <RegisterForm />
        </div>
    );
}
