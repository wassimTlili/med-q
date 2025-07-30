'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Shield, 
  User, 
  Ban, 
  UserCheck, 
  Eye, 
  Calendar,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserPlus,
  Crown,
  Users as UsersIcon
} from 'lucide-react';

export default function UsersManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@medq.com',
      role: 'STUDENT',
      status: 'active',
      lastSignIn: '2024-01-20T10:30:00Z',
      createdAt: '2024-01-15T14:22:00Z',
      sessionsCount: 15,
      avatar: null,
      metadata: {
        university: 'Université Paris Descartes',
        year: '4ème année',
        completedRevisions: 23
      }
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'jean.martin@medq.com',
      role: 'STUDENT',
      status: 'active',
      lastSignIn: '2024-01-19T16:45:00Z',
      createdAt: '2024-01-10T09:15:00Z',
      sessionsCount: 28,
      avatar: null,
      metadata: {
        university: 'Université Lyon 1',
        year: '5ème année',
        completedRevisions: 45
      }
    },
    {
      id: 3,
      name: 'Dr. Sophie Laurent',
      email: 'sophie.laurent@medq.com',
      role: 'ADMIN',
      status: 'active',
      lastSignIn: '2024-01-20T08:15:00Z',
      createdAt: '2024-01-01T12:00:00Z',
      sessionsCount: 52,
      avatar: null,
      metadata: {
        department: 'Administration',
        permissions: ['manage_users', 'manage_content', 'view_analytics']
      }
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      email: 'lucas.bernard@medq.com',
      role: 'STUDENT',
      status: 'banned',
      lastSignIn: '2024-01-18T14:20:00Z',
      createdAt: '2024-01-12T11:30:00Z',
      sessionsCount: 8,
      avatar: null,
      metadata: {
        university: 'Université Bordeaux',
        year: '3ème année',
        completedRevisions: 12,
        banReason: 'Inappropriate behavior'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    console.log(`Changed user ${userId} role to ${newRole}`);
    // Here you would integrate with Better-Auth API
    // await auth.admin.updateUserRole(userId, newRole);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    console.log(`Changed user ${userId} status to ${newStatus}`);
    // Here you would integrate with Better-Auth API
    // await auth.admin.updateUserStatus(userId, newStatus);
  };

  const handleImpersonateUser = (userId) => {
    console.log(`Impersonating user ${userId}`);
    // Here you would integrate with Better-Auth impersonation
    // await auth.admin.impersonate(userId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleIcon = (role) => {
    return role === 'ADMIN' ? Crown : User;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'banned': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
              <p className="text-gray-600">Manage user accounts and permissions with Better-Auth integration</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'STUDENT').length}
                </p>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'ADMIN').length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => {
                    const lastSignIn = new Date(u.lastSignIn);
                    const today = new Date();
                    return lastSignIn.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="ADMIN">Admins</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sign In</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </p>
                            {user.metadata?.university && (
                              <p className="text-xs text-gray-400">{user.metadata.university}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <RoleIcon className={`h-4 w-4 mr-2 ${user.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'}`} />
                          <span className={`text-sm font-medium ${user.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'}`}>
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {user.status === 'banned' && <XCircle className="h-3 w-3 mr-1" />}
                          {user.status === 'inactive' && <Clock className="h-3 w-3 mr-1" />}
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(user.lastSignIn)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {user.sessionsCount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserDetails(true);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {user.role === 'STUDENT' && (
                            <button
                              onClick={() => handleRoleChange(user.id, 'ADMIN')}
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Promote to Admin"
                            >
                              <Crown className="h-4 w-4" />
                            </button>
                          )}
                          
                          {user.role === 'ADMIN' && user.id !== 1 && (
                            <button
                              onClick={() => handleRoleChange(user.id, 'STUDENT')}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Demote to Student"
                            >
                              <User className="h-4 w-4" />
                            </button>
                          )}
                          
                          {user.status === 'active' ? (
                            <button
                              onClick={() => handleStatusChange(user.id, 'banned')}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Ban User"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(user.id, 'active')}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Unban User"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleImpersonateUser(user.id)}
                            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Impersonate User"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                          
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Users will appear here as they register.'
                }
              </p>
            </div>
          )}
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowUserDetails(false)}></div>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                  <p className="text-sm text-gray-500">Complete information about {selectedUser.name}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xl mr-6">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      <div className="flex items-center mt-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">{selectedUser.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Account Information</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="text-gray-900">{formatDate(selectedUser.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Sign In:</span>
                          <span className="text-gray-900">{formatDate(selectedUser.lastSignIn)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Sessions:</span>
                          <span className="text-gray-900">{selectedUser.sessionsCount}</span>
                        </div>
                      </div>
                    </div>

                    {selectedUser.metadata && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h5>
                        <div className="space-y-2 text-sm">
                          {selectedUser.metadata.university && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">University:</span>
                              <span className="text-gray-900">{selectedUser.metadata.university}</span>
                            </div>
                          )}
                          {selectedUser.metadata.year && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Year:</span>
                              <span className="text-gray-900">{selectedUser.metadata.year}</span>
                            </div>
                          )}
                          {selectedUser.metadata.completedRevisions !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Completed:</span>
                              <span className="text-gray-900">{selectedUser.metadata.completedRevisions} revisions</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedUser.metadata?.banReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        <h5 className="text-sm font-medium text-red-800">Ban Reason</h5>
                      </div>
                      <p className="text-sm text-red-700 mt-1">{selectedUser.metadata.banReason}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
