import React, { useState, useEffect, useRef } from "react";
import DevicesList from "./DevicesList";
import DeviceView from "./DeviceView";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { Power, Terminal, Cpu, Wifi } from "lucide-react";

export default function Dashboard({ user }) {
  const [deviceId, setDeviceId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const skullAudio = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    if (skullAudio.current) {
      skullAudio.current.currentTime = 0;
      skullAudio.current.volume = 0.5;
      skullAudio.current.play().catch(() => {});
    }

    setTimeout(async () => {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        setIsLoggingOut(false);
      }
    }, 2300);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col relative overflow-hidden">
      <audio ref={skullAudio} src="/skull.mp3" preload="auto" />
      <div className="absolute inset-0 smoke-bg pointer-events-none"></div>

      {/* Top Bar */}
      <motion.header
        className="flex justify-between items-center px-6 py-3 border-b border-green-800 bg-black/70 backdrop-blur-md relative z-10"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <Cpu className="text-green-500" size={28} />
          <h1 className="text-2xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_10px_#00ff88]">
            Basha Control — PRO Panel
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm opacity-80">👤 {user.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-1 border border-green-700 hover:bg-green-800/30 transition-all rounded-lg"
            disabled={isLoggingOut}
          >
            <Power size={16} /> {isLoggingOut ? "Shutting down..." : "Logout"}
          </button>
        </div>
      </motion.header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <motion.aside
          className="w-64 border-r border-green-800 bg-black/80 backdrop-blur-sm p-3 flex flex-col relative z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-green-300">
            <Wifi size={18} /> Devices
          </h2>
          <div className="flex-1 overflow-y-auto custom-scroll">
            <DevicesList onOpenDevice={(id) => setDeviceId(id)} />
          </div>
        </motion.aside>

        <motion.main
          className="flex-1 p-6 overflow-y-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {deviceId ? (
            <DeviceView deviceId={deviceId} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-green-500 opacity-70">
              <Terminal size={48} className="mb-4 animate-pulse" />
              <h2 className="text-2xl">No Device Selected</h2>
              <p className="text-sm mt-2 text-green-300/70">
                Choose a device from the left panel to begin remote control...
              </p>
            </div>
          )}
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs py-2 border-t border-green-800 bg-black/50 relative z-10">
        ⚡ Basha Control PRO v1.0 | Cyber Interface by G & الباشا ⚡
      </footer>

      {/* LOGOUT OVERLAY */}
      <div
        aria-hidden={!isLoggingOut}
        className={`logout-overlay fixed inset-0 z-[60] pointer-events-none ${
          isLoggingOut ? "logging-out-active" : ""
        }`}
      >
        <div className="overlay-bg" />
        <div className="skull-wrap">
          <svg className="skull-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M256 16c79.5 0 144 64.5 144 144 0 36-12 69-32 96v24c0 48-40 88-88 88h-64c-48 0-88-40-88-88v-24c-20-27-32-60-32-96 0-79.5 64.5-144 144-144z"/>
              <circle cx="185" cy="200" r="20" fill="currentColor"/>
              <circle cx="327" cy="200" r="20" fill="currentColor"/>
              <path d="M200 300c18 20 50 20 68 0" stroke="currentColor"/>
            </g>
          </svg>
        </div>
        <div className="glitch-bar g1" />
        <div className="glitch-bar g2" />
        <div className="glitch-bar g3" />
      </div>
    </div>
  );
}
