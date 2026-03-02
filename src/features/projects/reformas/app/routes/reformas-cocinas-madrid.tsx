import type { MetaFunction } from "react-router";
import { ServiceTemplate } from "../../src/templates/ServiceTemplate";
import { servicios } from "../../src/clients/madrid-zerochaos/servicios";
import { config } from "../../src/clients/madrid-zerochaos/config";

const service = servicios.find(s => s.id === "cocinas")!;

export const meta: MetaFunction = () => {
    return [
        { title: `${service.name} en Madrid | Cero Sobrecostes | ${config.name}` },
        { name: "description", content: `${service.shortDescription} Especialistas en ${service.name} en la Comunidad de Madrid. Presupuesto cerrado y garant├¡a por escrito.` },
    ];
};

export default function Cocinas() {
    return <ServiceTemplate service={service} />;
}
