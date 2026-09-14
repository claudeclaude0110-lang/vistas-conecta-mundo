import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Shell } from "@/components/ligo/Shell";
import { perfiles } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export const Route = createFileRoute("/chats/")({
  head: () => ({
    meta: [
      { title: "Tus chats en Ligo" },
      {
        name: "description",
        content: "Conversa con tus matches cubanos, manda stickers, voz y regalos con flores.",
      },
      { property: "og:title", content: "Tus chats en Ligo" },
      { property: "og:description", content: "Mensajes, regalos y flores con tus matches." },
    ],
  }),
  component: Chats,
});

function Chats() {
  const { matches, chats } = useLigo();
  const lista = matches
    .map((id) => perfiles.find((p) => p.id === id))
    .filter(Boolean) as typeof perfiles;

  return (
    <Shell>
      <div className="px-4 pt-4">
        <h1 className="font-display text-2xl font-extrabold">Mensajes</h1>

        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
          {lista.map((p) => (
            <Link
              key={p.id}
              to="/chats/$id"
              params={{ id: p.id }}
              className="flex w-16 shrink-0 flex-col items-center gap-1"
            >
              <img
                src={p.foto}
                alt={p.nombre}
                loading="lazy"
                className="h-14 w-14 rounded-full border-2 border-pink object-cover"
              />
              <span className="w-full truncate text-center text-[11px]">{p.nombre}</span>
            </Link>
          ))}
        </div>

        <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {lista.map((p) => {
            const msgs = chats[p.id] ?? [];
            const ultimo = msgs[msgs.length - 1];
            return (
              <Link
                key={p.id}
                to="/chats/$id"
                params={{ id: p.id }}
                className="flex items-center gap-3 p-3 transition-colors active:bg-navy"
              >
                <img
                  src={p.foto}
                  alt={p.nombre}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 truncate font-semibold">
                    {p.nombre}, {p.edad}
                    {p.verificado && <BadgeCheck className="h-4 w-4 shrink-0 text-pink" />}
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      ({p.ciudad.split(",")[0]})
                    </span>
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {ultimo?.regalo ? `${ultimo.regalo} te mandó un regalo` : (ultimo?.texto ?? "Dile algo rico...")}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {ultimo?.hora ?? "nuevo"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
