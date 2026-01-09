import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";



function Imageview() {
    const { state } = useLocation();
    const medias = state?.medias || [];
    console.log("medias in imageview:", medias);
    const { mediaId } = useParams();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(() => {
        setTimeout(() => setShow(true), 50);
    }, []);

    const chosedMedia = medias.find(med => med.id === mediaId);

    if (!chosedMedia) return <p>Not Found</p>;

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

            {/* Animated Container */}
            <div
                className={`
          relative w-[96vw] h-[92vh]
          rounded-3xl overflow-hidden
          border border-white/10
          bg-black/60 backdrop-blur-xl
          shadow-2xl
          transition-all duration-700 ease-out
          ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
            >

                {/* Close Button (inside image) */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 z-20
            rounded-full text-white backdrop-blur
            px-4 py-2 text-sm
            hover:bg-white/40 hover:text-black hover:font-bold  transition"
                >
                    ✕
                </button>

                {/* Three Dot Menu */}
                <div className="absolute top-5 right-5 z-20">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-full text-white backdrop-blur px-4 py-2 hover:bg-white/40 hover:text-black hover:font-bold transition"
                    >
                        ⋮
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-black/80 backdrop-blur shadow-xl overflow-hidden">
                            <button className="w-full px-4 py-2 text-white text-left text-sm hover:bg-white/10">
                                Download
                            </button>
                            <button className="w-full px-4 py-2 text-white text-left text-sm hover:bg-white/10">
                                Details
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10">
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Media */}
                {chosedMedia.type === "video" ? (
                    <video
                        src={chosedMedia.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain bg-black"
                    />
                ) : (
                    <img
                        src={chosedMedia.url}
                        alt=""
                        className="w-full h-full object-contain bg-black"
                    />
                )}

                {/* Subtle Gradient Overlay (premium touch) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
            </div>
        </div>
    );
}


export default Imageview