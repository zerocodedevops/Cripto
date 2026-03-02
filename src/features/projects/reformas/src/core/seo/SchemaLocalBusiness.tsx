interface SchemaLocalBusinessProps {
    name: string;
    description: string;
    url: string;
    phone: string;
    address: string;
    image: string;
    email: string;
    logo: string;
    city: string;
}

export const SchemaLocalBusiness = ({
    name,
    description,
    url,
    phone,
    address,
    image,
    email,
    logo,
    city,
}: SchemaLocalBusinessProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        description,
        url,
        telephone: phone,
        email,
        logo,
        address: {
            "@type": "PostalAddress",
            streetAddress: address,
            addressLocality: city,
            addressRegion: "Madrid",
            addressCountry: "ES",
        },
        image,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
