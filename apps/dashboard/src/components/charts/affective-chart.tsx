
import React from 'react';
import type { AffectiveDataPoint } from '../../types';
import { motion } from 'framer-motion';

interface AffectiveChartProps {
  data: AffectiveDataPoint[];
}

const AffectiveChart: React.FC<AffectiveChartProps> = ({ data }) => {
  if (data.length < 2) {
    return (
      <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">
        Run Varkiel Narrative to plot resonance.
      </div>
    );
  }

  const width = 400;
  const height = 100;
  const paddingY = 10;
  
  const maxTime = Math.max(...data.map(d => d.time));
  const maxVal = 100;

  const getX = (time: number) => (time / maxTime) * width;
  const getY = (value: number) => height - paddingY - (value / maxVal) * (height - 2 * paddingY);

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.time)} ${getY(d.value)}`).join(' ');
  const areaPath = `${path} L ${getX(maxTime)} ${height} L ${getX(0)} ${height} Z`;
  
  const color = '#FFC200'; // Amber
  const handleColor = '#FF8C00'; // Darker Amber

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="affectiveAreaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={areaPath}
        fill="url(#affectiveAreaGradient)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
      
       {data.map((d, i) => (
        <motion.circle
          key={i}
          cx={getX(d.time)}
          cy={getY(d.value)}
          r="3"
          fill={handleColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 500 }}
        />
      ))}
    </svg>
  );
};

export default AffectiveChart;