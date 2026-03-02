interface PricingTableProps {
    prices: {
        title: string;
        items: { label: string; price: string; description?: string }[];
    }[];
}

export const PricingTable = ({ prices }: PricingTableProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prices.map((section) => (
                <div key={section.title} className="bg-white border-t-4 border-[#D4A853] p-8 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-bold text-[#1C1C1E] mb-6 uppercase tracking-wider">
                        {section.title}
                    </h4>
                    <ul className="space-y-4">
                        {section.items.map((item) => (
                            <li key={item.label} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div>
                                    <span className="font-semibold text-gray-800 block">{item.label}</span>
                                    {item.description && <span className="text-xs text-gray-500">{item.description}</span>}
                                </div>
                                <span className="text-[#D4A853] font-bold whitespace-nowrap">{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
