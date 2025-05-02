import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Radio, 
  Ear, 
  Database, 
  MapPin, 
  Bell, 
  Users 
} from 'lucide-react';

const steps = [
  {
    icon: Ear,
    title: 'Sound Detection',
    description: 'AI-powered sensors detect and classify critical sounds such as footsteps, whispers, gun reloads, and vehicle movements.',
    color: 'bg-primary-100 text-primary-700'
  },
  {
    icon: Database,
    title: 'Edge Processing',
    description: 'On-device AI processes sound data locally, minimizing false positives and ensuring reliable threat detection.',
    color: 'bg-secondary-100 text-secondary-700'
  },
  {
    icon: MapPin,
    title: 'Geo-Tagging',
    description: 'Each detected event is automatically tagged with precise location data for accurate threat positioning.',
    color: 'bg-accent-100 text-accent-700'
  },
  {
    icon: Radio,
    title: 'Network Relay',
    description: 'Data is transmitted through a secure mesh network, ensuring delivery even in challenging environments.',
    color: 'bg-primary-100 text-primary-700'
  },
  {
    icon: Bell,
    title: 'Alert Generation',
    description: 'Real-time alerts with threat details are instantly delivered to the central monitoring dashboard.',
    color: 'bg-secondary-100 text-secondary-700'
  },
  {
    icon: Users,
    title: 'Rapid Response',
    description: 'Security personnel receive precise information to coordinate effective response strategies.',
    color: 'bg-accent-100 text-accent-700'
  }
];

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="section bg-cover bg-fixed" style={{backgroundImage:"url('/hiw.png')"}}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title text-white">How Chakravyuh Works</h2>
          <p className="text-lg text-gray-300">
            From detection to response, our advanced system provides seamless security coverage 
            in environments where traditional surveillance fails.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 bg-opacity-20 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
              >
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-3 font-heading">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="my-6 lg:my-0 flex items-center justify-center">
                  <div className={`${step.color} w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-lg z-10`}>
                    <step.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;