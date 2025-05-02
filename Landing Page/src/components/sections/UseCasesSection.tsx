import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Trees, 
  Building, 
  Mountain
} from 'lucide-react';
import UseCaseCard from '../ui/UseCaseCard';

const useCases = [
  {
    icon: Trees,
    title: 'Forest Protection',
    description: 'Detect illegal logging, poaching, and unauthorized entry in dense forest areas where traditional surveillance is challenging.',
    image: 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    icon: Shield,
    title: 'Border Security',
    description: 'Monitor remote border areas to detect infiltration attempts and unauthorized crossings with real-time alerts.',
    image: 'https://images.pexels.com/photos/5699766/pexels-photo-5699766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    icon: Building,
    title: 'Critical Infrastructure',
    description: 'Protect vital installations like power plants, water treatment facilities, and communication towers from unauthorized access.',
    image: 'https://images.pexels.com/photos/1108814/pexels-photo-1108814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    icon: Mountain,
    title: 'Difficult Terrain',
    description: 'Secure mountainous regions, ravines, and other challenging landscapes where traditional security measures are ineffective.',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
];

const UseCasesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="use-cases" className="section bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title gradient-text">Applications & Use Cases</h2>
          <p className="text-lg text-gray-600">
            Chakravyuh's versatile system adapts to various security challenges across different environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UseCaseCard 
                icon={useCase.icon} 
                title={useCase.title} 
                description={useCase.description} 
                image={useCase.image}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="btn btn-primary">
            Discuss Your Use Case
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;