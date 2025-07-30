'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  GripVertical,
  FileText,
  Heart,
  Brain,
  Activity
} from 'lucide-react';

export default function SubSubjectsManagement() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Cardiologie',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      expanded: true,
      subSubjects: [
        { id: 1, name: 'Anatomie cardiaque', order: 1, revisionsCount: 12 },
        { id: 2, name: 'Physiologie cardiaque', order: 2, revisionsCount: 8 },
        { id: 3, name: 'Pathologies coronariennes', order: 3, revisionsCount: 15 },
        { id: 4, name: 'Insuffisance cardiaque', order: 4, revisionsCount: 10 }
      ]
    },
    {
      id: 2,
      name: 'Neurologie',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      expanded: false,
      subSubjects: [
        { id: 5, name: 'Anatomie du système nerveux', order: 1, revisionsCount: 14 },
        { id: 6, name: 'Neurophysiologie', order: 2, revisionsCount: 9 },
        { id: 7, name: 'Pathologies neurologiques', order: 3, revisionsCount: 18 },
        { id: 8, name: 'Neuroimagerie', order: 4, revisionsCount: 7 }
      ]
    },
    {
      id: 3,
      name: 'Pneumologie',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      expanded: false,
      subSubjects: [
        { id: 9, name: 'Anatomie respiratoire', order: 1, revisionsCount: 8 },
        { id: 10, name: 'Physiologie respiratoire', order: 2, revisionsCount: 6 },
        { id: 11, name: 'Pathologies pulmonaires', order: 3, revisionsCount: 12 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [newSubSubject, setNewSubSubject] = useState({ name: '', parentSubjectId: '' });
  const [editingSubSubject, setEditingSubSubject] = useState(null);

  const toggleSubjectExpansion = (subjectId) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? { ...subject, expanded: !subject.expanded }
        : subject
    ));
  };

  const handleAddSubSubject = () => {
    if (newSubSubject.name.trim() && newSubSubject.parentSubjectId) {
      setSubjects(subjects.map(subject => {
        if (subject.id === parseInt(newSubSubject.parentSubjectId)) {
          const newSubSubjectObj = {
            id: Date.now(),
            name: newSubSubject.name,
            order: subject.subSubjects.length + 1,
            revisionsCount: 0
          };
          return {
            ...subject,
            subSubjects: [...subject.subSubjects, newSubSubjectObj]
          };
        }
        return subject;
      }));
      setNewSubSubject({ name: '', parentSubjectId: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteSubSubject = (subjectId, subSubjectId) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          subSubjects: subject.subSubjects.filter(sub => sub.id !== subSubjectId)
        };
      }
      return subject;
    }));
  };

  const handleEditSubSubject = (subjectId, subSubjectId, newName) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          subSubjects: subject.subSubjects.map(sub => 
            sub.id === subSubjectId ? { ...sub, name: newName } : sub
          )
        };
      }
      return subject;
    }));
    setEditingSubSubject(null);
  };

  const filteredSubjects = subjects.map(subject => ({
    ...subject,
    subSubjects: subject.subSubjects.filter(subSubject =>
      subSubject.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subSubjects.length > 0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sub-subjects Management</h1>
          <p className="text-gray-600">Organize and manage sub-subjects within each medical subject</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sub-subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-subject
            </button>
          </div>
        </div>

        {/* Subjects and Sub-subjects List */}
        <div className="space-y-4">
          {filteredSubjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Subject Header */}
                <div 
                  className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSubjectExpansion(subject.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${subject.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className={`h-5 w-5 ${subject.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.subSubjects.length} sub-subjects</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {subject.subSubjects.reduce((acc, sub) => acc + sub.revisionsCount, 0)} total revisions
                      </span>
                      {subject.expanded ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-subjects List */}
                {subject.expanded && (
                  <div className="p-6 pt-0">
                    {subject.subSubjects.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No sub-subjects yet</p>
                        <button 
                          onClick={() => {
                            setSelectedSubject(subject.id.toString());
                            setShowAddModal(true);
                          }}
                          className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          Add the first sub-subject
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {subject.subSubjects.map((subSubject) => (
                          <div key={subSubject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center">
                              <GripVertical className="h-4 w-4 text-gray-400 mr-3 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="flex-1">
                                {editingSubSubject === subSubject.id ? (
                                  <input
                                    type="text"
                                    defaultValue={subSubject.name}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    onBlur={(e) => handleEditSubSubject(subject.id, subSubject.id, e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        handleEditSubSubject(subject.id, subSubject.id, e.target.value);
                                      }
                                    }}
                                    autoFocus
                                  />
                                ) : (
                                  <div>
                                    <h4 className="font-medium text-gray-900">{subSubject.name}</h4>
                                    <p className="text-xs text-gray-500">{subSubject.revisionsCount} revisions</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingSubSubject(subSubject.id)}
                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubSubject(subject.id, subSubject.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sub-subjects found</h3>
            <p className="text-gray-500">Create subjects first, then add sub-subjects to organize your content.</p>
          </div>
        )}

        {/* Add Sub-subject Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Sub-subject</h3>
                  <p className="text-sm text-gray-500">Create a new sub-subject within a medical subject</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent Subject</label>
                    <select
                      value={selectedSubject || newSubSubject.parentSubjectId}
                      onChange={(e) => {
                        setNewSubSubject({ ...newSubSubject, parentSubjectId: e.target.value });
                        setSelectedSubject(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a subject...</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub-subject Name</label>
                    <input
                      type="text"
                      value={newSubSubject.name}
                      onChange={(e) => setNewSubSubject({ ...newSubSubject, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter sub-subject name..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedSubject('');
                      setNewSubSubject({ name: '', parentSubjectId: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSubSubject}
                    disabled={!newSubSubject.name.trim() || !newSubSubject.parentSubjectId}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Sub-subject
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
