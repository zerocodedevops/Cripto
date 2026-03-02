import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "@/components/ui/PageLoader";
import "./app/app.css";

// Lazy load templates/pages from the feature directory
const Home = lazy(() => import("./app/routes/_index"));
const Integrales = lazy(() => import("./app/routes/reformas-integrales-madrid"));
const Cocinas = lazy(() => import("./app/routes/reformas-cocinas-madrid"));
const Banos = lazy(() => import("./app/routes/reformas-banos-madrid"));
const Barrio = lazy(() => import("./app/routes/reformas-madrid.$barrio"));
const Proyectos = lazy(() => import("./app/routes/proyectos"));
const Contacto = lazy(() => import("./app/routes/contacto"));
const SobreNosotros = lazy(() => import("./app/routes/sobre-nosotros"));
const Blog = lazy(() => import("./app/routes/blog._index"));
const BlogPost = lazy(() => import("./app/routes/blog.$slug"));

export default function ReformsRoutes() {
    return (
        <Suspense fallback={<PageLoader text="Cargando Zero Chaos..." />}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="reformas-integrales-madrid" element={<Integrales />} />
                <Route path="reformas-cocinas-madrid" element={<Cocinas />} />
                <Route path="reformas-banos-madrid" element={<Banos />} />
                <Route path="reformas-madrid/:barrio" element={<Barrio />} />
                <Route path="proyectos" element={<Proyectos />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="sobre-nosotros" element={<SobreNosotros />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Suspense>
    );
}
