import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";
import { Hero, About } from "@/components/sections";
import { lazy, Suspense } from "react";

// Lazy load below-the-fold sections for faster initial page load
const Skills = lazy(() =>
	import("@/components/sections/Skills").then((m) => ({
		default: m.Skills,
	})),
);
const FeaturedProject = lazy(() =>
	import("@/components/sections/FeaturedProject").then((m) => ({
		default: m.FeaturedProject,
	})),
);
const Projects = lazy(() =>
	import("@/components/sections/Projects").then((m) => ({
		default: m.Projects,
	})),
);
const Blog = lazy(() =>
	import("@/components/sections/Blog").then((m) => ({
		default: m.Blog,
	})),
);
const Contact = lazy(() =>
	import("@/components/sections/Contact").then((m) => ({
		default: m.Contact,
	})),
);

export default function Home() {
	return (
		<Layout>
			<Seo
				title="Diseño Web Madrid | Desarrollo para Pymes y Autónomos"
				description="Creamos páginas web profesionales para pymes y autónomos en Madrid con diseño responsive, SEO local y enfoque en ventas."
				keywords="diseño web pymes madrid, paginas web autonomos madrid, programador web freelance madrid, desarrollo web madrid, diseño web negocios"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					"name": "ZeroCode",
					"image": "https://zerocode-devops.web.app/og-image.png",
					"@id": "https://zerocode-devops.web.app/#localbusiness",
					"url": "https://zerocode-devops.web.app",
					"telephone": "+34 912 622 712",
					"address": {
						"@type": "PostalAddress",
						"streetAddress": "Madrid, Spain",
						"addressLocality": "Madrid",
						"postalCode": "28001",
						"addressCountry": "ES"
					},
					"geo": {
						"@type": "GeoCoordinates",
						"latitude": 40.416775,
						"longitude": -3.703790
					},
					"openingHoursSpecification": {
						"@type": "OpeningHoursSpecification",
						"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
						"opens": "09:00",
						"closes": "20:00"
					}
				}}
			/>
			<div id="main-content">
				{/* Above the fold — load immediately */}
				<Hero />
				<About />

				{/* Below the fold — lazy loaded on demand */}
				<Suspense fallback={null}>
					<Skills />
					<FeaturedProject />
					<Projects />
					<Blog />
					<Contact />
				</Suspense>
			</div>
		</Layout>
	);
}
