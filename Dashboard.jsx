import React, { useState } from "react";
import DevicesList from "./DevicesList";
import DeviceView from "./DeviceView";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { Power, Terminal, Cpu, Wifi } from "lucide-react";

export default function Dashboard({ user }) {
  const [deviceId, setDeviceId] = useState(null);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Top Bar */}
      <motion.header
        className="flex justify-between items-center px-6 py-3 border-b border-green-800 bg-black/60 backdrop-blur"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <Cpu className="text-green-500" size={26} />
          <h1 className="text-3xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_10px_#00ff88]">
  Basha Control — PRO Panel
</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm opacity-80">👤 {user.email}</span>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-4 py-1 border border-green-700 hover:bg-green-800/30 transition-all rounded-lg"
          >
            <Power size={16} /> Logout
          </button>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          className="w-64 border-r border-green-800 bg-black/80 backdrop-blur-sm p-3 flex flex-col"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Wifi size={18} /> Devices
          </h2>
          <div className="flex-1 overflow-y-auto custom-scroll">
            <DevicesList onOpenDevice={(id) => setDeviceId(id)} />
          </div>
        </motion.aside>

        {/* Main View */}
        <motion.main
          className="flex-1 p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
      <footer className="text-center text-xs py-2 border-t border-green-800 bg-black/50">
        ⚡ Basha Control PRO v1.0 | Cyber Interface by G & الباشا ⚡
      </footer>
    </div>
  );
}
