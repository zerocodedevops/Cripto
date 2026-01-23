import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
}

export function SEOHead({
    title,
    description,
    image = '/og-image.jpg',
    type = 'website'
}: Readonly<SEOHeadProps>) {
    const siteTitle = 'ZeroCode Portfolio';
    const fullTitle = `${title} | ${siteTitle}`;
    const url = globalThis.location?.href || '';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
