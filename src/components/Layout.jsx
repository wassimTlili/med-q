import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Menu, User, LogOut, Settings } from 'lucide-react';

const Navigation = ({ user, onThemeToggle, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                QCM
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Accueil
            </Button>
            <Button variant="ghost" size="sm">
              Tableau de révision
            </Button>
            <Button variant="ghost" size="sm">
              QCM
            </Button>
            <Button variant="ghost" size="sm">
              Flash Cards
            </Button>
            <Button variant="ghost" size="sm">
              Examen
            </Button>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="h-9 w-9"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:block">{user?.name || 'Utilisateur'}</span>
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Accueil
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Tableau de révision
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              QCM
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Flash Cards
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Examen
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Layout = ({ children, user }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation 
        user={user} 
        onThemeToggle={toggleTheme} 
        isDark={isDark} 
      />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export { Layout, Navigation };
