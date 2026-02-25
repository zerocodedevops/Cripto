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
				description="Diseño web profesional para pymes y autónomos en Madrid. Especialista en crear páginas web rápidas, optimizadas para SEO y con automatización IA para captar más clientes."
				keywords="diseño web pymes, paginas web autonomos madrid, programador web freelance, desarrollo web rivas vaciamadrid, diseño web negocios"
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
