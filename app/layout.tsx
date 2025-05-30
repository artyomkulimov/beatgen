import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BeatGen - AI-Powered Music Recommendations",
	description:
		"Discover your next favorite tracks with AI-powered music recommendations based on your Spotify preferences.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
