import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { BadgeCheck, Heart, MapPin, RotateCcw, Star, X } from "lucide-react";
import { toast } from "sonner";
import { Bots, Shell } from "@/components/ligo/Shell";
import { perfiles, type Perfil } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export const Route = createFileRoute("/descubre")({
  head: () => ({
    meta: [
      { title: "Vistas · Descubre cubanos en Ligo" },
      {
        name: "description",
        content:
          "Desliza perfiles verificados de cubanos en Cuba y en el exilio. Like, super like y match al instante.",
      },
      { property: "og:title", content: "Vistas · Descubre cubanos en Ligo" },
      {
        property: "og:description",
        content: "Modo Solo Cuba o Relaciones a distancia: elige y desliza.",
      },
    ],
  }),
  component: Descubre,
});

function Descubre() {
  const [modo, setModo] = useState<"cuba" | "mundo">("cuba");
  const lista = useMemo(() => perfiles.filter((p) => p.modo === modo), [modo]);
  const [i, setI] = useState(0);
  const [match, setMatch] = useState<Perfil | null>(null);
  const { agregarMatch, sumarLike } = useLigo();
  const navigate = useNavigate();

  const actual = lista[i % lista.length]!;
  const siguiente = lista[(i + 1) % lista.length]!;

  function decidir(dir: "no" | "like" | "super") {
    if (dir !== "no") {
      sumarLike();
      const suerte = dir === "super" || Math.random() > 0.35;
      if (suerte) {
        agregarMatch(actual.id);
        setMatch(actual);
      } else {
        toast(`Like enviado a ${actual.nombre} 💗`);
      }
    }
    setI((n) => n + 1);
  }

  return (
    <Shell>
      <div className="relative px-4 pt-4">
        <Bots />
        <div className="relative mx-auto flex w-full rounded-full border border-border bg-navy p-1">
          {(
            [
              ["cuba", "📍 Solo Cuba"],
              ["mundo", "🌎 Relaciones a distancia"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => {
                setModo(k);
                setI(0);
              }}
              className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-all ${
                modo === k ? "brand-gradient text-primary-foreground glow" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-4 h-[62dvh] min-h-[420px]">
          <Card perfil={siguiente} atras />
          <Card key={actual.id + i} perfil={actual} onDecidir={decidir} />
        </div>

        <div className="relative mt-5 flex items-center justify-center gap-5">
          <Boton onClick={() => decidir("no")} label="No">
            <X className="h-6 w-6" />
          </Boton>
          <Boton
            onClick={() => {
              setI((n) => Math.max(0, n - 1));
              toast("Volviste atrás ↩️");
            }}
            label="Atrás"
            chico
          >
            <RotateCcw className="h-5 w-5 text-gold" />
          </Boton>
          <Boton onClick={() => decidir("super")} label="Super like" chico>
            <Star className="h-5 w-5 fill-gold text-gold" />
          </Boton>
          <Boton onClick={() => decidir("like")} label="Like" rosa>
            <Heart className="h-7 w-7 fill-current" />
          </Boton>
        </div>
      </div>

      {match && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/95 px-6">
          <Confeti />
          <div className="animate-pop relative text-center">
            <p className="font-display text-4xl font-extrabold text-pink">¡Es match!</p>
            <p className="mt-2 text-secondary-foreground">
              A {match.nombre} también le gustaste 💘
            </p>
            <img
              src={match.foto}
              alt={match.nombre}
              className="mx-auto mt-6 h-40 w-40 rounded-full border-4 border-pink object-cover glow"
            />
            <button
              onClick={() => {
                setMatch(null);
                navigate({ to: "/chats/$id", params: { id: match.id } });
              }}
              className="mt-8 w-full rounded-full brand-gradient py-4 font-display font-bold text-primary-foreground glow"
            >
              Escríbele ahora
            </button>
            <button
              onClick={() => setMatch(null)}
              className="mt-3 w-full py-2 text-sm text-muted-foreground"
            >
              Seguir deslizando
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}

function Boton({
  children,
  onClick,
  label,
  rosa,
  chico,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  rosa?: boolean;
  chico?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`grid place-items-center rounded-full border border-border transition-transform active:scale-90 ${
        chico ? "h-12 w-12" : "h-16 w-16"
      } ${rosa ? "brand-gradient text-primary-foreground glow border-0" : "bg-card"}`}
    >
      {children}
    </button>
  );
}

function Card({
  perfil,
  onDecidir,
  atras,
}: {
  perfil: Perfil;
  onDecidir?: (d: "no" | "like" | "super") => void;
  atras?: boolean;
}) {
  const [drag, setDrag] = useState(0);
  const [saliendo, setSaliendo] = useState<"no" | "like" | null>(null);
  const inicio = useRef<number | null>(null);

  const rot = drag / 18;
  const style = saliendo
    ? {
        transform: `translateX(${saliendo === "like" ? 600 : -600}px) rotate(${saliendo === "like" ? 30 : -30}deg)`,
        opacity: 0,
        transition: "transform .35s ease-out, opacity .35s ease-out",
      }
    : {
        transform: `translateX(${drag}px) rotate(${rot}deg) scale(${atras ? 0.94 : 1})`,
        transition: inicio.current === null ? "transform .25s ease-out" : "none",
      };

  function soltar() {
    if (Math.abs(drag) > 110 && onDecidir) {
      const dir = drag > 0 ? "like" : "no";
      setSaliendo(dir);
      setTimeout(() => onDecidir(dir), 220);
    }
    inicio.current = null;
    setDrag(0);
  }

  return (
    <article
      style={style}
      onPointerDown={(e) => {
        if (!onDecidir) return;
        inicio.current = e.clientX;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (inicio.current === null) return;
        setDrag(e.clientX - inicio.current);
      }}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      className={`absolute inset-0 touch-none select-none overflow-hidden rounded-3xl border border-border card-shadow ${
        atras ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <img
        src={perfil.foto}
        alt={perfil.nombre}
        width={768}
        height={1024}
        className="h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

      {!atras && drag > 40 && (
        <span className="absolute left-5 top-5 rotate-[-12deg] rounded-xl border-4 border-pink px-3 py-1 font-display text-2xl font-extrabold text-pink">
          ME GUSTA
        </span>
      )}
      {!atras && drag < -40 && (
        <span className="absolute right-5 top-5 rotate-12 rounded-xl border-4 border-destructive px-3 py-1 font-display text-2xl font-extrabold text-destructive">
          NO
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-3xl font-extrabold">
            {perfil.nombre}, {perfil.edad}
          </h2>
          {perfil.verificado && (
            <span className="flex items-center gap-1 rounded-full bg-pink/20 px-2 py-0.5 text-xs font-semibold text-pink">
              <BadgeCheck className="h-3.5 w-3.5" /> Verificado
            </span>
          )}
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-secondary-foreground">
          <MapPin className="h-4 w-4 text-pink" /> {perfil.ciudad} {perfil.bandera}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{perfil.bio}</p>
      </div>
    </article>
  );
}

function Confeti() {
  const piezas = Array.from({ length: 40 });
  const colores = ["#ff3e8a", "#ff7fb2", "#ffc861", "#0d2b4e", "#ffffff"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {piezas.map((_, n) => (
        <span
          key={n}
          className="animate-confetti absolute top-0 h-3 w-2 rounded-sm"
          style={{
            left: `${(n * 37) % 100}%`,
            background: colores[n % colores.length],
            animationDelay: `${(n % 10) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
