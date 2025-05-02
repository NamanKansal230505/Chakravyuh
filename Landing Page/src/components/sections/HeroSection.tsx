import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronDown } from 'lucide-react';
import ParticleBackground from '../ui/ParticleBackground';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-cover " style={{backgroundImage:"url('/hero.png')"}}>
      <ParticleBackground />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full"
          >
            <Shield className="w-5 h-5 text-accent-500" />
            <span className="text-white font-medium">Next-Gen Security</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading"
          >
            Project <span className="text-accent-500"> Chakravyuh</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10"
          >
            Chakravyuh creates an invisible security net in dense forests and difficult terrains, 
            detecting and geo-tagging critical sounds in real-time for immediate threat response.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#contact" className="btn btn-accent">
              Request Demo
            </a>
            <a href="#how-it-works" className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
              Learn How It Works
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.a
          href="#features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-sm mb-2">Discover More</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;