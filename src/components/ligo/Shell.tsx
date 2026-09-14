import { Link } from "@tanstack/react-router";
import { Bell, Coins, Flame, Heart, MessageCircle, User, Church } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useLigo } from "@/lib/ligo-store";
import { CoinSheet } from "./CoinSheet";

export function Bots() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -left-16 top-10 h-56 w-56 rounded-full bg-pink/20 blur-3xl" />
      <div
        className="animate-float absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-navy-soft/70 blur-3xl"
        style={{ animationDelay: "1.8s" }}
      />
      <div
        className="animate-float absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-pink-soft/15 blur-3xl"
        style={{ animationDelay: "3.4s" }}
      />
    </div>
  );
}

const nav = [
  { to: "/descubre", label: "Vistas", icon: Heart },
  { to: "/reels", label: "Reels", icon: Flame },
  { to: "/chats", label: "Chat", icon: MessageCircle },
  { to: "/bodas", label: "Bodas", icon: Church },
  { to: "/perfil", label: "Perfil", icon: User },
];

export function Shell({ children, sinNav = false }: { children: ReactNode; sinNav?: boolean }) {
  const { monedas, notificaciones, limpiarNotificaciones } = useLigo();
  const [coins, setCoins] = useState(false);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[560px] flex-col bg-background">
      <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-xl">
        <Link to="/descubre" className="flex min-w-0 items-center gap-1">
          <span className="font-display truncate text-xl font-extrabold tracking-tight">Ligo</span>
          <Heart className="h-4 w-4 shrink-0 fill-pink text-pink" />
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setCoins(true)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-navy px-3 py-1.5 text-sm font-semibold"
          >
            <Coins className="h-4 w-4 text-gold" />
            {monedas}
          </button>
          <button
            onClick={() => {
              limpiarNotificaciones();
              toast("Tienes gente nueva mirando tu perfil 👀");
            }}
            className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-navy"
            aria-label="Notificaciones"
          >
            <Bell className="h-4 w-4" />
            {notificaciones > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-primary-foreground">
                {notificaciones}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="relative flex-1 pb-24">{children}</main>

      {!sinNav && (
        <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[560px] -translate-x-1/2 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
          <div className="grid grid-cols-5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="flex flex-col items-center gap-0.5 py-3 text-[11px] text-muted-foreground transition-colors"
                activeProps={{ className: "!text-pink" }}
              >
                <n.icon className="h-5 w-5" />
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <CoinSheet open={coins} onClose={() => setCoins(false)} />
    </div>
  );
}
