
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, Menu, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Career Paths', path: '/careers' },
    { name: 'Courses', path: '/courses' },
    { name: 'Job Opportunities', path: '/jobs' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-career-400 flex items-center justify-center">
            <span className="text-white font-bold">CP</span>
          </div>
          <span className="font-bold text-xl text-career-700">CareerPath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-600 hover:text-career-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-3/4 flex-col bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-4 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-lg font-medium"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link to="/profile" className="block mb-4 text-lg" onClick={toggleMenu}>
                <User className="inline-block mr-2 h-5 w-5" />
                Profile
              </Link>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  navigate('/login');
                  toggleMenu();
                }}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Button>
              <Button 
                className="w-full" 
                onClick={() => {
                  navigate('/register');
                  toggleMenu();
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};
