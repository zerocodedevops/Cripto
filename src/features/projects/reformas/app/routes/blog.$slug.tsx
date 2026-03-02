import { useParams } from "react-router-dom";
import { BlogPostTemplate } from "../../src/templates/BlogPostTemplate";
import { blogPosts } from "../../src/clients/madrid-zerochaos/blog";

export default function BlogPost() {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-[#1C1C1E] mb-4 uppercase tracking-tighter">Artículo no encontrado</h1>
                    <p className="text-gray-500">Lo sentimos, no hemos podido encontrar el artículo solicitado.</p>
                </div>
            </div>
        );
    }

    return <BlogPostTemplate post={post} />;
}
