"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/search-input";
import { ArtistCard } from "@/components/artist-card";
import { SongCard } from "@/components/song-card";
import { SelectedArtists, SelectedSongs } from "@/components/selected-items";
import type { Artist, Song } from "@/types";
import {
	getRecommendations,
	searchSpotify,
	isAuthenticated,
} from "@/lib/spotify";

export function SelectPageClient() {
	const router = useRouter();
	const [selectedMode, setSelectedMode] = useState<"artists" | "songs">(
		"artists"
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
	const [searchResults, setSearchResults] = useState<{
		artists?: Artist[];
		songs?: Song[];
	}>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	// Check authentication on mount
	useEffect(() => {
		const checkAuth = async () => {
			const authenticated = await isAuthenticated();
			if (!authenticated) {
				router.push("/");
			}
		};
		checkAuth();
	}, [router]);

	// Search Spotify when query changes
	useEffect(() => {
		const searchTimeout = setTimeout(async () => {
			if (searchQuery.trim()) {
				setIsSearching(true);
				try {
					const results = await searchSpotify(searchQuery, "both");
					setSearchResults(results);
				} catch (error) {
					console.error("Search error:", error);
					setSearchResults({});
				} finally {
					setIsSearching(false);
				}
			} else {
				setSearchResults({});
			}
		}, 300); 

		return () => clearTimeout(searchTimeout);
	}, [searchQuery]);

	const handleAddArtist = (artist: Artist) => {
		if (
			selectedArtists.length < 5 &&
			!selectedArtists.find((a) => a.id === artist.id)
		) {
			setSelectedArtists([...selectedArtists, artist]);
		}
	};

	const handleAddSong = (song: Song) => {
		if (
			selectedSongs.length < 5 &&
			!selectedSongs.find((s) => s.id === song.id)
		) {
			setSelectedSongs([...selectedSongs, song]);
		}
	};

	const handleRemoveArtist = (artistId: string) => {
		setSelectedArtists(selectedArtists.filter((a) => a.id !== artistId));
	};

	const handleRemoveSong = (songId: string) => {
		setSelectedSongs(selectedSongs.filter((s) => s.id !== songId));
	};

	const handleGetRecommendations = async () => {
		setIsLoading(true);

		try {
			// In a real app, we'd pass these to the API
			await getRecommendations(
				selectedMode === "artists" ? selectedArtists : [],
				selectedMode === "songs" ? selectedSongs : []
			);

			// Store selections in localStorage or state management
			if (selectedMode === "artists") {
				localStorage.setItem(
					"selectedArtists",
					JSON.stringify(selectedArtists)
				);
			} else {
				localStorage.setItem(
					"selectedSongs",
					JSON.stringify(selectedSongs)
				);
			}
			localStorage.setItem("selectedMode", selectedMode);

			router.push("/recommendations");
		} catch (error) {
			console.error("Error getting recommendations:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const displayArtists = searchResults.artists || [];
	const displaySongs = searchResults.songs || [];

	return (
		<>
			<Tabs
				value={selectedMode}
				onValueChange={(value) =>
					setSelectedMode(value as "artists" | "songs")
				}
				className="mb-8"
			>
				<TabsList className="grid w-full grid-cols-2 bg-black/60 border border-green-500/20">
					<TabsTrigger
						value="artists"
						className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
					>
						<Users className="w-4 h-4 mr-2" />
						Artists
					</TabsTrigger>
					<TabsTrigger
						value="songs"
						className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
					>
						<Music className="w-4 h-4 mr-2" />
						Songs
					</TabsTrigger>
				</TabsList>

				<TabsContent value="artists" className="space-y-6">
					<SearchInput
						placeholder="Search for artists..."
						value={searchQuery}
						onChange={setSearchQuery}
					/>

					<SelectedArtists
						artists={selectedArtists}
						onRemove={handleRemoveArtist}
					/>

					<div className="grid gap-3">
						{isSearching ? (
							<div className="text-center text-gray-400 py-8">
								Searching...
							</div>
						) : displayArtists.length > 0 ? (
							displayArtists.map((artist) => (
								<ArtistCard
									key={artist.id}
									artist={artist}
									isSelected={
										!!selectedArtists.find(
											(a) => a.id === artist.id
										)
									}
									onSelect={handleAddArtist}
								/>
							))
						) : searchQuery ? (
							<div className="text-center text-gray-400 py-8">
								No artists found
							</div>
						) : (
							<div className="text-center text-gray-400 py-8">
								Search for artists to get started
							</div>
						)}
					</div>
				</TabsContent>

				<TabsContent value="songs" className="space-y-6">
					<SearchInput
						placeholder="Search for songs..."
						value={searchQuery}
						onChange={setSearchQuery}
					/>

					<SelectedSongs
						songs={selectedSongs}
						onRemove={handleRemoveSong}
					/>

					<div className="grid gap-3">
						{isSearching ? (
							<div className="text-center text-gray-400 py-8">
								Searching...
							</div>
						) : displaySongs.length > 0 ? (
							displaySongs.map((song) => (
								<SongCard
									key={song.id}
									song={song}
									isSelected={
										!!selectedSongs.find(
											(s) => s.id === song.id
										)
									}
									onSelect={handleAddSong}
								/>
							))
						) : searchQuery ? (
							<div className="text-center text-gray-400 py-8">
								No songs found
							</div>
						) : (
							<div className="text-center text-gray-400 py-8">
								Search for songs to get started
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>

			<div className="text-center">
				<Button
					onClick={handleGetRecommendations}
					disabled={
						isLoading ||
						(selectedMode === "artists" &&
							selectedArtists.length === 0) ||
						(selectedMode === "songs" && selectedSongs.length === 0)
					}
					className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 text-lg"
				>
					{isLoading
						? "Getting Recommendations..."
						: "Get Recommendations"}
				</Button>
			</div>
		</>
	);
}
