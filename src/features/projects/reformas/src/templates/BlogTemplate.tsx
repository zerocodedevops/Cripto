import { RootLayout } from "../core/layout/RootLayout";
import { blogPosts } from "../clients/madrid-zerochaos/blog";
import { Link } from "react-router-dom";

export const BlogTemplate = () => {
    return (
        <RootLayout>
            <section className="pt-40 pb-20 bg-[#1C1C1E]">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        Blog de <span className="text-[#D4A853]">Reformas</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Consejos expertos, tendencias de diseño y todo lo que necesitas saber antes de empezar tu obra en Madrid.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-[#F5F5F0]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/proyectos/reformas/blog/${post.slug}`}
                                className="group bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#1C1C1E] opacity-0 group-hover:opacity-20 transition-opacity" />
                                    {/* Placeholder for images */}
                                    <div className="flex items-center justify-center h-full text-gray-400 font-bold uppercase tracking-widest text-xs">
                                        Zero Chaos • {post.category}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <span className="text-xs font-bold text-[#D4A853] uppercase tracking-widest mb-3 block">
                                        {post.date} • {post.category}
                                    </span>
                                    <h2 className="text-2xl font-black text-[#1C1C1E] uppercase leading-tight mb-4 group-hover:text-[#D4A853] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-sm font-bold text-[#1C1C1E] uppercase border-b-2 border-[#D4A853] pb-1">
                                        Leer más
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};
