import * as React from 'react';
import { AnimatePresence, motion } from "framer-motion";

// Views
import DashboardLayout from "./views/DashboardLayout";
import OrchestrationView from "./views/OrchestrationView";

// Components
import Header from "./components/header";
import AuditPanel from "./components/audit-panel";
import { PdfViewer } from "./components/pdf-viewer";

// Hooks & Context
import { useCentralController } from "./hooks/use-central-controller";
import { ControllerProvider } from "./contexts/controller-context";

const App = () => {
  return (
    <ControllerProvider>
      <AppContent />
    </ControllerProvider>
  );
};

const AppContent = () => {
  const { state } = useCentralController();

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      <Header />
      <div className="flex-grow w-full max-w-viewport mx-auto grid grid-cols-12 gap-8 px-4 sm:px-8">
        
        {/* Left Rail PDF Viewer */}
        <AnimatePresence>
          {state.activeFramework && (
            <motion.aside
              className="hidden xl:block xl:col-span-3 py-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="h-full sticky top-24">
                <PdfViewer framework={state.activeFramework} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main
          className={`py-8 min-w-0 transition-all duration-300 ease-in-out ${
            state.activeFramework
              ? 'col-span-12 lg:col-span-9 xl:col-span-6'
              : 'col-span-12'
          }`}
        >
          <DashboardLayout>
            <OrchestrationView />
          </DashboardLayout>
        </main>

        {/* Right Rail Audit Panel */}
        <aside className="hidden lg:block lg:col-span-3 py-8">
          <div className="h-full sticky top-24">
            <AuditPanel logs={state.logs} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
