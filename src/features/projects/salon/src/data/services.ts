export type ServiceItem = {
    id: string;
    title: string;
    description?: string;
    duration: string;
};

export type ServiceCategory = {
    id: string;
    title: string;
    services: ServiceItem[];
};

export const SERVICE_CATALOG: ServiceCategory[] = [
    {
        id: 'color',
        title: 'COLOR',
        services: [
            { id: 'henna', title: 'Henna', description: 'Henna raices', duration: '1h 10 min' },
            { id: 'tinte-raiz', title: 'Tinte Raiz', description: 'Retoque de raices', duration: '1h 15 min' },
            { id: 'mechas', title: 'Mechas', description: 'Nuestra famosa técnica Mix&Match, sutiles brillos que iluminan', duration: '1h 55 min' },
            { id: 'retoque-mechas', title: 'Retoque de mechas', description: 'Media cabeza de mechas. Zona superior y laterales', duration: '1h 40 min' },
            { id: 'medio-retoque-mechas', title: 'Medio retoque de mechas', description: 'Solo contorno y zona superior', duration: '1h 20 min' },
            { id: 'apano-mechas', title: 'Apaño mechas', description: 'Solo contorno y raya', duration: '1h 10 min' },
            { id: 'babylight', title: 'Babylight', description: 'Mechas extra finas por todo el cabello', duration: '1h 55 min' },
            { id: 'balayage', title: 'Balayage', description: 'Mechas a mano alzada degradadas y con falsa raíz', duration: '2h 5 min' },
            { id: 'puntos-luz', title: 'Puntos de luz PPC', description: 'Puntos de luz en toda la melena para dar un punto de color natural', duration: '1h 55 min' },
            { id: 'mechas-henna', title: 'Mechas y henna', description: 'Mechas en todo el cabello más nuestro barro/ henna para cubrir canas', duration: '2h 5 min' },
            { id: 'tinte-reflejos', title: 'Tinte y reflejos', description: 'Retoque de raíz más reflejos en todo el cabello', duration: '2h' },
            { id: 'retoque-henna', title: 'Retoque de Henna', description: 'Retoque de raíces en media cabeza, zona superior y laterales', duration: '1h 5 min' },
            { id: 'retoque-tinte', title: 'Retoque tinte', description: 'Raíces de media cabeza, zona superior y laterales', duration: '1h 5 min' },
            { id: 'mini-apano', title: 'Mini apaño', description: 'Retoque de contorno y raya.', duration: '1h 5 min' },
            { id: 'matiz', title: 'Matiz', description: 'Coloración suave para cambiar el tono de la melena y dar brillo', duration: '20 min' },
            { id: 'agua-clara', title: 'Agua clara', description: 'Clarificante para base natural que desea dar un toque más claro', duration: '55 min' },
            { id: 'decoloracion', title: 'Decoloración', description: 'Decoración de raíz para dejar el pelo rubio o eliminar un tinte', duration: '1h 20 min' },
            { id: 'mechas-manicura', title: 'Mechas y Manicura', description: 'Trabajo de mechas de cualquier tipo. Incluye manicura', duration: '1h 50 min' },
            { id: 'tinte-manicura', title: 'Tinte y Manicura', description: 'Aplicación tinte y en tiempo de exposición manicura completa', duration: '1h 20 min' }
        ]
    },
    {
        id: 'cortes',
        title: 'CORTES',
        services: [
            { id: 'lavar-corte', title: 'Lavar y corte', description: 'Solo Corte y lavar *NO INCLUYE PEINADO', duration: '40 min' },
            { id: 'corte-hombre', title: 'Corte hombre', description: 'CORTE CON ESTILO', duration: '35 min' },
            { id: 'corte-nino', title: 'Corte niño/A', description: 'Corte niñ@ hasta 8 años', duration: '20 min' },
            { id: 'corte-flequillo', title: 'Corte de flequillo', description: 'Retoque de flequillo', duration: '10 min' }
        ]
    },
    {
        id: 'peinar',
        title: 'PEINAR Y SECAR',
        services: [
            { id: 'peinar-servicio', title: 'Peinar', description: 'Servicio para añadir al corte o a servicio de color', duration: '25 min' },
            { id: 'peinar-tenacilla', title: 'Peinar tenacilla/plancha', description: 'TENACILLA/PLANCHA', duration: '45 min' },
            { id: 'lavar-peinar', title: 'Lavar+ Peinar', description: 'Solo para servicio único de peinado, incluye el lavado', duration: '40 min' },
            { id: 'secar-frontal', title: 'Secar frontal', description: 'Secado del cabello al aire con peinado en la zona del contorno', duration: '10 min' },
            { id: 'secar-difusor', title: 'Secar difusor', description: 'Secado del cabello con difusor', duration: '15 min' },
            { id: 'recogido', title: 'Recogido', description: 'Recogido, incluye lavado y peinado', duration: '1h 15 min' },
            { id: 'trenza-semi', title: 'Trenza o semirecogido', description: 'Peinado y trenza o semirecogido, incluye lavado', duration: '1h' }
        ]
    },
    {
        id: 'tratamientos',
        title: 'TRATAMIENTOS',
        services: [
            { id: 'shift-detox', title: 'Shift Detoxificante', description: 'TRATAMIENTO DETOXIFICANTE CAPILAR, PARA UN CUERO CABELLUDO GRASO O CON CASPA', duration: '35 min' },
            { id: 'olaplex', title: 'Olaplex Reestructuración', description: 'TRATAMIENTO RECONSTRUCTIVO Y FORTALECEDOR', duration: '1h 20 min' },
            { id: 'inner-hidratacion', title: 'Inner hidratación', description: 'TRATAMIENTO HIDRATANTE PARA RELLENAR EL PELO DE AGUA', duration: '50 min' },
            { id: 'nourishing', title: 'Nourising nutrición', description: 'TRATAMIENTO BIFÁSICO NUTRITIVO PARA ENGROSAR Y DAR BRILLO', duration: '1h 15 min' },
            { id: 'nourishing-inner', title: 'Nourising Inner', description: 'TRATAMIENTO BIFÁSICO, COMBINA LOS INGREDIENTES MAS HUMECTANTES', duration: '1h' },
            { id: 'repumpling', title: 'Repumpling Hidratación', description: 'TRATAMIENTO BIFÁSICO HIDRATANTE Y HUMECTANTE DE ÁCIDO HIALURÓNICO', duration: '45 min' },
            { id: 'proshield', title: 'Proshild Proteínas', description: 'Tratamiento antioxidante para engrosar, dar fuerza y aportar proteínas', duration: '1h' },
            { id: 'stain-glass', title: 'Stain Glass Baño Brillo', description: 'BAÑO DE BRILLO efecto espejo. Cuando la luz choque contra el cabello deslumbrará', duration: '1h' },
            { id: 'antifrizz', title: 'Antifrizz', description: 'TRATAMIENTO ANTIENCRESPAMIENTO', duration: '2h 40 min' },
            { id: 'alisado', title: 'Alisado', description: 'TRATAMIENTO TERMOACTIVO PARA ALISAR EL CABELLO', duration: '2h 30 min' },
            { id: 'inner-promo', title: 'Inner promo', duration: '40 min' },
            { id: 'arkitech', title: 'Arkitech', description: 'TRATAMIENTO DE REESTRUCTURACION , APORTA BRILLO Y FUERZA', duration: '35 min' },
            { id: 'no-breaker', title: 'NO BREAKER', duration: '45 min' },
            { id: 'colageno', title: 'Colágeno', description: 'Tratamiento de hidratación y fuerza, de un brillo espectacular', duration: '30 min' }
        ]
    },
    {
        id: 'nails',
        title: 'NAILS',
        services: [
            { id: 'manicura-expres', title: 'Manicura exprés', description: 'Limar, hidratación de cutículas y manos, esmaltado color.', duration: '20 min' },
            { id: 'esmaltar', title: 'Esmaltar uñas', description: 'Solo incluye esmaltado de uñas con OPI', duration: '10 min' },
            { id: 'manicura', title: 'Manicura', description: 'Manicura completa by OPI. Limar, exfoliante de cutícula, retirar pieles', duration: '30 min' },
            { id: 'manicura-hombre', title: 'Manicura hombre', duration: '25 min' },
            { id: 'gel-opi', title: 'Gel Opi', duration: '20 min' },
            { id: 'pedicura-opi', title: 'Pedicura by OPI', description: 'Pedicura completa, limado de planta con la fabulosa lima de OPI', duration: '1h' },
            { id: 'pedicura-express', title: 'Pedicura expréss', description: 'Limar,hidratacion de cutículas , masaje y esmaltado', duration: '30 min' }
        ]
    },
    {
        id: 'makeup-depil',
        title: 'MAQUILLAJE Y DEPILACIÓN',
        services: [
            { id: 'maquillaje', title: 'Maquillaje', description: 'MAKE UP DE LO MÁS NATURAL Y FAVORECEDOR', duration: '55 min' },
            { id: 'limpieza-cejas', title: 'Limpieza cejas', duration: '10 min' },
            { id: 'labio', title: 'Labio', duration: '10 min' }
        ]
    },
    {
        id: 'extensiones',
        title: 'EXTENSIONES',
        services: [
            { id: 'poner-extensiones', title: 'Poner extensiones', description: 'Poner extensiónes. Contactar con el salón, es un servicio complejo', duration: '25 min' },
            { id: 'quitar-extensiones', title: 'Quitar extensiones', description: 'Quitar extensiones adhesivas', duration: '40 min' }
        ]
    }
];
