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
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col relative overflow-hidden">
      
      {/* خلفية دخان النيون */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="smoke-bg"></div>
      </div>

      {/* الشريط العلوي */}
      <motion.header
        className="flex justify-between items-center px-6 py-4 border-b border-green-800 bg-black/70 backdrop-blur z-10"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <Cpu className="text-green-500 drop-shadow-[0_0_6px_#00ff88]" size={28} />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_10px_#00ff88]">
            Basha Control — PRO Panel
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm opacity-80">{user?.email}</span>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-4 py-2 border border-green-700 hover:bg-green-800/30 hover:text-green-300 transition-all rounded-lg text-sm"
          >
            <Power size={16} /> Logout
          </button>
        </div>
      </motion.header>

      {/* المحتوى الرئيسي */}
      <div className="flex flex-1 overflow-hidden z-10">
        {/* الشريط الجانبي */}
        <motion.aside
          className="w-64 border-r border-green-800 bg-black/70 backdrop-blur-md p-4 flex flex-col"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-300">
            <Wifi size={18} /> Devices
          </h2>
          <div className="flex-1 overflow-y-auto custom-scroll">
            <DevicesList onOpenDevice={(id) => setDeviceId(id)} />
          </div>
        </motion.aside>

        {/* عرض الجهاز */}
        <motion.main
          className="flex-1 p-6 overflow-y-auto relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {deviceId ? (
            <DeviceView deviceId={deviceId} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-green-500 opacity-80">
              <Terminal size={50} className="mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold">No Device Selected</h2>
              <p className="text-sm mt-2 text-green-300/70">
                Choose a device from the left panel to begin remote control...
              </p>
            </div>
          )}
        </motion.main>
      </div>

      {/* التذييل */}
      <footer className="text-center text-xs py-3 border-t border-green-800 bg-black/60 backdrop-blur-sm z-10">
        ⚡ Basha Control PRO v1.0 | Cyber Interface by G & الباشا ⚡
      </footer>
    </div>
  );
}
