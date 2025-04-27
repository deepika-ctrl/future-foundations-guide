
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect from Index to Home
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
