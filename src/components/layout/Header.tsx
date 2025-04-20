import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  LogOut, 
  Settings, 
  User
} from 'lucide-react';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onClick={closeMenus}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1E40AF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="m4 6 8-4 8 4"/>
              <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/>
              <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/>
              <path d="M18 5v17"/>
              <path d="M6 5v17"/>
              <circle cx="12" cy="9" r="2"/>
            </svg>
            <span className="text-xl font-bold text-primary-600">
              AlumniConnect
            </span>
          </Link>
          
          {isAuthenticated && (
            <nav className="ml-8 hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-medium transition-colors hover:text-primary-600',
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      )
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/directory"
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-medium transition-colors hover:text-primary-600',
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      )
                    }
                  >
                    Directory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-medium transition-colors hover:text-primary-600',
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      )
                    }
                  >
                    Community Feed
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/events"
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-medium transition-colors hover:text-primary-600',
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      )
                    }
                  >
                    Events
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <button 
                className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="relative ml-4 hidden md:block">
                <button
                  type="button"
                  className="flex items-center space-x-2 rounded-full"
                  onClick={toggleProfileMenu}
                >
                  <Avatar 
                    src={user?.avatar} 
                    name={user?.name} 
                    size="sm" 
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenus}
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenus}
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <button
                        className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/login'}
              >
                Log In
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="border-b border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-2">
            <NavLink
              to="/dashboard"
              className={cn(
                'block rounded-md px-3 py-2 text-base font-medium',
                isActive('/dashboard')
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={closeMenus}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/directory"
              className={cn(
                'block rounded-md px-3 py-2 text-base font-medium',
                isActive('/directory')
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={closeMenus}
            >
              Directory
            </NavLink>
            <NavLink
              to="/feed"
              className={cn(
                'block rounded-md px-3 py-2 text-base font-medium',
                isActive('/feed')
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={closeMenus}
            >
              Community Feed
            </NavLink>
            <NavLink
              to="/events"
              className={cn(
                'block rounded-md px-3 py-2 text-base font-medium',
                isActive('/events')
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={closeMenus}
            >
              Events
            </NavLink>
            
            <div className="my-2 border-t border-gray-200 pt-2">
              <NavLink
                to="/profile"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                onClick={closeMenus}
              >
                Profile
              </NavLink>
              <NavLink
                to="/settings"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                onClick={closeMenus}
              >
                Settings
              </NavLink>
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Helper function for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}