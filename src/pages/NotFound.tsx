
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-career-100 flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-career-400">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">
          We couldn't find the page you were looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/careers">Explore Careers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
