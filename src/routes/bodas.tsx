import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/ligo/Shell";
import { bodas } from "@/lib/ligo-data";

export const Route = createFileRoute("/bodas")({
  head: () => ({
    meta: [
      { title: "Parejas que se casaron con Ligo" },
      {
        name: "description",
        content:
          "Historias reales: parejas cubanas que se conocieron en Ligo y hoy están casadas, de La Habana a Madrid.",
      },
      { property: "og:title", content: "Parejas que se casaron con Ligo" },
      {
        property: "og:description",
        content: "De La Habana a Miami, Madrid y CDMX: amores que empezaron con un swipe.",
      },
    ],
  }),
  component: Bodas,
});

function Bodas() {
  return (
    <Shell>
      <div className="px-4 pt-4">
        <h1 className="font-display text-2xl font-extrabold text-pink">
          Parejas que se casaron con Ligo
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Empezaron con un swipe y terminaron en el altar. Tú puedes ser el próximo.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {bodas.map((b) => (
            <article
              key={b.id}
              className="overflow-hidden rounded-2xl border border-border bg-card card-shadow"
            >
              <img
                src={b.foto}
                alt={`Boda de ${b.pareja}`}
                loading="lazy"
                width={768}
                height={768}
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <p className="font-display text-sm font-bold">{b.pareja}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{b.ruta}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-pink">
                  <Heart className="h-3 w-3 fill-pink" /> {b.km} · {b.año}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={() => toast("Cuéntanos tu historia y sales aquí 💍")}
          className="mt-6 w-full rounded-full brand-gradient py-4 font-display font-bold text-primary-foreground glow"
        >
          Cuenta tu historia
        </button>
      </div>
    </Shell>
  );
}
