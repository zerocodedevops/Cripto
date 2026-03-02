const steps = [
    {
        number: "01",
        title: "Visita Técnica",
        description: "Analizamos tu vivienda, escuchamos tus necesidades y tomamos medidas precisas sin compromiso.",
    },
    {
        number: "02",
        title: "Presupuesto Cerrado",
        description: "Recibes un presupuesto detallado y transparente. Lo que firmas es lo que pagas. Sin sobrecostes.",
    },
    {
        number: "03",
        title: "Planificación",
        description: "Asignamos jefe de obra, cerramos fechas y gestionamos todos los permisos municipales.",
    },
    {
        number: "04",
        title: "Ejecución Controlada",
        description: "Realizamos la obra bajo estándares estrictos de limpieza y calidad. Reportes semanales de avance.",
    },
    {
        number: "05",
        title: "Entrega e Inspección",
        description: "Revisamos cada detalle contigo hasta que el resultado sea perfecto. Comienza tu garantía.",
    },
];

export const ProcessSteps = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative">
            {/* Connector line for desktop */}
            <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 -z-10" />

            {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[#D4A853] text-[#1C1C1E] font-bold text-xl flex items-center justify-center mb-6 group-hover:bg-[#D4A853] group-hover:text-white transition-all duration-300">
                        {step.number}
                    </div>
                    <h4 className="text-lg font-bold text-[#1C1C1E] mb-3 uppercase tracking-tight">
                        {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    );
};
