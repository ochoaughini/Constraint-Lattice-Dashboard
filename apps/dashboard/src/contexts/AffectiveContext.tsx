import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AffectiveState {
  name: string;
  value: number;
}

interface AffectiveContextType {
  data: AffectiveState[];
  loading: boolean;
  error: string | null;
}

const AffectiveContext = createContext<AffectiveContextType>({
  data: [],
  loading: true,
  error: null,
});

export const AffectiveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AffectiveState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://your-websocket-endpoint');

    ws.onopen = () => {
      setLoading(false);
    };

    ws.onmessage = (event) => {
      try {
        const newData: AffectiveState[] = JSON.parse(event.data);
        setData(newData);
      } catch (err) {
        setError('Error parsing data');
      }
    };

    ws.onerror = (err) => {
      setError('WebSocket error');
      setLoading(false);
    };

    ws.onclose = () => {
      setLoading(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <AffectiveContext.Provider value={{ data, loading, error }}>
      {children}
    </AffectiveContext.Provider>
  );
};

export default AffectiveContext;
