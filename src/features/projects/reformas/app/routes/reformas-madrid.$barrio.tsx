import { useParams } from "react-router-dom";
import { BarrioTemplate } from "../../src/templates/BarrioTemplate";
import { barrios } from "../../src/clients/madrid-zerochaos/barrios";

export default function Barrio() {
    const { barrio: slug } = useParams();
    const barrio = barrios.find((b) => b.slug === slug);

    if (!barrio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-[#1C1C1E] mb-4 uppercase tracking-tighter">Barrio no encontrado</h1>
                    <p className="text-gray-500">Lo sentimos, no hemos podido encontrar el barrio solicitado.</p>
                </div>
            </div>
        );
    }

    return <BarrioTemplate barrio={barrio} />;
}
