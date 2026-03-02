import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

export const FAQSection = ({ items }: FAQSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {items.map((item, idx) => (
                <div key={item.question} className="border border-gray-200 rounded-sm">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-[#1C1C1E] pr-6">{item.question}</span>
                        <span className={`text-[#D4A853] transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
