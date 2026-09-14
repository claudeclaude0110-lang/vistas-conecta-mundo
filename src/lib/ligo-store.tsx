import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { perfiles, type Perfil } from "./ligo-data";

export type Mensaje = {
  id: string;
  de: "yo" | "el";
  texto: string;
  hora: string;
  regalo?: string;
};

export type Usuario = {
  nombre: string;
  edad: number;
  ciudad: string;
  bio: string;
  foto: string;
  verificado: boolean;
  intereses: string[];
};

type Estado = {
  usuario: Usuario | null;
  monedas: number;
  matches: string[];
  likes: number;
  regalosEnviados: number;
  racha: number;
  notificaciones: number;
  chats: Record<string, Mensaje[]>;
};

const inicial: Estado = {
  usuario: null,
  monedas: 120,
  matches: ["dayana", "alejandro"],
  likes: 48,
  regalosEnviados: 3,
  racha: 15,
  notificaciones: 2,
  chats: {
    dayana: [
      { id: "m1", de: "el", texto: "¡Hola! Me encantó tu reel sobre el café ☕", hora: "10:45" },
      { id: "m2", de: "yo", texto: "Jajaja gracias, ese café es sagrado 😄", hora: "10:47" },
    ],
    alejandro: [
      { id: "m3", de: "el", texto: "¿Ya probaste el café en la Calle Ocho? Tienes que ir", hora: "9:15" },
    ],
  },
};

const KEY = "ligo-estado-v1";

type Ctx = Estado & {
  guardarUsuario: (u: Usuario) => void;
  comprarMonedas: (n: number) => void;
  gastarMonedas: (n: number) => boolean;
  agregarMatch: (id: string) => void;
  sumarLike: () => void;
  enviarMensaje: (chatId: string, m: Omit<Mensaje, "id" | "hora">) => void;
  sumarRegalo: () => void;
  limpiarNotificaciones: () => void;
  perfilPorId: (id: string) => Perfil | undefined;
};

const LigoContext = createContext<Ctx | null>(null);

export function LigoProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(inicial);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEstado({ ...inicial, ...JSON.parse(raw) });
    } catch {
      /* ignorar */
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(estado));
    } catch {
      /* ignorar */
    }
  }, [estado, listo]);

  const hora = () =>
    new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });

  const guardarUsuario = useCallback((u: Usuario) => {
    setEstado((e) => ({ ...e, usuario: u }));
  }, []);

  const comprarMonedas = useCallback((n: number) => {
    setEstado((e) => ({ ...e, monedas: e.monedas + n }));
  }, []);

  const gastarMonedas = useCallback(
    (n: number) => {
      if (estado.monedas < n) return false;
      setEstado((e) => ({ ...e, monedas: Math.max(0, e.monedas - n) }));
      return true;
    },
    [estado.monedas],
  );

  const agregarMatch = useCallback((id: string) => {
    setEstado((e) =>
      e.matches.includes(id)
        ? e
        : { ...e, matches: [id, ...e.matches], notificaciones: e.notificaciones + 1 },
    );
  }, []);

  const sumarLike = useCallback(() => setEstado((e) => ({ ...e, likes: e.likes + 1 })), []);
  const sumarRegalo = useCallback(
    () => setEstado((e) => ({ ...e, regalosEnviados: e.regalosEnviados + 1 })),
    [],
  );
  const limpiarNotificaciones = useCallback(
    () => setEstado((e) => ({ ...e, notificaciones: 0 })),
    [],
  );

  const enviarMensaje = useCallback((chatId: string, m: Omit<Mensaje, "id" | "hora">) => {
    setEstado((e) => ({
      ...e,
      chats: {
        ...e.chats,
        [chatId]: [
          ...(e.chats[chatId] ?? []),
          { ...m, id: Math.random().toString(36).slice(2), hora: hora() },
        ],
      },
    }));
  }, []);

  const perfilPorId = useCallback((id: string) => perfiles.find((p) => p.id === id), []);

  const value = useMemo<Ctx>(
    () => ({
      ...estado,
      guardarUsuario,
      comprarMonedas,
      gastarMonedas,
      agregarMatch,
      sumarLike,
      enviarMensaje,
      sumarRegalo,
      limpiarNotificaciones,
      perfilPorId,
    }),
    [
      estado,
      guardarUsuario,
      comprarMonedas,
      gastarMonedas,
      agregarMatch,
      sumarLike,
      enviarMensaje,
      sumarRegalo,
      limpiarNotificaciones,
      perfilPorId,
    ],
  );

  return <LigoContext.Provider value={value}>{children}</LigoContext.Provider>;
}

export function useLigo() {
  const ctx = useContext(LigoContext);
  if (!ctx) throw new Error("useLigo debe usarse dentro de LigoProvider");
  return ctx;
}
