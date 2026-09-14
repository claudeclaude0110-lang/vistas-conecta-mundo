import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Coins, Flame, Gift, MapPin, Share2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/ligo/Shell";
import { CoinSheet } from "@/components/ligo/CoinSheet";
import { GiftSheet } from "@/components/ligo/GiftSheet";
import { fotos } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil · Ligo" },
      {
        name: "description",
        content: "Tu perfil en Ligo: monedas, racha diaria, estadísticas, intereses y regalos.",
      },
      { property: "og:title", content: "Mi perfil · Ligo" },
      { property: "og:description", content: "Monedas, racha, matches y regalos en un solo lugar." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { usuario, monedas, matches, likes, regalosEnviados, racha } = useLigo();
  const [coins, setCoins] = useState(false);
  const [regalos, setRegalos] = useState(false);
  const [soloCuba, setSoloCuba] = useState(true);

  const u = usuario ?? {
    nombre: "Yoel",
    edad: 32,
    ciudad: "La Habana, Cuba",
    bio: "Cubano buscando algo real.",
    foto: fotos.p2,
    verificado: true,
    intereses: ["Café cubano ☕", "Salsa 💃", "Viaje ✈️", "Familia ❤️", "Exilio 🌍"],
  };

  return (
    <Shell>
      <div className="px-4 pt-5 text-center">
        <img
          src={u.foto}
          alt={u.nombre}
          width={768}
          height={1024}
          className="mx-auto h-28 w-28 rounded-full border-4 border-pink object-cover glow"
        />
        <h1 className="font-display mt-3 flex items-center justify-center gap-1.5 text-2xl font-extrabold">
          {u.nombre}, {u.edad}
          {u.verificado && <BadgeCheck className="h-5 w-5 text-pink" />}
        </h1>
        <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-pink" /> {u.ciudad}
        </p>
        <p className="mx-auto mt-2 max-w-xs text-sm text-secondary-foreground">{u.bio}</p>

        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">
          <Flame className="h-4 w-4" /> Racha diaria: {racha} días
        </span>

        <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
          <span className="text-sm text-muted-foreground">Modo Solo Cuba</span>
          <button
            onClick={() => {
              setSoloCuba((s) => !s);
              toast(soloCuba ? "Ahora ves el mundo entero 🌎" : "Modo Solo Cuba activado 🇨🇺");
            }}
            className={`h-6 w-11 rounded-full p-0.5 transition-colors ${soloCuba ? "brand-gradient" : "bg-navy"}`}
            aria-label="Modo Solo Cuba"
          >
            <span
              className={`block h-5 w-5 rounded-full bg-foreground transition-transform ${soloCuba ? "translate-x-5" : ""}`}
            />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            ["Likes", likes],
            ["Matches", matches.length],
            ["Regalos", regalosEnviados],
            ["Monedas", monedas],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl border border-border bg-card py-3">
              <p className="font-display text-lg font-bold">{v as number}</p>
              <p className="text-[11px] text-muted-foreground">{k as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 text-left">
          <p className="text-sm font-semibold text-muted-foreground">Intereses</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {u.intereses.map((i) => (
              <span key={i} className="rounded-full border border-border bg-navy px-3 py-1 text-sm">
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setCoins(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full brand-gradient py-4 font-display font-bold text-primary-foreground glow active:scale-95"
          >
            <Coins className="h-5 w-5" /> Comprar monedas
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRegalos(true)}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-semibold"
            >
              <Gift className="h-4 w-4 text-pink" /> Enviar regalo
            </button>
            <button
              onClick={async () => {
                const datos = {
                  title: "Ligo",
                  text: "Métete en Ligo, aquí el cubano conecta con el mundo entero 💘",
                  url: typeof window !== "undefined" ? window.location.origin : "",
                };
                if (navigator.share) {
                  try {
                    await navigator.share(datos);
                  } catch {
                    /* cancelado */
                  }
                } else {
                  await navigator.clipboard?.writeText(datos.url);
                  toast.success("Enlace copiado, mándaselo a tu gente ✅");
                }
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-semibold"
            >
              <Share2 className="h-4 w-4 text-pink" /> Compartir
            </button>
          </div>
          <button
            onClick={() => toast.success("¡Invita a tu amigo y gana 50 monedas! 🪙")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-pink/40 bg-pink/10 py-3.5 text-sm font-semibold text-pink"
          >
            <UserPlus className="h-4 w-4" /> Recomienda a tu amigo
          </button>
          <Link
            to="/bodas"
            className="block w-full rounded-full border border-border bg-card py-3.5 text-sm font-semibold"
          >
            Ver parejas que se casaron con Ligo 💍
          </Link>
        </div>
      </div>

      <CoinSheet open={coins} onClose={() => setCoins(false)} />
      <GiftSheet open={regalos} onClose={() => setRegalos(false)} />
    </Shell>
  );
}
