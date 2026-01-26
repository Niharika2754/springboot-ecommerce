/**
 * Main App Component
 * ECommerce Application - Sets up routing and context providers
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/index.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';
import Login from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';
import Home from './pages/Home/index.tsx';
import ProductDetail from './pages/ProductDetail/index.tsx';
import AddProduct from './pages/AddProduct/index.tsx';
import { ROUTES } from './constants/index.ts';

/**
 * App component - Root component of the ecommerce application
 * Provides routing and authentication context
 */
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Protected route */}
          <Route path={ROUTES.HOME} element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PRODUCT_DETAIL} element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.ADD_PRODUCT} element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Catch all - redirect to home */}
          <Route path="*" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
