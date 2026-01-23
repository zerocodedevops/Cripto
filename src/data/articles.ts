/* eslint-disable @typescript-eslint/no-deprecated */
import { Brain, Cpu, Code2 } from 'lucide-react';
import blogAiFirst from '@/assets/blog/blog-ai-first.jpg';
import blogAgents from '@/assets/blog/blog-agents.jpg';
import blogFrontend from '@/assets/blog/blog-frontend.jpg';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  icon: React.ElementType;
  content: string; // HTML content
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Por qué "AI-First" no es solo un Buzzword',
    excerpt: 'Cómo la inteligencia artificial está redefiniendo la arquitectura de software, desde el diseño hasta el despliegue.',
    date: 'Ene 2026',
    readTime: '5 min',
    category: 'Filosofía',
    image: blogAiFirst,
    icon: Brain,
    content: `
      <p class="lead text-xl text-dark-200 mb-8">Vivimos en un <strong>punto de inflexión histórico</strong>. La programación tradicional, centrada obsesivamente en la sintaxis y la memorización de APIs, está dando paso a una nueva era inevitable: la <strong>Ingeniería AI-First</strong>.</p>

      <h2>El cambio de paradigma</h2>
      <p>Hasta hace poco, el valor de un desarrollador se medía casi exclusivamente por su capacidad para escribir código eficiente y sin errores de sintaxis en tiempo real. Hoy, con LLMs capaces de generar funciones complejas en milisegundos, el valor se desplaza radicalmente hacia la <strong>intención</strong>, la <strong>arquitectura de sistemas</strong> y la <strong>verificación rigurosa</strong>.</p>
    `
  },
  {
    id: 2,
    title: 'Más allá de Copilot: Agentes Autónomos',
    excerpt: 'La evolución de los asistentes de código hacia compañeros proactivos capaces de entender el contexto completo.',
    date: 'Dic 2025',
    readTime: '7 min',
    category: 'Tecnología',
    image: blogAgents,
    icon: Cpu,
    content: `
      <p class="lead text-xl text-dark-200 mb-8">Github Copilot fue solo el comienzo, la punta del iceberg. El autocompletado inteligente es útil, sí, pero los <strong>Agentes Autónomos</strong> son la verdadera revolución que está por llegar a nuestros IDEs.</p>

      <h2>¿Qué es un Agente Autónomo en Desarrollo?</h2>
      <p>A diferencia de un sistema de autocompletado pasivo que espera a que escribas para sugerir la siguiente línea, un agente autónomo tiene características que lo hacen casi humano.</p>
    `
  },
  {
    id: 3,
    title: 'El fin del "Boilerplate" en Frontend',
    excerpt: 'Analizando cómo las nuevas herramientas de generación de UI están eliminando el trabajo repetitivo.',
    date: 'Nov 2025',
    readTime: '4 min',
    category: 'Desarrollo',
    image: blogFrontend,
    icon: Code2,
    content: `
      <p class="lead text-xl text-dark-200 mb-8">¿Cuántas veces has escrito el mismo componente de botón? ¿O la misma configuración de rutas en React Router? ¿O el mismo formulario de login? El <strong>"Boilerplate"</strong> (código repetitivo) ha sido la plaga que ha drenado la energía del desarrollo frontend durante años.</p>

      <h2>La era de la Generación Generativa de UI</h2>
      <p>Herramientas emergentes como <strong>v0.dev</strong> o <strong>Bolt.new</strong> nos permiten describir una interfaz en lenguaje natural y obtener el código React/Tailwind listo para producción en segundos.</p>
    `
  }
];
