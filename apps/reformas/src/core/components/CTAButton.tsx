interface CTAButtonProps {
    text: string;
    href?: string;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
}

export const CTAButton = ({
    text,
    href,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
}: CTAButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 rounded-sm uppercase tracking-wider";

    const variants = {
        primary: "bg-[#D4A853] text-white hover:bg-[#B88E3E] shadow-lg hover:shadow-xl",
        secondary: "bg-[#1C1C1E] text-white hover:bg-black",
        outline: "border-2 border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-white",
    };

    const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={finalClassName} onClick={onClick}>
                {text}
            </a>
        );
    }

    return (
        <button type={type} className={finalClassName} onClick={onClick}>
            {text}
        </button>
    );
};
