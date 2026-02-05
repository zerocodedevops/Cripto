import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";
import {
	About,
	Blog,
	Contact,
	FeaturedProject,
	Hero,
	Projects,
	Skills,
} from "@/components/sections";

export default function Home() {
	return (
		<Layout>
			<Seo
				title="Home"
				description="Portfolio de David G., desarrollador Fullstack AI-First. Combino código tradicional con Inteligencia Artificial para crear soluciones modernas."
				keywords="fullstack, ai developer, react, typescript, portfolio, david g"
			/>
			<div id="main-content">
				<Hero />
				<About />
				<Skills />
				<FeaturedProject />
				<Projects />
				<Blog />
				<Contact />
			</div>
		</Layout>
	);
}
