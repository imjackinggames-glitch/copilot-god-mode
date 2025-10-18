import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AgentStudioPage from './pages/AgentStudioPage';
import WorkflowCanvasPage from './pages/WorkflowCanvasPage';
import ValidationPage from './pages/ValidationPage';
import ExportPage from './pages/ExportPage';
import SettingsPage from './pages/SettingsPage';

// Components
import { Toaster } from './components/ui/toaster';
import LoadingScreen from './components/LoadingScreen';

// Store
import { useOnboardingStore } from './store/onboarding';
import { useDockerStore } from './store/docker';

function App() {
  const [loading, setLoading] = useState(true);
  const { completed } = useOnboardingStore();
  const { checkStatus } = useDockerStore();

  useEffect(() => {
    // Inicialização do app
    const init = async () => {
      try {
        // Verificar status do Docker
        await checkStatus();

        // Simular carregamento inicial
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [checkStatus]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="h-screen w-full bg-background text-foreground overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Onboarding */}
            <Route
              path="/onboarding"
              element={
                completed ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <OnboardingPage />
                  </motion.div>
                )
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                !completed ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <DashboardPage />
                  </motion.div>
                )
              }
            />

            {/* Agent Studio */}
            <Route
              path="/agents"
              element={
                !completed ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    <AgentStudioPage />
                  </motion.div>
                )
              }
            />

            {/* Workflow Canvas */}
            <Route
              path="/workflow"
              element={
                !completed ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full"
                  >
                    <WorkflowCanvasPage />
                  </motion.div>
                )
              }
            />

            {/* Validation */}
            <Route
              path="/validation"
              element={
                !completed ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full"
                  >
                    <ValidationPage />
                  </motion.div>
                )
              }
            />

            {/* Export */}
            <Route
              path="/export"
              element={
                !completed ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <ExportPage />
                  </motion.div>
                )
              }
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <SettingsPage />
                </motion.div>
              }
            />

            {/* Default redirect */}
            <Route
              path="/"
              element={
                <Navigate to={completed ? "/dashboard" : "/onboarding"} replace />
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <Navigate to={completed ? "/dashboard" : "/onboarding"} replace />
              }
            />
          </Routes>
        </AnimatePresence>

        {/* Global Toast Notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
