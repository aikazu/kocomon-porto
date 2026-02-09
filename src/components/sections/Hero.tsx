import { motion } from 'framer-motion';
import GeometricScene from '../3d/GeometricScene';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <GeometricScene />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Iqbal Attila
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-yellow-100/80 font-light tracking-wide max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Creative Developer & UI/UX Designer
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
            <div className="animate-bounce text-yellow-500">
                ↓
            </div>
        </motion.div>
      </div>
    </section>
  );
}
