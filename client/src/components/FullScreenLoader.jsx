import { Spinner } from "@/components/ui/spinner";

function FullScreenLoader({ text = "Authenticating" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="absolute w-[600px] h-[600px] bg-teal-500/20 blur-[160px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-200px] right-[-200px]" />

      {/* Glass card */}
      <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-8 shadow-2xl flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="scale-125">
          <Spinner />
        </div>

        {/* Animated text */}
        <p className="text-neutral-300 text-sm tracking-wide">
          {text}
          <span className="animate-pulse">...</span>
        </p>

        {/* Branding */}
        <span className="text-xs text-neutral-500 tracking-widest">
          I M A Z E
        </span>
      </div>
    </div>
  );
}

export default FullScreenLoader;
