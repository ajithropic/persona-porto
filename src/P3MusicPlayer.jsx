import { useState, useRef, useEffect, useCallback } from "react";
import bluesInVelvetRoom from "./music/Blues in Velvet Room - Persona 3 OST.mp3";
import changingSeasons from "./music/Changing Seasons -Reload-.mp3";
import colorYourNight from "./music/Color Your Night.mp3";
import fullMoonFullLife from "./music/Full Moon Full Life.mp3";
import itsGoingDownNow from "./music/It's Going Down Now.mp3";

// ponytail: playlist hardcoded — upgrade to dynamic list / context when track count grows
const PLAYLIST = [
  { title: "Blues in Velvet Room", url: bluesInVelvetRoom },
  { title: "Changing Seasons -Reload-", url: changingSeasons },
  { title: "Color Your Night", url: colorYourNight },
  { title: "Full Moon Full Life", url: fullMoonFullLife },
  { title: "It's Going Down Now", url: itsGoingDownNow },
];

export default function P3MusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const track = PLAYLIST[trackIdx];

  const skipTo = useCallback((idx) => {
    setTrackIdx(idx);
    setProgress(0);
    setIsPlaying(true);
  }, []);

  const next = useCallback(() => skipTo((trackIdx + 1) % PLAYLIST.length), [trackIdx, skipTo]);
  const prev = useCallback(() => skipTo((trackIdx - 1 + PLAYLIST.length) % PLAYLIST.length), [trackIdx, skipTo]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback failed:", err);
        setIsPlaying(false);
      });
    }
  }, [trackIdx]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const updateProgress = (event) => {
    const { currentTime, duration } = event.currentTarget;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  return (
    <aside className={`p3mp${isPlaying ? " p3mp--playing" : ""}`} aria-label="Music player">
      <audio
        ref={audioRef}
        src={track.url}
        preload="metadata"
        muted={isMuted}
        onTimeUpdate={updateProgress}
        onEnded={next}
      />
      <style>{`
        .p3mp {
          position: fixed;
          right: 28px;
          bottom: 24px;
          z-index: 100;
          width: 300px;
          color: #fff;
          font-family: 'Anton', sans-serif;
          pointer-events: none;
        }

        .p3mp-frame {
          position: relative;
          padding: 3px 3px 3px 8px;
          background: #0086c4;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
          box-shadow: 6px 6px 0 rgba(0,0,0,0.45);
          pointer-events: all;
        }

        .p3mp-inner {
          display: grid;
          grid-template-columns: 46px 1fr auto;
          align-items: center;
          gap: 8px;
          padding: 8px 8px 8px 6px;
          background: rgba(8,8,10,0.96);
          clip-path: inherit;
        }

        /* ── buttons shared ── */
        .p3mp-btn {
          appearance: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          color: inherit;
          font: inherit;
          background: transparent;
        }

        /* ── play button ── */
        .p3mp-play {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          background: #fff;
          color: #111;
          clip-path: polygon(0 0, 100% 0, 100% 76%, 76% 100%, 0 100%);
          transition: background 0.15s, color 0.15s;
        }
        .p3mp-play:hover,
        .p3mp-play:focus-visible {
          background: #004ec4;
          color: #fff;
          outline: 2px solid #fff;
          outline-offset: 2px;
        }

        .p3mp-play-ico {
          width: 0; height: 0;
          margin-left: 3px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 13px solid currentColor;
        }
        .p3mp-play.on .p3mp-play-ico {
          width: 13px; height: 16px;
          margin-left: 0;
          border: 0;
          background: linear-gradient(90deg, currentColor 0 30%, transparent 30% 70%, currentColor 70%);
        }

        /* ── copy ── */
        .p3mp-copy { min-width: 0; line-height: 1; }

        .p3mp-kicker {
          display: block;
          color: #e84a5d;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .p3mp-title {
          display: block;
          margin-top: 3px;
          font-size: 18px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .p3mp-bar {
          height: 3px;
          margin-top: 6px;
          background: rgba(255,255,255,0.2);
          overflow: hidden;
        }
        .p3mp-bar-fill {
          height: 100%;
          background: #c4001a;
          transition: width 0.3s linear;
        }

        /* ── controls right ── */
        .p3mp-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .p3mp-skip {
          width: 28px;
          height: 22px;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 14px;
          transition: color 0.15s, transform 0.12s;
        }
        .p3mp-skip:hover,
        .p3mp-skip:focus-visible {
          color: #e84a5d;
          transform: scale(1.2);
          outline: 1px solid #fff;
          outline-offset: 1px;
        }

        .p3mp-mute {
          width: 28px;
          height: 22px;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 16px;
          transition: color 0.15s;
        }
        .p3mp-mute:hover,
        .p3mp-mute:focus-visible {
          color: #e84a5d;
          outline: 1px solid #fff;
          outline-offset: 1px;
        }
        .p3mp-mute.on { color: #c4001a; }

        /* ── equalizer dots ── */
        .p3mp-eq {
          position: absolute;
          top: -10px;
          right: 10px;
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 8px;
          pointer-events: none;
        }
        .p3mp-eq span {
          width: 3px;
          background: #fff;
          animation: p3mp-pulse 0.7s ease-in-out infinite alternate;
        }
        .p3mp-eq span:nth-child(1) { height: 4px; }
        .p3mp-eq span:nth-child(2) { height: 8px; animation-delay: -0.22s; }
        .p3mp-eq span:nth-child(3) { height: 5px; animation-delay: -0.44s; }

        .p3mp:not(.p3mp--playing) .p3mp-eq span {
          animation-play-state: paused;
        }

        @keyframes p3mp-pulse {
          to { transform: scaleY(0.3); }
        }

        /* ── track counter ── */
        .p3mp-counter {
          position: absolute;
          top: -10px;
          left: 14px;
          font-size: 9px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.5);
          pointer-events: none;
        }

        /* ── mobile ── */
        @media (max-width: 768px) {
          .p3mp {
            right: max(10px, env(safe-area-inset-right));
            bottom: max(10px, env(safe-area-inset-bottom));
            width: 220px;
          }
          .p3mp-inner {
            grid-template-columns: 36px 1fr auto;
            gap: 5px;
            padding: 6px;
          }
          .p3mp-play { width: 34px; height: 34px; }
          .p3mp-play-ico { border-top-width: 7px; border-bottom-width: 7px; border-left-width: 10px; }
          .p3mp-play.on .p3mp-play-ico { width: 10px; height: 13px; }
          .p3mp-kicker { font-size: 7px; }
          .p3mp-title { font-size: 14px; }
          .p3mp-skip { width: 24px; height: 18px; font-size: 12px; }
          .p3mp-mute { width: 24px; height: 18px; font-size: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .p3mp *, .p3mp *::before {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="p3mp-frame">
        <div className="p3mp-counter" aria-hidden="true">
          {String(trackIdx + 1).padStart(2, "0")}/{String(PLAYLIST.length).padStart(2, "0")}
        </div>
        <div className="p3mp-eq" aria-hidden="true"><span/><span/><span/></div>
        <div className="p3mp-inner">
          <button
            className={`p3mp-btn p3mp-play${isPlaying ? " on" : ""}`}
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
            onClick={togglePlayback}
          >
            <span className="p3mp-play-ico" aria-hidden="true" />
          </button>

          <div className="p3mp-copy">
            <span className="p3mp-kicker">NOW PLAYING</span>
            <span className="p3mp-title">{track.title}</span>
            <div className="p3mp-bar" aria-hidden="true">
              <div className="p3mp-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="p3mp-controls">
            <button
              className="p3mp-btn p3mp-skip"
              type="button"
              aria-label="Previous track"
              onClick={prev}
            >
              <span aria-hidden="true">◄</span>
            </button>
            <button
              className={`p3mp-btn p3mp-mute${isMuted ? " on" : ""}`}
              type="button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              aria-pressed={isMuted}
              onClick={() => setIsMuted(m => !m)}
            >
              <span aria-hidden="true">{isMuted ? "×" : "◖"}</span>
            </button>
            <button
              className="p3mp-btn p3mp-skip"
              type="button"
              aria-label="Next track"
              onClick={next}
            >
              <span aria-hidden="true">►</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
