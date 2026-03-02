import type { MetaFunction } from "react-router";
import { BarrioTemplate } from "../../src/templates/BarrioTemplate";
import { barrios } from "../../src/clients/madrid-zerochaos/barrios";
import { config } from "../../src/clients/madrid-zerochaos/config";

export function loader({ params }: { params: { barrio: string } }) {
    const barrio = barrios.find((b) => b.slug === params.barrio);
    if (!barrio) throw new Response("Not Found", { status: 404 });
    return { barrio };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) return [{ title: `Reformas Integrales Madrid | ${config.name}` }];
    const { barrio } = data;
    return [
        { title: `Reformas Integrales en ${barrio.name} | ${config.name}` },
        { name: "description", content: `${barrio.description} L├¡deres en reformas en ${barrio.name} con presupuesto sin sorpresas y plazos garantizados.` },
    ];
};

export default function Barrio({ loaderData }: { loaderData: { barrio: any } }) {
    return <BarrioTemplate barrio={loaderData.barrio} />;
}
