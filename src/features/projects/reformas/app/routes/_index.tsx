import type { MetaFunction } from "react-router-dom";
import { HomeTemplate } from "../../src/templates/HomeTemplate";
import { config } from "../../src/clients/madrid-zerochaos/config";

export const meta: MetaFunction = () => {
    return [
        { title: `Reformas Integrales en Madrid | Cero Caos, Presupuesto Cerrado | ${config.name}` },
        { name: "description", content: "Empresa de reformas en Madrid especialista en proyectos integrales, cocinas y ba├▒os. Sin sobrecostes, plazos garantizados y m├íxima calidad. ┬íPide tu presupuesto!" },
        { property: "og:title", content: `Reformas Integrales en Madrid | ${config.name}` },
        { property: "og:description", content: "Reformas de alta calidad con presupuesto cerrado en Madrid." },
        { name: "theme-color", content: "#1C1C1E" },
    ];
};

export default function Home() {
    return <HomeTemplate />;
}
