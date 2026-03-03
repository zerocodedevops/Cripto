import { useParams, Navigate } from "react-router-dom";
import { BarrioTemplate } from "../../src/templates/BarrioTemplate";
import { barrios } from "../../src/clients/madrid-zerochaos/barrios";

export default function Barrio() {
    const { barrio: barrioSlug } = useParams<{ barrio: string }>();
    const barrio = barrios.find((b) => b.slug === barrioSlug);

    if (!barrio) {
        return <Navigate to="/proyectos/reformas" replace />;
    }

    return <BarrioTemplate barrio={barrio} />;
}
