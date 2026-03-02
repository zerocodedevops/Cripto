import { useTracking } from "../../hooks/useTracking";
import { config } from "../../clients/madrid-zerochaos/config";

export const WhatsAppFloat = () => {
    const { trackWhatsAppClick } = useTracking();
    const waNumber = config.contact.whatsapp.replaceAll(/\s+/g, '').replaceAll('+', '');
    const message = encodeURIComponent("Hola! Me gustaría pedir un presupuesto para una reforma.");

    return (
        <a
            href={`https://wa.me/${waNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Contactar por WhatsApp"
        >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.611-.918-2.206-.242-.588-.487-.51-.67-.51-.174 0-.373-.012-.572-.012-.2 0-.528.075-.803.375-.276.3-.1.1.1.1c-1.052 1.054-1.644 2.493-1.644 4.053 0 1.559.592 2.999 1.644 4.053l.001.001c.219.223.468.423.743.593l-.001-.001c.367.227.75.452 1.15.65.65.31 1.35.48 2.05.52.25.01.5.02.75.02 1.1 0 2.15-.3 3.08-.88l.001-.001c.273-.166.529-.36.764-.58l.001-.001c1.052-1.054 1.644-2.493 1.644-4.053 0-.15-.01-.3-.03-.45zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
        </a>
    );
};
