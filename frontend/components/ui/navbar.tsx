"use client"
import Link from "next/link";
import { Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-teal-100 shadow px-6 py-4">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-lg font-bold">
                    Asteroids - Tech Challenge
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/favorites"
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                        <span>Favorites</span>
                        <Heart className="h-5 w-5" />
                    </Link>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Fernando Segre</span>
                        <User className="h-6 w-6" />
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="mt-4 flex flex-col gap-2 md:hidden">
                    <Link
                        href="/favorites"
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Heart className="h-5 w-5" />
                        <span>Favorites</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <User className="h-6 w-6" />
                        <span className="font-medium">Fernando Segre</span>
                    </div>
                </div>
            )}
        </nav>
    );
}
