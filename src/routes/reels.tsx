import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle, Send, Video } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/ligo/Shell";
import { reels } from "@/lib/ligo-data";

export const Route = createFileRoute("/reels")({
  head: () => ({
    meta: [
      { title: "Reels cubanos · Ligo" },
      {
        name: "description",
        content:
          "Videos cortos de cubanos en Cuba, Miami, Madrid y México. Mira, reacciona y sube tu propio reel.",
      },
      { property: "og:title", content: "Reels cubanos · Ligo" },
      {
        property: "og:description",
        content: "Feed vertical de reels de 5 a 10 segundos con yumas y cubanos de todo el mundo.",
      },
    ],
  }),
  component: Reels,
});

function Reels() {
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  return (
    <Shell>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="font-display text-xl font-bold">Reels</h1>
        <button
          onClick={() => toast("Sube tu reel de 5 a 10 segundos 🎥 (demo)")}
          className="flex items-center gap-2 rounded-full brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground glow"
        >
          <Video className="h-4 w-4" /> Sube mi reel
        </button>
      </div>

      <div className="no-scrollbar h-[calc(100dvh-160px)] snap-y snap-mandatory overflow-y-auto px-4">
        {reels.map((r) => (
          <article
            key={r.id}
            className="relative mb-4 h-[calc(100dvh-180px)] snap-start overflow-hidden rounded-3xl border border-border card-shadow"
          >
            <img
              src={r.foto}
              alt={r.nombre}
              loading="lazy"
              width={768}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
            <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold">
              ● En vivo desde {r.ciudad}
            </span>

            <div className="absolute bottom-24 right-3 flex flex-col items-center gap-4">
              <button
                onClick={() => setLikes((l) => ({ ...l, [r.id]: !l[r.id] }))}
                className="flex flex-col items-center text-xs"
              >
                <Heart
                  className={`h-7 w-7 ${likes[r.id] ? "fill-pink text-pink" : "text-foreground"}`}
                />
                {r.likes}
              </button>
              <button
                onClick={() => toast("Comentarios próximamente 💬")}
                className="flex flex-col items-center text-xs"
              >
                <MessageCircle className="h-7 w-7" />
                {r.comentarios}
              </button>
              <button
                onClick={() => toast.success("Enlace del reel copiado ✅")}
                className="flex flex-col items-center text-xs"
              >
                <Send className="h-7 w-7" />
                Compartir
              </button>
              <button
                onClick={() => toast("Guardado en tus favoritos ⭐")}
                className="flex flex-col items-center text-xs"
              >
                <Bookmark className="h-7 w-7" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 pr-20">
              <p className="font-display text-lg font-bold">{r.nombre}</p>
              <p className="text-xs text-pink">{r.ciudad}</p>
              <p className="mt-1 text-sm text-secondary-foreground">{r.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}
