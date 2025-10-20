import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

/* ---------- YouTube Type ---------- */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ---------- Props ---------- */
interface BackgroundAudioPlayerProps {
  audioUrl?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

/* ---------- YouTube API Loader Singleton ---------- */
let ytApiLoader: Promise<void> | null = null;
function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiLoader) return ytApiLoader;

  ytApiLoader = new Promise<void>((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => reject(new Error("Failed to load YouTube API"));

    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve();

    setTimeout(() => {
      if (window.YT && window.YT.Player) resolve();
      else reject(new Error("YouTube API timeout"));
    }, 5000);
  });

  return ytApiLoader;
}

/* ---------- Utility Functions ---------- */
const extractYouTubeVideoId = (urlStr: string): string | null => {
  if (!urlStr) return null;

  // General regex for YouTube video IDs (v=, /embed/, /shorts/, youtu.be)
  const idRegex = /(?:v=|\/embed\/|\/shorts\/|\.be\/)([A-Za-z0-9_-]{11})/;

  try {
    const url = new URL(urlStr);
    const hostname = url.hostname;

    // youtu.be short link -> pathname is /<id>
    if (hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\/+/, "").split(/[?#]/)[0];
      return id && id.length >= 6 ? id : null;
    }

    // youtube.com or music.youtube.com
    if (hostname.includes("youtube.com") || hostname.includes("music.youtube.com")) {
      // ?v=VIDEOID
      const v = url.searchParams.get("v");
      if (v) return v;

      // path-based forms: /embed/VIDEOID or /shorts/VIDEOID
      const pathMatch = url.pathname.match(/\/(embed|shorts)\/([A-Za-z0-9_-]{6,})/);
      if (pathMatch && pathMatch[2]) return pathMatch[2];

      // fallback regex against full URL
      const fallback = urlStr.match(idRegex);
      if (fallback && fallback[1]) return fallback[1];

      return null;
    }

    // fallback regex if URL parsing succeeds but hostname is unusual
    const fallback2 = urlStr.match(idRegex);
    return fallback2 ? fallback2[1] : null;

  } catch (err) {
    // if URL parsing fails (user pasted only ID or malformed string), use regex
    const m = urlStr.match(idRegex);
    return m ? m[1] : null;
  }
};


function detectUrlType(url?: string): "youtube" | "audio" | "unsupported" | null {
  if (!url) return null;
  const ytId = extractYouTubeVideoId(url);
  if (ytId) return "youtube";
  if (/\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url)) return "audio";

  try {
    const host = new URL(url).hostname;
    if (host.includes("spotify.com") || host.includes("soundcloud.com")) return "unsupported";
  } catch {}
  return "unsupported";
}

/* ---------- Component ---------- */
const BackgroundAudioPlayer: React.FC<BackgroundAudioPlayerProps> = ({
  audioUrl,
  autoPlay = true,
  loop = true,
  className,
}) => {
  const ytPlayerId = useId();
  const ytPlayerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userInteractedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlType = detectUrlType(audioUrl);

  /* ---------- First Interaction (Autoplay Policy) ---------- */
  const handleFirstInteraction = useCallback(() => {
  if (userInteractedRef.current) return;
  userInteractedRef.current = true;

  document.removeEventListener("click", handleFirstInteraction);
  document.removeEventListener("scroll", handleFirstInteraction);
  document.removeEventListener("keydown", handleFirstInteraction);
  document.removeEventListener("touchstart", handleFirstInteraction);

  if (urlType === "youtube" && ytPlayerRef.current && typeof ytPlayerRef.current.unMute === "function") {
    try {
      ytPlayerRef.current.unMute();
      setIsMuted(false);
      if (isPlaying === false) ytPlayerRef.current.playVideo().catch(() => {});
    } catch (error) {
      console.error("Failed to unmute YouTube:", error);
    }
  } else if (urlType === "audio" && audioRef.current) {
    try {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play().catch(() => {});
    } catch (error) {
      console.error("Failed to unmute audio element:", error);
    }
  }
}, [urlType]);


  useEffect(() => {
    if (!audioUrl || userInteractedRef.current) return;

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [audioUrl, handleFirstInteraction]);

  /* ---------- YouTube Player ---------- */
  useEffect(() => {
    if (urlType !== "youtube" || !audioUrl) return;

    const videoId = extractYouTubeVideoId(audioUrl);
    if (!videoId) {
      setError("Invalid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    loadYouTubeAPI()
      .then(() => {
        if (ytPlayerRef.current) {
          try {
            ytPlayerRef.current.destroy();
          } catch {}
          ytPlayerRef.current = null;
        }

        ytPlayerRef.current = new window.YT.Player(ytPlayerId, {
          videoId,
          height: "0",
          width: "0",
          playerVars: {
            autoplay: autoPlay ? 1 : 0,
            loop: loop ? 1 : 0,
            playlist: loop ? videoId : undefined,
            controls: 0,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (e: any) => {
              setIsLoading(false);
               try {
                // Start muted to comply with autoplay policies
                e.target.mute();
                if (autoPlay) e.target.playVideo();
                setIsMuted(true);
                setIsPlaying(autoPlay);
              } catch {
                setError("Autoplay failed");
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
              if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
              if (event.data === window.YT.PlayerState.ENDED && loop) event.target.playVideo();
            },
            onError: () => {
              setIsLoading(false);
              setError("YouTube playback error");
              toast({
                title: "YouTube Error",
                description: "Failed to play this video",
                variant: "destructive",
              });
            },
          },
        });
      })
      .catch(() => {
        setError("Failed to load YouTube API");
        setIsLoading(false);
      });

    return () => {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {}
      }
    };
  }, [audioUrl, autoPlay, loop, ytPlayerId, urlType]);

  /* ---------- HTML Audio ---------- */
  useEffect(() => {
    if (urlType !== "audio" || !audioRef.current || !audioUrl) return;
    const el = audioRef.current;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setError("Failed to play audio file");

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);

    el.loop = loop;
    el.preload = "metadata";
    el.muted = true;

    if (autoPlay) {
      el.play().catch(() => setError("Autoplay blocked — click play"));
    }

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
    };
  }, [audioUrl, autoPlay, loop, urlType]);

  /* ---------- Controls ---------- */
  const togglePlayPause = () => {
    handleFirstInteraction();

    if (urlType === "youtube" && ytPlayerRef.current) {
      isPlaying ? ytPlayerRef.current.pauseVideo() : ytPlayerRef.current.playVideo();
    } else if (urlType === "audio" && audioRef.current) {
      isPlaying
        ? audioRef.current.pause()
        : audioRef.current.play().catch(() => setError("Failed to play audio"));
    }
  };

  const toggleMute = () => {
    handleFirstInteraction();

    if (urlType === "youtube" && ytPlayerRef.current) {
      if (isMuted) ytPlayerRef.current.unMute();
      else ytPlayerRef.current.mute();
      setIsMuted(!isMuted);
    } else if (urlType === "audio" && audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  if (!audioUrl) return null;

  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      {/* Hidden Players */}
      {urlType === "youtube" && <div id={ytPlayerId} className="w-0 h-0 overflow-hidden" />}
      {urlType === "audio" && <audio ref={audioRef} src={audioUrl} loop={loop} hidden />}

      {/* Play / Pause */}
      <Button
        variant="outline"
        onClick={togglePlayPause}
        disabled={isLoading || !!error || urlType === "unsupported"}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="
          relative overflow-hidden
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-md hover:bg-gray-100
          rounded-md border border-primary
          transition-all duration-300
        "
      >
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="
            absolute inset-0 
            bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 -skew-x-12
            pointer-events-none z-0
          "
        />
        <span className="relative z-10">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6 text-red-600" />
          ) : (
            <Play className="h-6 w-6 text-green-600" />
          )}
        </span>
      </Button>

      {/* Mute */}
      <Button
        variant="outline"
        onClick={toggleMute}
        disabled={!!error || urlType === "unsupported"}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="
          relative overflow-hidden
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-md hover:bg-gray-100
          rounded-md border border-primary
          transition-all duration-300
        "
      >
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="
            absolute inset-0 
            bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 -skew-x-12
            pointer-events-none z-0
          "
        />
        <span className="relative z-10">
          {isMuted ? (
            <VolumeX className="h-6 w-6 text-amber-600" />
          ) : (
            <Volume2 className="h-6 w-6 text-blue-600" />
          )}
        </span>
      </Button>

      {/* Error */}
      {(error || urlType === "unsupported") && (
        <div className="flex items-center gap-1 ml-1">
          <AlertCircle className="h-3 w-3 text-destructive" />
          <span className="text-xs text-destructive truncate">
            {error || "Unsupported URL"}
          </span>
        </div>
      )}
    </div>
  );
};

export default BackgroundAudioPlayer;
