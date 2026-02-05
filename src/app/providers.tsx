import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { CurrencyProvider } from "../features/projects/crypto/context/CurrencyContext";
import { PortfolioProvider } from "../features/projects/crypto/context/PortfolioContext";
import { WatchlistProvider } from "../features/projects/crypto/context/WatchlistContext";

const queryClient = new QueryClient();

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
	return (
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<CurrencyProvider>
					<WatchlistProvider>
						<PortfolioProvider>
							<Suspense
								fallback={
									<div className="flex items-center justify-center min-h-screen">
										Loading...
									</div>
								}
							>
								{children}
							</Suspense>
						</PortfolioProvider>
					</WatchlistProvider>
				</CurrencyProvider>
			</HelmetProvider>
		</QueryClientProvider>
	);
}
