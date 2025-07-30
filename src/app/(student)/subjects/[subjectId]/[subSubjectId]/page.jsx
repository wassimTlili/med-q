import { mockSubjects } from '../../../../../lib/mockData';
import Link from 'next/link';
import { ChevronRight, Clock, Target, FileText, Stethoscope, Play } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function SubSubjectPage({ params }) {
  const subject = mockSubjects.find(s => s.id === params.subjectId);
  
  if (!subject) {
    notFound();
  }

  const subSubject = subject.subSubjects.find(ss => ss.id === params.subSubjectId);
  
  if (!subSubject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/subjects" className="hover:text-purple-600">Subjects</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/subjects/${subject.id}`} className="hover:text-purple-600">{subject.name}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{subSubject.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{subject.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subSubject.name}</h1>
              <p className="text-gray-600">{subject.name}</p>
            </div>
          </div>
          <p className="text-gray-700">{subSubject.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Révisions</p>
                <p className="text-2xl font-bold text-gray-900">{subSubject.revisions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">QCM</p>
                <p className="text-2xl font-bold text-blue-600">
                  {subSubject.revisions.reduce((acc, rev) => acc + rev.qcmCount, 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cas Cliniques</p>
                <p className="text-2xl font-bold text-green-600">
                  {subSubject.revisions.reduce((acc, rev) => acc + rev.clinicalCount, 0)}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Revisions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Révisions disponibles</h2>
          
          {subSubject.revisions.map((revision) => (
            <div key={revision.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{revision.title}</h3>
                  <p className="text-gray-600 mb-4">{revision.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {revision.qcmCount} QCM
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {revision.crocsCount} CROCS
                    </div>
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      {revision.clinicalCount} Cas cliniques
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {revision.estimatedTime}
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/revision/${revision.id}`}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Commencer
                </Link>
              </div>
            </div>
          ))}
        </div>

        {subSubject.revisions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune révision disponible</h3>
            <p className="text-gray-500">Les révisions pour ce sous-sujet seront bientôt disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
