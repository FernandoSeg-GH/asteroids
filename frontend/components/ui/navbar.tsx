"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-3 fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between">

                <Link href="/" className="text-xl font-bold text-gray-900 tracking-wide hove:underline cursor-pointer">
                    Asteroids
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {session && (
                        <Link
                            href="/favorites"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all"
                        >
                            <Heart className="h-5 w-5 text-red-500" />
                            <span>Favorites</span>
                        </Link>
                    )}

                    {isLoading ? (
                        <span className="text-gray-500">Loading...</span>
                    ) : session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <User className="h-6 w-6 text-gray-700" />
                                    <span className="text-gray-700">{session.user?.email}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md border">
                                <DropdownMenuItem onClick={() => signOut()} className="text-red-500 hover:bg-gray-100">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/auth/login">
                                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost">
                                {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800" id="menu-title">
                                    Menu
                                </h2>
                                <div className="flex flex-col gap-4 mt-2">
                                    <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Heart className="h-5 w-5 text-red-500" />
                                        <span>Favorites</span>
                                    </Link>

                                    {session ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                                <User className="h-6 w-6" />
                                                <span>{session.user?.email}</span>
                                            </div>
                                            <Button variant="outline" onClick={() => signOut()}>
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Link href="/auth/login">
                                                <Button variant="outline">Login</Button>
                                            </Link>
                                            <Link href="/auth/register">
                                                <Button>Register</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
