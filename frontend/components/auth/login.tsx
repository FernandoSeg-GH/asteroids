"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.ok) {
                router.push("/");
            } else {
                console.error("Login failed:", result);
                setError("Invalid email or password.");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg border border-gray-200">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-center">Login</h2>
                </CardHeader>

                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" /> Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <a href="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
