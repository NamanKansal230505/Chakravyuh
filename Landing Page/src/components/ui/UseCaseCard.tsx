import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon: Icon, title, description, image }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-md h-[400px] card-hover">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-90"></div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 font-heading text-white">{title}</h3>
        <p className="text-gray-200 mb-6">{description}</p>
        <a href="#contact" className="text-accent-400 font-medium hover:text-accent-300 transition-colors group-hover:underline">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default UseCaseCard;