import React from 'react';
import { motion } from 'framer-motion';

interface Framework {
  thumbnail: string;
  title: string;
  source: string;
  description: string;
}

interface FrameworkCardProps {
  framework: Framework;
  onSelect: () => void;
}

export const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, onSelect }) => {
  return (
    <motion.button
      onClick={onSelect}
      className="bg-ui-primary rounded-lg border border-white/10 overflow-hidden text-left flex flex-col h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="w-full h-40 bg-black overflow-hidden">
        <img src={framework.thumbnail} alt={framework.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-text-primary">{framework.title}</h3>
        <p className="text-xs text-text-tertiary mt-1">Source: {framework.source}</p>
        <p className="text-sm text-text-secondary mt-3 flex-grow">{framework.description}</p>
        <div className="mt-4 text-accent-cyan text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Select Framework &rarr;
        </div>
      </div>
    </motion.button>
  );
};
