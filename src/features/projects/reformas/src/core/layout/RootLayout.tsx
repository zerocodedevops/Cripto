import { config } from "../../clients/madrid-zerochaos/config";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F5F5F0]">
            <Header clientName={config.name} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer
                clientName={config.name}
                phone={config.contact.phone}
                email={config.contact.email}
                address={config.contact.address}
            />
            <WhatsAppFloat />
        </div>
    );
};
