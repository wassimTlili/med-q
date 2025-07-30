'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X,
  BookOpen,
  Palette,
  Smile,
  Heart,
  Star,
  Brain,
  Zap,
  Target,
  Shield,
  Award,
  Users,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Cardiologie',
      description: 'Étude du système cardiovasculaire',
      icon: '❤️',
      color: 'red',
      subSubjectsCount: 12,
      revisionsCount: 45,
      studentsEnrolled: 234,
      status: 'active'
    },
    {
      id: 2,
      name: 'Neurologie',
      description: 'Étude du système nerveux',
      icon: '🧠',
      color: 'purple',
      subSubjectsCount: 8,
      revisionsCount: 32,
      studentsEnrolled: 156,
      status: 'active'
    },
    {
      id: 3,
      name: 'Pneumologie',
      description: 'Étude du système respiratoire',
      icon: '🫁',
      color: 'blue',
      subSubjectsCount: 6,
      revisionsCount: 28,
      studentsEnrolled: 98,
      status: 'draft'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📚');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  const icons = ['📚', '❤️', '🧠', '🫁', '🦴', '👁️', '👂', '🦷', '💊', '🩺', '🔬', '🧬', '🩹', '🏥', '⚕️'];
  const colors = [
    { name: 'blue', value: '#3B82F6', bg: 'bg-blue-500' },
    { name: 'red', value: '#EF4444', bg: 'bg-red-500' },
    { name: 'green', value: '#10B981', bg: 'bg-green-500' },
    { name: 'purple', value: '#8B5CF6', bg: 'bg-purple-500' },
    { name: 'orange', value: '#F59E0B', bg: 'bg-orange-500' },
    { name: 'pink', value: '#EC4899', bg: 'bg-pink-500' },
    { name: 'indigo', value: '#6366F1', bg: 'bg-indigo-500' },
    { name: 'teal', value: '#14B8A6', bg: 'bg-teal-500' }
  ];

  const handleCreateSubject = () => {
    if (!formData.name.trim()) return;

    const newSubject = {
      id: subjects.length + 1,
      name: formData.name,
      description: formData.description,
      icon: selectedIcon,
      color: selectedColor,
      subSubjectsCount: 0,
      revisionsCount: 0,
      studentsEnrolled: 0,
      status: formData.status
    };

    setSubjects([...subjects, newSubject]);
    resetForm();
    setShowCreateModal(false);
  };

  const handleEditSubject = () => {
    if (!formData.name.trim()) return;

    setSubjects(subjects.map(subject => 
      subject.id === editingSubject.id 
        ? {
            ...subject,
            name: formData.name,
            description: formData.description,
            icon: selectedIcon,
            color: selectedColor,
            status: formData.status
          }
        : subject
    ));
    resetForm();
    setShowEditModal(false);
    setEditingSubject(null);
  };

  const handleDeleteSubject = (id) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description,
      status: subject.status
    });
    setSelectedIcon(subject.icon);
    setSelectedColor(subject.color);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'active'
    });
    setSelectedIcon('📚');
    setSelectedColor('blue');
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'border-blue-200 bg-blue-50',
      red: 'border-red-200 bg-red-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50',
      orange: 'border-orange-200 bg-orange-50',
      pink: 'border-pink-200 bg-pink-50',
      indigo: 'border-indigo-200 bg-indigo-50',
      teal: 'border-teal-200 bg-teal-50'
    };
    return colorMap[color] || 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects Management</h1>
              <p className="text-gray-600">Manage medical subjects and their configurations</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Subject
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all duration-200 hover:shadow-md ${getColorClass(subject.color)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{subject.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(subject)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSubject(subject.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{subject.subSubjectsCount}</p>
                  <p className="text-xs text-gray-500">Sub-subjects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{subject.revisionsCount}</p>
                  <p className="text-xs text-gray-500">Revisions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{subject.studentsEnrolled}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  subject.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subject.status === 'active' ? 'Active' : 'Draft'}
                </span>
                <div className={`w-4 h-4 rounded-full ${colors.find(c => c.name === subject.color)?.bg}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Create New Subject</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter subject name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter subject description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setSelectedIcon(icon)}
                          className={`p-3 text-2xl rounded-lg border-2 hover:border-purple-300 transition-colors ${
                            selectedIcon === icon ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            selectedColor === color.name ? 'border-purple-500' : 'border-gray-200'
                          }`}
                        >
                          <div className={`w-full h-6 rounded ${color.bg}`}></div>
                          <p className="text-xs mt-1 capitalize">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Preview */}
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                    <div className={`p-4 rounded-lg border-2 ${getColorClass(selectedColor)}`}>
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{selectedIcon}</div>
                        <div>
                          <h3 className="font-semibold">{formData.name || 'Subject Name'}</h3>
                          <p className="text-sm text-gray-600">{formData.description || 'Subject description'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateSubject}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Create Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingSubject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Subject</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setSelectedIcon(icon)}
                          className={`p-3 text-2xl rounded-lg border-2 hover:border-purple-300 transition-colors ${
                            selectedIcon === icon ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            selectedColor === color.name ? 'border-purple-500' : 'border-gray-200'
                          }`}
                        >
                          <div className={`w-full h-6 rounded ${color.bg}`}></div>
                          <p className="text-xs mt-1 capitalize">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Preview */}
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                    <div className={`p-4 rounded-lg border-2 ${getColorClass(selectedColor)}`}>
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{selectedIcon}</div>
                        <div>
                          <h3 className="font-semibold">{formData.name || 'Subject Name'}</h3>
                          <p className="text-sm text-gray-600">{formData.description || 'Subject description'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSubject}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Update Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first subject.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                Create Subject
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
