import { Button } from "@salon/components/ui/button";
import { SERVICE_CATALOG } from "@salon/data/services";
import { supabase } from "@/lib/supabase";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SyncPricesButton({
    onSyncComplete,
}: { onSyncComplete: () => void }) {
    const [loading, setLoading] = useState(false);

    const handleSync = async () => {
        if (
            !confirm(
                "¿Estás seguro? Esto sobrescribirá los precios de la base de datos con los valores por defecto del catálogo y añadirá servicios que falten.",
            )
        ) {
            return;
        }

        setLoading(true);
        try {
            // First, fetch all services from DB to compare
            const { data: dbServices } = await supabase
                .from("services")
                .select("id, title, price, category");

            console.log("🗄️ Database has", dbServices?.length, "services");

            // Flatten the catalog
            const allServices = SERVICE_CATALOG.flatMap((cat) => cat.services);
            console.log("📦 Catalog has", allServices.length, "services");

            let updatedCount = 0;
            let insertedCount = 0;
            const inserted: string[] = [];

            for (const service of allServices) {
                if (!service.price) continue;

                // Find matching service in DB by title
                const dbMatch = dbServices?.find(db => db.title === service.title);

                if (dbMatch) {
                    // UPDATE existing service
                    const { error } = await supabase
                        .from("services")
                        .update({ price: service.price })
                        .eq("id", dbMatch.id);

                    if (!error) {
                        console.log(`✅ Updated ${service.title}: ${service.price}€`);
                        updatedCount++;
                    } else {
                        console.error(`❌ Error updating ${service.title}:`, error);
                    }
                } else {
                    // INSERT new service
                    const { error } = await supabase
                        .from("services")
                        .insert([{
                            title: service.title,
                            description: service.description || "",
                            duration: service.duration,
                            price: service.price,
                            category: SERVICE_CATALOG.find(c => c.services.includes(service))?.id || "other"
                        }]);

                    if (!error) {
                        console.log(`➕ Inserted ${service.title}: ${service.price}€`);
                        inserted.push(service.title);
                        insertedCount++;
                    } else {
                        console.error(`❌ Error inserting ${service.title}:`, error);
                    }
                }
            }

            console.log(`📊 Summary: ${updatedCount} updated, ${insertedCount} inserted`);
            if (inserted.length > 0) {
                console.log("New services:", inserted);
            }

            alert(`✅ ${updatedCount} actualizados\n➕ ${insertedCount} nuevos insertados`);
            onSyncComplete();
        } catch (error) {
            console.error("Error syncing prices:", error);
            alert("Hubo un error sincronizando los precios.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleSync}
            disabled={loading}
            variant="outline"
            className="gap-2 border-amber-500/50 text-amber-500 hover:bg-amber-950/30"
        >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Sincronizando..." : "Restaurar Precios Catálogo"}
        </Button>
    );
}
