import { X, Coins } from "lucide-react";
import { toast } from "sonner";
import { paquetes } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export function CoinSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { comprarMonedas, monedas } = useLigo();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
      <button className="absolute inset-0 cursor-default" aria-label="Cerrar" onClick={onClose} />
      <div className="animate-slide-up relative w-full max-w-[560px] rounded-t-3xl border border-border bg-card p-5 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Comprar monedas</h2>
            <p className="text-sm text-muted-foreground">
              Tienes <span className="font-semibold text-gold">{monedas}</span> monedas
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {paquetes.map((p) => (
            <button
              key={p.monedas}
              onClick={() => {
                comprarMonedas(p.monedas);
                onClose();
                toast.success(`¡Listo! +${p.monedas} monedas en tu cuenta 🪙`);
              }}
              className="rounded-2xl border border-border bg-navy p-4 text-left transition-transform active:scale-95"
            >
              <Coins className="mb-2 h-5 w-5 text-gold" />
              <p className="font-display text-lg font-bold">{p.monedas}</p>
              <p className="text-sm text-muted-foreground">{p.precio}</p>
              {p.extra && <p className="mt-1 text-xs font-semibold text-pink">{p.extra}</p>}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Compras simuladas para la demo. No se cobra nada.
        </p>
      </div>
    </div>
  );
}
