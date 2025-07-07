import React, { useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { PipelineLogEntry } from '../types';
import { ENGINE_NAMES } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const getModuleInfo = (module: PipelineLogEntry['module']) => {
    switch(module) {
        case 'Constitution': return { name: ENGINE_NAMES.Constitution, color: 'bg-accent-emerald text-white/90' };
        case 'ACLS': return { name: ENGINE_NAMES.ACLS, color: 'bg-red-500/80 text-white/90' };
        case 'Bitcoin': return { name: ENGINE_NAMES.Bitcoin, color: 'bg-accent-amber text-black/80' };
        case 'Structural': return { name: ENGINE_NAMES.Structural, color: 'bg-accent-lime text-black/80' };
        case 'Symbolic': return { name: ENGINE_NAMES.Symbolic, color: 'bg-accent-blue text-black/80' };
        case 'Phenomenological': return { name: ENGINE_NAMES.Phenomenological, color: 'bg-accent-purple text-white/90' };
        case 'Security': return { name: ENGINE_NAMES.Security, color: 'bg-accent-amber text-black/80' };
        case 'LLM': return { name: 'LLM', color: 'bg-sky-500/80 text-white/90' };
        case 'User': return { name: 'User', color: 'bg-indigo-500/80 text-white/90' };
        default: return { name: 'System', color: 'bg-gray-500/80 text-white/90' };
    }
}

const LogEntry: React.FC<{ log: PipelineLogEntry; style: React.CSSProperties }> = ({ log, style }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { name, color } = getModuleInfo(log.module);

  return (
    <motion.div style={style} className="px-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
        <div className="bg-ui-primary/50 hover:bg-ui-primary/80 transition-colors rounded-md border border-white/5">
            <button
                className="flex items-start gap-3 text-left w-full p-3 cursor-pointer list-none"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
            >
                <div className="mt-0.5 text-xs font-mono w-14 text-right flex-shrink-0 text-text-tertiary">
                    +{log.timeOffset.toFixed(2)}s
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
                            {name}
                        </span>
                        <p className="text-sm font-medium text-text-primary truncate">{log.event}</p>
                    </div>
                </div>
            </button>
            <AnimatePresence>
            {isExpanded && (
                <motion.div
                    className="pl-[88px] pr-3 pb-3 text-xs text-text-secondary overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    {log.details && <p className="mb-2 whitespace-pre-wrap break-words">{log.details}</p>}
                    {log.metadata && (
                        <div>
                            <pre className="p-2 bg-background rounded-md text-accent-cyan overflow-x-auto border border-white/10 font-mono">
                                {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                        </div>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    </motion.div>
  );
};


const AuditPanel: React.FC<{ logs: PipelineLogEntry[] }> = ({ logs }) => {
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(logs.length - 1, 'end');
    }
  }, [logs.length]);

  return (
    <div className="flex flex-col h-full bg-ui-primary/70 rounded-lg border border-white/10 shadow-card backdrop-blur-sm">
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <h2 className="text-xl font-semibold text-text-primary">Audit & Introspection</h2>
      </div>
      <div className="flex-grow min-h-0 p-2">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-secondary px-6">
            Pipeline execution logs will appear here.
          </div>
        ) : (
          <List
            ref={listRef}
            height={600}
            itemCount={logs.length}
            itemSize={60} // Average item height. Items can be expanded.
            width="100%"
            itemKey={(index: number) => logs[index].id}
            className="[&>div]:py-1" // Add padding between items
          >
            {({ index, style }: { index: number; style: React.CSSProperties }) => (
              <LogEntry log={logs[index]} style={style} />
            )}
          </List>
        )}
      </div>
    </div>
  );
};

export default AuditPanel;
