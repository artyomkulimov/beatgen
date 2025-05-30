"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authenticateWithSpotify, isAuthenticated } from "@/lib/spotify";
import { HeroSection } from "@/components/hero-section";

interface Artist {
	id: string;
	name: string;
	image: string;
}

interface Song {
	id: string;
	name: string;
	artist: string;
	image: string;
}

interface Recommendation {
	id: string;
	name: string;
	artist: string;
	album: string;
	image: string;
	preview_url?: string;
}

export default function HomePage() {
	const router = useRouter();
	const [isAuthenticatedState, setIsAuthenticatedState] = useState<
		boolean | null
	>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Check authentication status on mount
		const checkAuth = async () => {
			try {
				const authenticated = await isAuthenticated();
				setIsAuthenticatedState(authenticated);
				if (authenticated) {
					router.push("/select");
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsAuthenticatedState(false);
			}
		};

		checkAuth();
	}, [router]);

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			authenticateWithSpotify();
		} catch (error) {
			console.error("Authentication error:", error);
			setIsLoading(false);
		}
	};

	// Show loading state while checking authentication
	if (isAuthenticatedState === null) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	// Show hero section if not authenticated
	if (!isAuthenticatedState) {
		return <HeroSection onSignIn={handleSignIn} isLoading={isLoading} />;
	}

	// This shouldn't be reached due to the redirect in useEffect, but just in case
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center">
			<div className="text-white text-xl">Redirecting...</div>
		</div>
	);
}
