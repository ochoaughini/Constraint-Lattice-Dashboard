
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3-force';
import type { GraphNode, GraphLink } from '../../types';

interface ConceptualGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

const COLORS: Record<string, string> = {
  concept: '#14b8a6', // teal
  archetype: '#d946ef', // fuchsia
  intent: '#3b82f6', // blue
  output: '#38bdf8', // sky
};

const ConceptualGraph: React.FC<ConceptualGraphProps> = ({ nodes: initialNodes, links }) => {
  const [animatedNodes, setAnimatedNodes] = useState<GraphNode[]>([]);

  const nodes = useMemo(() => initialNodes.map(n => ({...n})), [initialNodes]);

  useEffect(() => {
    if(nodes.length === 0) {
        setAnimatedNodes([]);
        return;
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(200, 125))
      .on('tick', () => {
        setAnimatedNodes([...nodes]);
      });

    return () => {
      simulation.stop();
    };
  }, [nodes, links]);
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 250">
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>

      {links.map((link, i) => {
        const sourceNode = animatedNodes.find(n => n.id === link.source);
        const targetNode = animatedNodes.find(n => n.id === link.target);
        if (!sourceNode || !targetNode) return null;
        
        const dx = (targetNode.x ?? 0) - (sourceNode.x ?? 0);
        const dy = (targetNode.y ?? 0) - (sourceNode.y ?? 0);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist === 0) return null;
        const radius = 4 + (targetNode.strength || 0.5) * 6;
        const offsetX = (dx * radius) / dist;
        const offsetY = (dy * radius) / dist;

        return (
          <motion.line
            key={i}
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={(targetNode.x ?? 0) - offsetX}
            y2={(targetNode.y ?? 0) - offsetY}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
            initial={false}
            animate={{ x1: sourceNode.x, y1: sourceNode.y, x2: (targetNode.x ?? 0) - offsetX, y2: (targetNode.y ?? 0) - offsetY }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        );
      })}

      {animatedNodes.map(node => {
          const radius = 4 + (node.strength || 0.5) * 6;
          return (
            <motion.g
              key={node.id}
              initial={{ x: 200, y: 125 }}
              animate={{ x: node.x || 200, y: node.y || 125 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="group cursor-pointer"
            >
              <motion.circle
                r={radius}
                fill={COLORS[node.group] || '#ccc'}
                whileHover={{ scale: 1.2 }}
              />
              <text
                textAnchor="middle"
                y={radius + 12}
                fontSize="11"
                fontWeight="medium"
                fill="rgba(255,255,255,0.9)"
                style={{ pointerEvents: 'none' }}
              >
                {node.label}
              </text>
            </motion.g>
          )
      })}
    </svg>
  );
};

export default ConceptualGraph;