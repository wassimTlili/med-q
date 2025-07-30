'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  User, 
  Menu, 
  X, 
  Target,
  BarChart3,
  Settings,
  LogOut,
  Heart,
  Eye,
  Brain,
  Clock
} from 'lucide-react';

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home },
    { name: 'Matières', href: '/subjects', icon: BookOpen },
    { name: 'Mes révisions', href: '/revisions', icon: Clock },
    { name: 'Statistiques', href: '/stats', icon: BarChart3 },
    { name: 'Profil', href: '/profile', icon: User },
  ];

  const subjects = [
    { name: 'Cardiologie', href: '/subjects/cardiologie', icon: Heart, color: 'text-red-500' },
    { name: 'Ophtalmologie', href: '/subjects/ophtalmologie', icon: Eye, color: 'text-blue-500' },
    { name: 'Neurologie', href: '/subjects/neurologie', icon: Brain, color: 'text-purple-500' },
  ];

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:block ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      } w-64`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center border-b border-gray-200 ${sidebarCollapsed ? 'justify-center p-3' : 'justify-between p-4'}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Med-Q</span>
              </div>
            )}
            
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                {/* Desktop collapse button */}
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:block p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  title="Réduire la barre latérale"
                >
                  <Menu className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                </button>
                {/* Mobile close button */}
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            )}
            
            {sidebarCollapsed && (
              <div className="flex flex-col items-center space-y-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg p-2" onClick={() => setSidebarCollapsed(false)}>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div className="flex items-center justify-center w-8 h-4 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors">
                  <div className="flex space-x-0.5">
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User info */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white transition-all duration-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">Étudiant Médecine</p>
                  <p className="text-xs text-gray-500">student@medq.com</p>
                </div>
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="p-3 border-b border-gray-200 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white transition-all duration-300" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'px-2 py-4' : 'px-3 py-4'}`}>
            {/* Main navigation */}
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 group ${
                      active
                        ? 'bg-purple-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${sidebarCollapsed ? 'justify-center p-3' : 'px-3 py-3'}`}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <item.icon className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'} ${
                      active ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                    } ${!sidebarCollapsed ? 'mr-3' : ''} transition-all duration-300`} />
                    {!sidebarCollapsed && item.name}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            {!sidebarCollapsed && <div className="border-t border-gray-200 my-4"></div>}

            {/* Subjects quick access */}
            {!sidebarCollapsed && (
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Accès rapide matières
                </h3>
                <div className="space-y-1">
                  {subjects.map((subject) => {
                    const active = isActive(subject.href);
                    return (
                      <Link
                        key={subject.name}
                        href={subject.href}
                        className={`flex items-center px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                          active
                            ? 'bg-gray-100 text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <subject.icon className={`h-5 w-5 mr-3 ${subject.color} transition-all duration-300`} />
                        {subject.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Collapsed subjects - show only icons */}
            {sidebarCollapsed && (
              <div className="space-y-1 mt-4">
                <div className="border-t border-gray-200 mb-3"></div>
                {subjects.map((subject) => {
                  const active = isActive(subject.href);
                  return (
                    <Link
                      key={subject.name}
                      href={subject.href}
                      className={`flex items-center justify-center p-3 rounded-xl text-sm transition-all duration-200 ${
                        active
                          ? 'bg-gray-100 text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                      title={subject.name}
                    >
                      <subject.icon className={`h-7 w-7 ${subject.color} transition-all duration-300`} />
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className={`border-t border-gray-200 ${sidebarCollapsed ? 'p-3' : 'p-3'}`}>
            {!sidebarCollapsed ? (
              <div className="space-y-1">
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-400 transition-all duration-300" />
                  Paramètres
                </Link>
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400 transition-all duration-300" />
                  Déconnexion
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  href="/settings"
                  className="flex items-center justify-center p-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                  title="Paramètres"
                >
                  <Settings className="h-7 w-7 text-gray-400 transition-all duration-300" />
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center p-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                  title="Déconnexion"
                >
                  <LogOut className="h-7 w-7 text-gray-400 transition-all duration-300" />
                </Link>
                {/* Expand hint */}
                <div className="mt-3 pt-2 border-t border-gray-200 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg" onClick={() => setSidebarCollapsed(false)}>
                  <div className="w-6 h-1 bg-purple-300 rounded-full mb-1 mx-auto animate-pulse"></div>
                  <p className="text-xs text-purple-600 font-medium">Cliquer</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Med-Q</span>
            </div>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
