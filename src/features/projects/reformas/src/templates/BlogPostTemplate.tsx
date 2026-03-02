import { RootLayout } from "../core/layout/RootLayout";
import { BlogPost } from "../core/types";
import { Link } from "react-router-dom";

interface BlogPostTemplateProps {
    post: BlogPost;
}

export const BlogPostTemplate = ({ post }: BlogPostTemplateProps) => {
    return (
        <RootLayout>
            <article className="pt-40 pb-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12 text-center">
                        <Link
                            to="/proyectos/reformas/blog"
                            className="text-xs font-bold text-[#D4A853] uppercase tracking-widest mb-6 inline-block hover:underline"
                        >
                            ← Volver al Blog
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black text-[#1C1C1E] uppercase tracking-tight leading-none mb-8">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-400 font-medium">
                            <span className="bg-[#F5F5F0] px-3 py-1 text-[#1C1C1E] rounded-full">{post.category}</span>
                            <span>{post.date}</span>
                            <span>Por {post.author}</span>
                        </div>
                    </div>

                    <div className="prose prose-xl max-w-none prose-headings:text-[#1C1C1E] prose-headings:font-black prose-headings:uppercase prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#1C1C1E] prose-li:text-gray-600">
                        {/* Split content by newlines and render */}
                        {post.content.split('\n').map((line, i) => {
                            if (line.trim().startsWith('##')) {
                                return <h2 key={i} className="text-3xl font-black mt-16 mb-8 uppercase tracking-tight">{line.replace('##', '').trim()}</h2>;
                            }
                            if (line.trim().startsWith('###')) {
                                return <h3 key={i} className="text-2xl font-bold mt-12 mb-6 uppercase tracking-tight">{line.replace('###', '').trim()}</h3>;
                            }
                            if (line.trim()) {
                                return <p key={i} className="mb-6">{line.trim()}</p>;
                            }
                            return null;
                        })}
                    </div>

                    <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center text-center">
                        <h4 className="text-2xl font-black text-[#1C1C1E] uppercase mb-6">¿Quieres resultados similares?</h4>
                        <p className="text-gray-500 mb-10 max-w-lg">
                            Cada reforma es un mundo. Cuéntanos tu proyecto y te daremos un presupuesto cerrado sin compromiso.
                        </p>
                        <Link
                            to="/proyectos/reformas/contacto"
                            className="bg-[#1C1C1E] text-white px-10 py-5 font-black uppercase tracking-tighter hover:bg-[#D4A853] transition-colors"
                        >
                            Pide Presupuesto Gratis
                        </Link>
                    </div>
                </div>
            </article>
        </RootLayout>
    );
};
