import type { MetaFunction } from "react-router-dom";
import { ProjectsTemplate } from "../../src/templates/ProjectsTemplate";

export const meta: MetaFunction = () => {
    return [
        { title: "Proyectos de Reforma en Madrid | Antes y Despu├®s | Zero Chaos" },
        { name: "description", content: "Explora nuestra galer├¡a de proyectos reales. Reformas integrales, cocinas y ba├▒os con acabados de alta calidad. Resultados visibles, clientes satisfechos." },
    ];
};

export default function Proyectos() {
    return <ProjectsTemplate />;
}
