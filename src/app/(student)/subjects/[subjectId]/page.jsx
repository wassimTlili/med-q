import { mockSubjects, getRevisionProgress } from '../../../../lib/mockData';
import Link from 'next/link';
import { ChevronRight, Clock, Target, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function SubjectPage({ params }) {
  const subject = mockSubjects.find(s => s.id === params.subjectId);
  
  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{subject.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
              <p className="text-gray-600">Explorez les différents chapitres et révisions</p>
            </div>
          </div>
        </div>

        {/* Sub-subjects Grid */}
        <div className="space-y-8">
          {subject.subSubjects.map((subSubject) => (
            <div key={subSubject.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{subSubject.name}</h2>
                <Link
                  href={`/subjects/${subject.id}/${subSubject.id}`}
                  className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  Voir tout
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subSubject.revisions.map((revision) => {
                  const progress = getRevisionProgress(revision.id);
                  
                  return (
                    <Link
                      key={revision.id}
                      href={`/revision/${revision.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                          {revision.title}
                        </h3>
                        <div className={`w-3 h-3 rounded-full ${
                          progress.completionRate === 100 
                            ? 'bg-green-500' 
                            : progress.completionRate > 0 
                            ? 'bg-orange-500' 
                            : 'bg-gray-300'
                        }`}></div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="h-4 w-4 mr-2" />
                          {revision.qcmCount} QCM
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {revision.crocsCount} CROCS
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {revision.clinicalCount} Cas cliniques
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progression</span>
                          <span>{progress.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress.completionRate}%` }}
                          ></div>
                        </div>
                      </div>

                      {progress.lastAccessed && (
                        <p className="text-xs text-gray-500">
                          Dernière visite: {new Date(progress.lastAccessed).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
