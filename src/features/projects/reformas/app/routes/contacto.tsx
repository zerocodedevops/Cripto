import type { MetaFunction } from "react-router-dom";
import { ContactTemplate } from "../../src/templates/ContactTemplate";
import { config } from "../../src/clients/madrid-zerochaos/config";

export const meta: MetaFunction = () => {
    return [
        { title: `Pide Presupuesto de Reforma | Contacto | ${config.name}` },
        { name: "description", content: `Solicita tu presupuesto de reforma integral, cocina o ba├▒o en Madrid. Respondemos en menos de 24h. Visita t├®cnica gratuita y presupuesto cerrado.` },
    ];
};

export default function Contacto() {
    return <ContactTemplate />;
}
