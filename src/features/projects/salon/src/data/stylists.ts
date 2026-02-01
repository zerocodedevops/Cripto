export type Stylist = {
    id: string;
    name: string;
    role: string;
    available?: boolean;
    image?: string; // Optional URL for avatar
};

export const STYLISTS: Stylist[] = [
    { id: 'anna', name: 'Anna Garcia', role: 'Master Stylist', available: true },
    { id: 'david', name: 'David Torres', role: 'Color Expert', available: true },
    { id: 'elena', name: 'Elena Ruiz', role: 'Senior Stylist', available: true },
    { id: 'marc', name: 'Marc Soler', role: 'Barber Specialist', available: true },
    { id: 'sofia', name: 'Sofia M.', role: 'Junior Stylist', available: true },
];
