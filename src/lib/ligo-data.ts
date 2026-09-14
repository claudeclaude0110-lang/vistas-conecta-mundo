import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import b1 from "@/assets/b1.jpg";
import b2 from "@/assets/b2.jpg";
import b3 from "@/assets/b3.jpg";
import b4 from "@/assets/b4.jpg";

export const fotos = { p1, p2, p3, p4 };

export type Perfil = {
  id: string;
  nombre: string;
  edad: number;
  ciudad: string;
  bandera: string;
  bio: string;
  foto: string;
  verificado: boolean;
  modo: "cuba" | "mundo";
  intereses: string[];
};

export const perfiles: Perfil[] = [
  {
    id: "dayana",
    nombre: "Dayana",
    edad: 24,
    ciudad: "La Habana, Cuba",
    bandera: "🇨🇺",
    bio: "Bailo casino desde los 6. Si me invitas a un café en Obispo, ya ganaste.",
    foto: p1,
    verificado: true,
    modo: "cuba",
    intereses: ["Salsa 💃", "Café cubano ☕", "Playa 🏖️"],
  },
  {
    id: "yosvany",
    nombre: "Yosvany",
    edad: 26,
    ciudad: "Matanzas, Cuba",
    bandera: "🇨🇺",
    bio: "Pescador de fin de semana y cocinero de arroz congrí nivel abuela.",
    foto: p2,
    verificado: true,
    modo: "cuba",
    intereses: ["Pesca 🎣", "Cocina 🍚", "Reguetón 🔊"],
  },
  {
    id: "isabel",
    nombre: "Isabel",
    edad: 23,
    ciudad: "Miami, USA",
    bandera: "🇺🇸",
    bio: "Cubana de Hialeah. Extraño el malecón pero aquí hay croquetas decentes.",
    foto: p3,
    verificado: true,
    modo: "mundo",
    intereses: ["Viajes ✈️", "Familia ❤️", "Gym 🏋️"],
  },
  {
    id: "alejandro",
    nombre: "Alejandro",
    edad: 28,
    ciudad: "Madrid, España",
    bandera: "🇪🇸",
    bio: "Me fui hace 5 años, pero el acento no se va. Busco algo serio, sin bobería.",
    foto: p4,
    verificado: true,
    modo: "mundo",
    intereses: ["Fútbol ⚽", "Cine 🎬", "Exilio 🌍"],
  },
  {
    id: "sofia",
    nombre: "Sofía",
    edad: 25,
    ciudad: "Ciudad de México",
    bandera: "🇲🇽",
    bio: "Cubana en CDMX. Te hago reír en el primer mensaje o te devuelvo las monedas.",
    foto: p1,
    verificado: false,
    modo: "mundo",
    intereses: ["Tacos 🌮", "Arte 🎨", "Salsa 💃"],
  },
  {
    id: "camila",
    nombre: "Camila",
    edad: 22,
    ciudad: "Santiago de Cuba",
    bandera: "🇨🇺",
    bio: "Santiaguera, carnaval en la sangre. No me escribas 'hola' y ya.",
    foto: p3,
    verificado: true,
    modo: "cuba",
    intereses: ["Carnaval 🎉", "Música 🎶", "Playa 🏖️"],
  },
];

export const ciudades = [
  "La Habana, Cuba",
  "Santiago de Cuba",
  "Matanzas, Cuba",
  "Camagüey, Cuba",
  "Holguín, Cuba",
  "Villa Clara, Cuba",
  "Pinar del Río, Cuba",
  "Miami, USA",
  "Madrid, España",
  "Barcelona, España",
  "Ciudad de México",
  "Bogotá, Colombia",
  "Montevideo, Uruguay",
  "Moscú, Rusia",
];

export type Reel = {
  id: string;
  nombre: string;
  ciudad: string;
  caption: string;
  foto: string;
  likes: string;
  comentarios: number;
};

export const reels: Reel[] = [
  {
    id: "r1",
    nombre: "Alejandro, 28",
    ciudad: "Madrid 🇪🇸",
    caption: "¡Hola! Extrañando el café cubano de mi abuela. ¿Tú de dónde estás? 🇨🇺",
    foto: p4,
    likes: "2.1k",
    comentarios: 180,
  },
  {
    id: "r2",
    nombre: "Dayana, 24",
    ciudad: "La Habana 🇨🇺",
    caption: "Atardecer en el malecón, como siempre. Aquí se vive rico 🌅",
    foto: p1,
    likes: "4.8k",
    comentarios: 320,
  },
  {
    id: "r3",
    nombre: "Isabel, 23",
    ciudad: "Miami 🇺🇸",
    caption: "Croqueta preparada + colada = domingo perfecto en la Calle Ocho ☕",
    foto: p3,
    likes: "3.3k",
    comentarios: 214,
  },
  {
    id: "r4",
    nombre: "Yosvany, 26",
    ciudad: "Matanzas 🇨🇺",
    caption: "Pesca del día. Hoy come toda la cuadra 🐟",
    foto: p2,
    likes: "1.2k",
    comentarios: 96,
  },
];

export const bodas = [
  { id: 1, foto: b1, pareja: "Yanet & Raúl", ruta: "La Habana ↔ La Habana", km: "0 km", año: 2024 },
  { id: 2, foto: b2, pareja: "Lisandra & Marco", ruta: "Cienfuegos ↔ Miami", km: "587 km", año: 2025 },
  { id: 3, foto: b3, pareja: "Dairon & Pablo", ruta: "Holguín ↔ Madrid", km: "7.320 km", año: 2025 },
  { id: 4, foto: b4, pareja: "Claudia & Ernesto", ruta: "Santiago ↔ CDMX", km: "2.140 km", año: 2026 },
];

export const paquetes = [
  { monedas: 50, precio: "$1.99", extra: "" },
  { monedas: 150, precio: "$4.99", extra: "+15 gratis" },
  { monedas: 400, precio: "$9.99", extra: "Más popular 🔥" },
  { monedas: 1000, precio: "$19.99", extra: "+250 gratis" },
];

export const regalos = [
  { emoji: "🌹", nombre: "Rosa", costo: 10 },
  { emoji: "💐", nombre: "Ramo", costo: 25 },
  { emoji: "🌺", nombre: "Mariposa", costo: 40 },
  { emoji: "🍫", nombre: "Chocolate", costo: 60 },
  { emoji: "💍", nombre: "Anillo", costo: 150 },
  { emoji: "✈️", nombre: "Pasaje", costo: 500 },
];

export const respuestasAuto = [
  "¡Oye qué bueno que escribiste! 😍",
  "Jajaja tú sí estás tremendo/a 😂",
  "¿Y tú de qué parte eres exactamente?",
  "Me encantó tu reel, de verdad 🔥",
  "¿Nos llamamos ahorita por video?",
  "Asere, eso que dijiste me llegó 💕",
];
