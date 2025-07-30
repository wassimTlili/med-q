'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  FileText,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Subjects', href: '/admin/subjects', icon: BookOpen },
    { name: 'Sub-subjects', href: '/admin/sub-subjects', icon: FolderOpen },
    { name: 'Revisions', href: '/admin/revisions', icon: FileText },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
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
          <div className={`flex items-center border-b border-gray-200 ${sidebarCollapsed ? 'justify-center p-4' : 'justify-between p-4'}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Med-Q</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
            )}
            
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                {/* Desktop collapse button */}
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:block p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'px-3 py-4' : 'px-4 py-4'}`}>
            <div className="space-y-2">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 group ${
                      active
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <item.icon className={`${sidebarCollapsed ? 'h-6 w-6' : 'h-5 w-5'} ${
                      active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                    } ${!sidebarCollapsed ? 'mr-3' : ''} transition-all duration-300`} />
                    {!sidebarCollapsed && item.name}
                    {!sidebarCollapsed && active && (
                      <div className="ml-auto h-2 w-2 bg-white rounded-full opacity-80"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Admin Profile Section */}
          <div className={`border-t border-gray-200 ${sidebarCollapsed ? 'p-3' : 'p-4'}`}>
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@medq.com</p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-500 transition-all duration-200" />
                  Logout
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <Link
                  href="/"
                  className="flex items-center justify-center p-3 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                  title="Logout"
                >
                  <LogOut className="h-6 w-6 text-gray-400 hover:text-red-500 transition-all duration-200" />
                </Link>
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
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Med-Q Admin</span>
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
