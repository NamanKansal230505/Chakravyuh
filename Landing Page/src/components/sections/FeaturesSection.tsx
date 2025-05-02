import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Bell, 
  MapPin, 
  Sun, 
  Radio, 
  Clock, 
  Shield, 
  Battery
} from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Detection',
    description: 'Edge AI algorithms detect critical sounds like footsteps, whispers, and gun reloads with high accuracy.'
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Real-time notifications with precise location data sent directly to central command dashboard.'
  },
  {
    icon: MapPin,
    title: 'Geo-Tagging',
    description: 'Each event is automatically geo-tagged for pinpoint location tracking and response coordination.'
  },
  {
    icon: Sun,
    title: 'Solar Powered',
    description: 'Sustainable solar energy harvesting ensures continuous operation in remote forest areas.'
  },
  {
    icon: Radio,
    title: 'Mesh Connectivity',
    description: 'LoRa or NB-IoT communication creates a reliable mesh network even in dense forest canopies.'
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Continuous surveillance with timestamp validation for comprehensive security coverage.'
  },
  {
    icon: Shield,
    title: 'Tamper Protection',
    description: 'Advanced anti-tampering mechanisms protect nodes from unauthorized access and sabotage.'
  },
  {
    icon: Battery,
    title: 'Low Maintenance',
    description: 'Autonomous operation with minimal maintenance requirements, reducing manpower needs.'
  }
];

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="section bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title gradient-text">Advanced Security Features</h2>
          <p className="text-lg text-gray-600">
            Our AI-powered sensor nodes combine cutting-edge technology with 
            practical field applications to create an impenetrable security system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;