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
				title="Home"
				description="Diseño web profesional para pymes y autónomos en Madrid. Especialista en crear páginas web rápidas, optimizadas para SEO y con automatización IA para captar más clientes."
				keywords="diseño web pymes, paginas web autonomos madrid, programador web freelance, desarrollo web rivas vaciamadrid, diseño web negocios"
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
