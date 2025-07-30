'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  FileText,
  Target,
  Stethoscope,
  Clock,
  CheckCircle,
  Circle,
  Heart,
  Brain,
  Activity
} from 'lucide-react';

export default function RevisionsManagement() {
  const [revisions, setRevisions] = useState([
    {
      id: 1,
      title: 'Anatomie cardiaque fondamentale',
      subSubject: 'Anatomie cardiaque',
      subject: 'Cardiologie',
      subjectIcon: Heart,
      subjectColor: 'text-red-500',
      qcmCount: 25,
      crocsCount: 8,
      clinicalCount: 3,
      status: 'published',
      lastModified: '2024-01-20',
      createdBy: 'Dr. Martin'
    },
    {
      id: 2,
      title: 'Insuffisance cardiaque - Diagnostic',
      subSubject: 'Insuffisance cardiaque',
      subject: 'Cardiologie',
      subjectIcon: Heart,
      subjectColor: 'text-red-500',
      qcmCount: 30,
      crocsCount: 12,
      clinicalCount: 5,
      status: 'draft',
      lastModified: '2024-01-18',
      createdBy: 'Dr. Laurent'
    },
    {
      id: 3,
      title: 'Neurophysiologie avancée',
      subSubject: 'Neurophysiologie',
      subject: 'Neurologie',
      subjectIcon: Brain,
      subjectColor: 'text-purple-500',
      qcmCount: 40,
      crocsCount: 15,
      clinicalCount: 8,
      status: 'published',
      lastModified: '2024-01-15',
      createdBy: 'Dr. Dubois'
    },
    {
      id: 4,
      title: 'Pathologies pulmonaires communes',
      subSubject: 'Pathologies pulmonaires',
      subject: 'Pneumologie',
      subjectIcon: Activity,
      subjectColor: 'text-blue-500',
      qcmCount: 35,
      crocsCount: 10,
      clinicalCount: 6,
      status: 'published',
      lastModified: '2024-01-12',
      createdBy: 'Dr. Bernard'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = ['Cardiologie', 'Neurologie', 'Pneumologie'];

  const filteredRevisions = revisions.filter(revision => {
    const matchesSearch = revision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revision.subSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revision.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || revision.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || revision.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleDeleteRevision = (id) => {
    setRevisions(revisions.filter(revision => revision.id !== id));
  };

  const handleToggleStatus = (id) => {
    setRevisions(revisions.map(revision => 
      revision.id === id 
        ? { ...revision, status: revision.status === 'published' ? 'draft' : 'published' }
        : revision
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Revisions Management</h1>
              <p className="text-gray-600">Create and manage medical revision content</p>
            </div>
            <Link
              href="/admin/revisions/create"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Revision
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search revisions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredRevisions.length} revision{filteredRevisions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Revisions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revision</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRevisions.map((revision) => {
                  const IconComponent = revision.subjectIcon;
                  return (
                    <tr key={revision.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <IconComponent className={`h-5 w-5 ${revision.subjectColor}`} />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{revision.title}</h3>
                            <p className="text-sm text-gray-500">{revision.subject} • {revision.subSubject}</p>
                            <p className="text-xs text-gray-400">by {revision.createdBy}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-4 text-sm">
                          <div className="flex items-center text-blue-600">
                            <Target className="h-4 w-4 mr-1" />
                            {revision.qcmCount} QCM
                          </div>
                          <div className="flex items-center text-green-600">
                            <FileText className="h-4 w-4 mr-1" />
                            {revision.crocsCount} CROCS
                          </div>
                          <div className="flex items-center text-purple-600">
                            <Stethoscope className="h-4 w-4 mr-1" />
                            {revision.clinicalCount} Clinical
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(revision.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            revision.status === 'published'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          {revision.status === 'published' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </>
                          ) : (
                            <>
                              <Circle className="h-3 w-3 mr-1" />
                              Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(revision.lastModified).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/revisions/${revision.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/revisions/${revision.id}/edit`}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteRevision(revision.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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

          {filteredRevisions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No revisions found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' || subjectFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by creating your first revision.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && subjectFilter === 'all' && (
                <Link
                  href="/admin/revisions/create"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Revision
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{revisions.length}</p>
              <p className="text-sm text-gray-600">Total Revisions</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {revisions.filter(r => r.status === 'published').length}
              </p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {revisions.filter(r => r.status === 'draft').length}
              </p>
              <p className="text-sm text-gray-600">Drafts</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {revisions.reduce((acc, r) => acc + r.qcmCount + r.crocsCount + r.clinicalCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
