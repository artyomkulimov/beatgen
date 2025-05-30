import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { SelectPageClient } from "./select-page-client";

export default function SelectPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 p-0 flex flex-col">
			<Header />
			<div className="flex-1 p-4">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<Logo />
						</div>
						<p className="text-gray-300">
							Choose up to 5 artists or songs to generate your
							personalized beats
						</p>
					</div>

					<SelectPageClient />
				</div>
			</div>
			<Footer />
		</div>
	);
}
