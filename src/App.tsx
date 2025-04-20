import React from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { AlumniProfilePage } from './pages/AlumniProfilePage';
import { FeedPage } from './pages/FeedPage';

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/directory" 
        element={
          <ProtectedRoute>
            <DirectoryPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/alumni/:id" 
        element={
          <ProtectedRoute>
            <AlumniProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feed" 
        element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
