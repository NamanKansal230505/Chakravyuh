import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Send,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    submitted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    console.log('Form submitted:', formState);
    // Simulate successful submission
    setFormState(prev => ({ ...prev, submitted: true }));
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: '',
        submitted: false
      });
    }, 3000);
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title gradient-text">Request a Demo</h2>
          <p className="text-lg text-gray-600">
            Interested in seeing Chakravyuh in action? Contact us to schedule a live demonstration
            or discuss how our solution can address your specific security needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="bg-secondary-800 text-white p-8 rounded-lg shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 font-heading">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-accent-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Headquarters</h4>
                  <p className="text-gray-300">Delhi-NCR, Meerut Rd, Ghaziabad, Uttar Pradesh 201206</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-accent-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href="mailto:info@chakravyuh.tech" className="text-gray-300 hover:text-white transition-colors">
                    info@chakravyuh.tech
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-accent-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a href="tel:+919410004994" className="text-gray-300 hover:text-white transition-colors">
                    +91 9410 004 994
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Office Hours</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 12:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                * Emergency support available 24/7 for existing clients.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7 }}
          >
            {formState.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 rounded-full p-3 mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-3 font-heading">Thank You!</h3>
                <p className="text-gray-700 mb-6">
                  Your message has been received. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 font-heading">Send Us a Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formState.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;