import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CTAButton } from "./CTAButton";

const contactSchema = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio"),
    telefono: z.string().min(9, "El teléfono no es válido"),
    tipoReforma: z.enum(["integral", "cocina", "baño", "otros"]),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log("Form data:", data);
        // Here we would implement the logic to send to email or CRM
        alert("¡Mensaje enviado! Nos pondremos en contacto contigo en menos de 24h.");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 shadow-2xl border border-gray-100 max-w-lg w-full"
        >
            <h3 className="text-2xl font-bold text-[#1C1C1E] mb-6 uppercase tracking-tight">
                Solicita presupuesto <span className="text-[#D4A853]">en 24h</span>
            </h3>

            <div className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                    </label>
                    <input
                        {...register("nombre")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] outline-none transition-all"
                        placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                </div>

                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono de contacto
                    </label>
                    <input
                        {...register("telefono")}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] outline-none transition-all"
                        placeholder="600 000 000"
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label htmlFor="tipoReforma" className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de reforma
                    </label>
                    <select
                        {...register("tipoReforma")}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] outline-none transition-all bg-white"
                    >
                        <option value="integral">Reforma Integral</option>
                        <option value="cocina">Reforma de Cocina</option>
                        <option value="baño">Reforma de Baño</option>
                        <option value="otros">Otros proyectos</option>
                    </select>
                </div>

                <CTAButton
                    text={isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
                    type="submit"
                    className="w-full mt-4"
                />

                <p className="text-[10px] text-gray-400 text-center mt-4">
                    Al enviar aceptas nuestra política de privacidad. Te llamaremos para una visita técnica gratuita.
                </p>
            </div>
        </form>
    );
};
