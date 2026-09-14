import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, Gift, Mic, Send, Smile } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/ligo/Shell";
import { perfiles, respuestasAuto } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";
import { GiftSheet } from "@/components/ligo/GiftSheet";

export const Route = createFileRoute("/chats/$id")({
  head: () => ({
    meta: [
      { title: "Conversación · Ligo" },
      {
        name: "description",
        content: "Chatea con tu match: burbujas, stickers, notas de voz y regalos con flores.",
      },
      { property: "og:title", content: "Conversación · Ligo" },
      { property: "og:description", content: "Mensajes al instante con tu match cubano." },
    ],
  }),
  component: Chat,
});

const stickers = ["😍", "😂", "🔥", "💃", "🇨🇺", "💋", "🥺", "🌴"];

function Chat() {
  const { id } = useParams({ from: "/chats/$id" });
  const perfil = perfiles.find((p) => p.id === id) ?? perfiles[0]!;
  const { chats, enviarMensaje } = useLigo();
  const mensajes = chats[perfil.id] ?? [];
  const [texto, setTexto] = useState("");
  const [verStickers, setVerStickers] = useState(false);
  const [regalos, setRegalos] = useState(false);
  const [volando, setVolando] = useState<string | null>(null);
  const fin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes.length]);

  function mandar(t: string, regalo?: string) {
    if (!t.trim() && !regalo) return;
    enviarMensaje(perfil.id, regalo ? { de: "yo", texto: t, regalo } : { de: "yo", texto: t });
    setTexto("");
    setTimeout(
      () =>
        enviarMensaje(perfil.id, {
          de: "el",
          texto: respuestasAuto[Math.floor(Math.random() * respuestasAuto.length)]!,
        }),
      1200,
    );
  }

  return (
    <Shell sinNav>
      <div className="flex h-[calc(100dvh-60px)] flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Link to="/chats" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <img
            src={perfil.foto}
            alt={perfil.nombre}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">
              {perfil.nombre}, {perfil.edad}
            </p>
            <p className="text-xs text-pink">● en línea</p>
          </div>
          <button
            onClick={() => setRegalos(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full brand-gradient text-primary-foreground"
            aria-label="Enviar regalo"
          >
            <Gift className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {mensajes.map((m) => (
            <div key={m.id} className={`flex ${m.de === "yo" ? "justify-end" : "justify-start"}`}>
              {m.regalo ? (
                <div className="animate-pop rounded-3xl border border-pink/40 bg-card px-6 py-4 text-center">
                  <span className="animate-wiggle block text-5xl">{m.regalo}</span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.de === "yo" ? "Le enviaste un regalo" : "Te envió un regalo"}
                  </p>
                </div>
              ) : (
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.de === "yo"
                      ? "brand-gradient rounded-br-sm text-primary-foreground"
                      : "rounded-bl-sm bg-navy text-secondary-foreground"
                  }`}
                >
                  {m.texto}
                  <span className="mt-1 block text-right text-[10px] opacity-70">{m.hora}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={fin} />
          {volando && (
            <span className="animate-fly pointer-events-none fixed bottom-24 left-1/2 z-40 -translate-x-1/2 text-6xl">
              {volando}
            </span>
          )}
        </div>

        {verStickers && (
          <div className="grid grid-cols-8 gap-1 border-t border-border bg-card px-3 py-2">
            {stickers.map((s) => (
              <button
                key={s}
                onClick={() => mandar(s)}
                className="rounded-lg py-1 text-2xl active:scale-90"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 border-t border-border bg-background px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => setVerStickers((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy"
            aria-label="Stickers"
          >
            <Smile className="h-5 w-5 text-gold" />
          </button>
          <button
            onClick={() => toast("Enviar foto (demo) 📸")}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy"
            aria-label="Foto"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && mandar(texto)}
            placeholder="Escribe algo rico..."
            className="min-w-0 flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-pink"
          />
          <button
            onClick={() => toast("Grabando nota de voz... 🎙️ (demo)")}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy"
            aria-label="Voz"
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={() => mandar(texto)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full brand-gradient text-primary-foreground glow"
            aria-label="Enviar"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <GiftSheet
        open={regalos}
        destino={perfil.nombre}
        onClose={() => setRegalos(false)}
        onEnviar={(emoji) => {
          setVolando(emoji);
          setTimeout(() => setVolando(null), 1400);
          mandar("", emoji);
        }}
      />
    </Shell>
  );
}
