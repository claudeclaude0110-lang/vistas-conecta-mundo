import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  CalendarDays,
  Heart,
  MapPin,
  MessageSquare,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Bots } from "@/components/ligo/Shell";
import { ciudades, fotos } from "@/lib/ligo-data";
import { useLigo } from "@/lib/ligo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crea tu perfil en Ligo · Cubanos conectando con el mundo" },
      {
        name: "description",
        content:
          "Regístrate en Ligo en 4 pasos: foto, datos, verificación con selfie y listo para ligar en Cuba y el mundo.",
      },
      { property: "og:title", content: "Crea tu perfil en Ligo" },
      {
        property: "og:description",
        content: "Cuatro pasos y ya estás conectando con cubanos de Cuba, Miami, Madrid y México.",
      },
    ],
  }),
  component: Registro,
});

const intereses = [
  "Salsa 💃",
  "Café cubano ☕",
  "Playa 🏖️",
  "Familia ❤️",
  "Viajes ✈️",
  "Gym 🏋️",
  "Cine 🎬",
  "Exilio 🌍",
  "Cocina 🍚",
];

function Registro() {
  const navigate = useNavigate();
  const { guardarUsuario } = useLigo();
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("27");
  const [ciudad, setCiudad] = useState(ciudades[0]);
  const [bio, setBio] = useState("");
  const [acepta, setAcepta] = useState(true);
  const [foto, setFoto] = useState<string>(fotos.p2);
  const [verificado, setVerificado] = useState(false);
  const [misIntereses, setMisIntereses] = useState<string[]>(["Salsa 💃", "Café cubano ☕"]);
  const inputFoto = useRef<HTMLInputElement>(null);

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[560px] overflow-hidden night-gradient">
      <Bots />
      <div className="relative px-5 pb-12 pt-6">
        <div className="mb-6 flex items-center gap-3">
          {paso > 1 && (
            <button
              onClick={() => setPaso((p) => p - 1)}
              className="grid h-9 w-9 place-items-center rounded-full bg-navy"
              aria-label="Atrás"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div className="flex flex-1 gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  n <= paso ? "bg-pink" : "bg-navy"
                }`}
              />
            ))}
          </div>
        </div>

        {paso === 1 && (
          <section className="animate-pop text-center">
            <div className="mb-2 flex items-center justify-center gap-1">
              <span className="font-display text-2xl font-extrabold">Ligo</span>
              <Heart className="h-5 w-5 fill-pink text-pink" />
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-pink">
              Bienvenido a Ligo
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-base text-secondary-foreground">
              El cubano de aquí conecta con el mundo entero
            </p>

            <div className="relative mx-auto mt-8 h-56 w-56">
              <div className="animate-ring absolute inset-0 rounded-full" />
              <img
                src={foto}
                alt="Tu foto de perfil"
                width={768}
                height={1024}
                className="h-56 w-56 rounded-full border-4 border-pink object-cover glow"
              />
            </div>

            <input
              ref={inputFoto}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFoto(URL.createObjectURL(f));
                  toast.success("¡Qué foto! Así te van a ver 🔥");
                }
              }}
            />
            <button
              onClick={() => inputFoto.current?.click()}
              className="mt-6 text-sm font-semibold text-pink-soft underline"
            >
              Subir otra foto
            </button>

            <button
              onClick={() => setPaso(2)}
              className="mt-6 w-full rounded-full brand-gradient py-4 font-display text-lg font-bold text-primary-foreground glow transition-transform active:scale-95"
            >
              Continuar con mi foto
            </button>
          </section>
        )}

        {paso === 2 && (
          <section className="animate-pop">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-pink">
              Cuéntame
              <br />
              quién eres
            </h1>
            <div className="mt-6 space-y-3">
              <Campo icon={<UserRound className="h-5 w-5 text-pink" />}>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </Campo>
              <Campo icon={<CalendarDays className="h-5 w-5 text-pink" />} label="Edad">
                <input
                  type="number"
                  min={18}
                  max={80}
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  className="w-full bg-transparent text-base outline-none"
                />
              </Campo>
              <Campo icon={<MapPin className="h-5 w-5 text-pink" />} label="Provincia / Ciudad">
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full bg-transparent text-base outline-none [&>option]:bg-card"
                >
                  {ciudades.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Campo>
              <Campo icon={<MessageSquare className="h-5 w-5 text-pink" />} label="Bio corta">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Bio corta..."
                  className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </Campo>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {intereses.map((i) => {
                const on = misIntereses.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() =>
                      setMisIntereses((m) => (on ? m.filter((x) => x !== i) : [...m, i]))
                    }
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      on ? "border-pink bg-pink/15 text-pink" : "border-border bg-navy"
                    }`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setAcepta((a) => !a)}
              className="mt-5 flex w-full items-start gap-2 text-left text-sm text-secondary-foreground"
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  acepta ? "border-pink bg-pink" : "border-border"
                }`}
              >
                {acepta && <BadgeCheck className="h-3.5 w-3.5 text-primary-foreground" />}
              </span>
              Acepto que otros vean mi perfil en Cuba y en el mundo
            </button>

            <button
              disabled={!nombre || !acepta}
              onClick={() => setPaso(3)}
              className="mt-6 w-full rounded-full brand-gradient py-4 font-display text-lg font-bold text-primary-foreground glow transition-transform active:scale-95 disabled:opacity-40"
            >
              Verificar con selfie
            </button>
          </section>
        )}

        {paso === 3 && (
          <PasoSelfie
            foto={foto}
            verificado={verificado}
            onVerificado={() => {
              setVerificado(true);
              setTimeout(() => setPaso(4), 1400);
            }}
          />
        )}

        {paso === 4 && (
          <section className="animate-pop">
            <h1 className="font-display text-3xl font-extrabold text-pink">Así te verán</h1>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card card-shadow">
              <div className="relative">
                <img
                  src={foto}
                  alt={nombre}
                  width={768}
                  height={1024}
                  className="h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              </div>
              <div className="-mt-10 relative p-5">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    {nombre || "Tu nombre"}, {edad}
                  </h2>
                  {verificado && <BadgeCheck className="h-5 w-5 text-pink" />}
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {ciudad}
                </p>
                <p className="mt-3 text-sm text-secondary-foreground">
                  {bio || "Aquí va tu bio, ponle sabor."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {misIntereses.map((i) => (
                    <span key={i} className="rounded-full bg-navy px-3 py-1 text-xs">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                guardarUsuario({
                  nombre: nombre || "Yoel",
                  edad: Number(edad) || 27,
                  ciudad,
                  bio: bio || "Cubano buscando algo real.",
                  foto,
                  verificado,
                  intereses: misIntereses,
                });
                toast.success("¡Cuenta creada! Dale, a ligar 💘");
                navigate({ to: "/descubre" });
              }}
              className="mt-6 w-full rounded-full brand-gradient py-4 font-display text-lg font-bold text-primary-foreground glow transition-transform active:scale-95"
            >
              Crear mi cuenta
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function Campo({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-pink/40 bg-card/80 px-4 py-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        {label && <p className="text-xs text-muted-foreground">{label}</p>}
        {children}
      </div>
    </div>
  );
}

function PasoSelfie({
  foto,
  verificado,
  onVerificado,
}: {
  foto: string;
  verificado: boolean;
  onVerificado: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camara, setCamara] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" } })
      .then((s) => {
        stream = s;
        setCamara(true);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setCamara(false));
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  return (
    <section className="animate-pop text-center">
      <h1 className="font-display text-3xl font-extrabold text-pink">Verifica tu perfil</h1>
      <p className="mt-3 text-lg text-secondary-foreground">Mira la cámara y sonríe</p>

      <div className="relative mx-auto mt-8 h-64 w-64">
        <div className="animate-ring absolute inset-0 rounded-full" />
        <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-pink glow">
          {camara ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full scale-x-[-1] object-cover"
            />
          ) : (
            <img src={foto} alt="Selfie" className="h-full w-full object-cover" />
          )}
        </div>
        {verificado && (
          <div className="animate-pop absolute inset-0 grid place-items-center rounded-full bg-background/80">
            <div className="text-center">
              <BadgeCheck className="mx-auto h-16 w-16 text-pink" />
              <p className="font-display mt-2 text-xl font-bold text-pink">¡Verificado!</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onVerificado}
        disabled={verificado}
        className="mt-10 w-full rounded-full brand-gradient py-4 font-display text-lg font-bold text-primary-foreground glow transition-transform active:scale-95 disabled:opacity-60"
      >
        <span className="inline-flex items-center gap-2">
          {verificado ? <Sparkles className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
          {verificado ? "Perfil verificado" : "Tomar selfie y verificar"}
        </span>
      </button>
      {!camara && (
        <p className="mt-3 text-xs text-muted-foreground">
          Si no ves la cámara, dale permiso al navegador. Igual puedes continuar.
        </p>
      )}
    </section>
  );
}
