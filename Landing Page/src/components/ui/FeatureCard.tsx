import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 card-hover">
      <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary-700" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-heading text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;