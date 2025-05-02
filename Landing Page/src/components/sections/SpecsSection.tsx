import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Cpu, 
  Battery, 
  Radio, 
  Clock,
  ThermometerSun,
  Shield,
  Scale,
  Ear
} from 'lucide-react';

const SpecsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Initialize icon aliases before using them
  const Sun = ThermometerSun;
  const Signal = Radio;
  const Wifi = Radio;
  const Memory = Cpu;
  const Brain = Cpu;
  const Zap = Clock;
  const Filter = Ear;
  const BarChart = Clock;

  const specs = [
    {
      category: 'Hardware',
      items: [
        { icon: Cpu, title: 'Processor', value: 'Dual-core ARM Cortex-M4F, 80MHz' },
        { icon: Ear, title: 'Sensor', value: 'High-gain MEMS microphone array' },
        { icon: Scale, title: 'Weight', value: '320g including battery and solar panel' },
        { icon: Shield, title: 'Casing', value: 'IP67 waterproof, shockproof, camouflaged' }
      ]
    },
    {
      category: 'Power',
      items: [
        { icon: Battery, title: 'Battery', value: '5000mAh Li-ion, 30-day standby' },
        { icon: Clock, title: 'Runtime', value: '14+ days without solar charging' },
        { icon: Sun, title: 'Solar Panel', value: '5W monocrystalline, 22% efficiency' },
        { icon: ThermometerSun, title: 'Operating Temp', value: '-20°C to +60°C' }
      ]
    },
    {
      category: 'Connectivity',
      items: [
        { icon: Radio, title: 'Communication', value: 'LoRa (15km range) or NB-IoT' },
        { icon: Signal, title: 'Mesh Network', value: 'Self-healing, 128-bit encryption' },
        { icon: Wifi, title: 'Configuration', value: 'Bluetooth LE 5.2 (maintenance only)' },
        { icon: Memory, title: 'Storage', value: '32GB eMMC for local sound processing' }
      ]
    },
    {
      category: 'Software',
      items: [
        { icon: Brain, title: 'AI Engine', value: 'TensorFlow Lite for edge detection' },
        { icon: Zap, title: 'Response Time', value: '<1.5 seconds from detection to alert' },
        { icon: Filter, title: 'False Positive Rate', value: '<2% in standard conditions' },
        { icon: BarChart, title: 'Analytics', value: 'Real-time pattern recognition' }
      ]
    }
  ];

  return (
    <section id="specs" className="section bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title gradient-text">Technical Specifications</h2>
          <p className="text-lg text-gray-600">
            Our sensor nodes combine cutting-edge hardware and software to deliver 
            reliable performance in the most challenging environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {specs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-primary-700 py-4 px-6">
                <h3 className="text-xl font-bold text-white font-heading">{category.category}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-6">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex} className="flex items-start">
                        <div className="bg-primary-100 p-2 rounded-md mr-4">
                          <Icon className="w-6 h-6 text-primary-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-gray-600">{item.value}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 bg-white p-8 rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-6 text-center font-heading text-primary-800">Compatible With</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-primary-700" />
              </div>
              <h4 className="font-medium">Military Systems</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Radio className="w-8 h-8 text-primary-700" />
              </div>
              <h4 className="font-medium">Comm Networks</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-8 h-8 text-primary-700" />
              </div>
              <h4 className="font-medium">Command Centers</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-primary-700" />
              </div>
              <h4 className="font-medium">Alert Systems</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;