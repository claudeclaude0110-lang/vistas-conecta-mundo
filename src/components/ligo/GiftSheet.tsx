import { X } from "lucide-react";
import { toast } from "sonner";
import { regalos } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export function GiftSheet({
  open,
  onClose,
  onEnviar,
  destino,
}: {
  open: boolean;
  onClose: () => void;
  onEnviar?: (emoji: string, costo: number) => void;
  destino?: string;
}) {
  const { monedas, gastarMonedas, sumarRegalo } = useLigo();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
      <button className="absolute inset-0 cursor-default" aria-label="Cerrar" onClick={onClose} />
      <div className="animate-slide-up relative w-full max-w-[560px] rounded-t-3xl border border-border bg-card p-5 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Enviar regalo</h2>
            <p className="text-sm text-muted-foreground">
              {destino ? `Para ${destino} · ` : ""}
              <span className="font-semibold text-gold">{monedas}</span> monedas
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {regalos.map((r) => (
            <button
              key={r.emoji}
              onClick={() => {
                if (!gastarMonedas(r.costo)) {
                  toast.error("No te alcanzan las monedas, compra más 🪙");
                  return;
                }
                sumarRegalo();
                onEnviar?.(r.emoji, r.costo);
                onClose();
                toast.success(`${r.emoji} ¡Regalo enviado! -${r.costo} monedas`);
              }}
              className="rounded-2xl border border-border bg-navy p-3 text-center transition-transform active:scale-90"
            >
              <span className="block text-3xl">{r.emoji}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{r.nombre}</span>
              <span className="text-xs font-semibold text-gold">{r.costo} 🪙</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
