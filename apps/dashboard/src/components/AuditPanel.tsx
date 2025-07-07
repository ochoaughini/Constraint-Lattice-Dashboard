import React from 'react';

const AuditPanel: React.FC = () => {
  return (
    <div className="audit-panel bg-background-paper p-4 rounded-lg shadow-sm border border-ui-primary">
      <h3 className="text-lg font-medium text-text-primary mb-4">Audit Log</h3>
      <div className="space-y-2">
        <div className="text-sm text-text-secondary">
          No recent activity to display.
        </div>
      </div>
    </div>
  );
};

export default AuditPanel;
