import { mockSubjects, mockProgress } from '../../../lib/mockData';
import Link from 'next/link';
import { Clock, Target, FileText, Stethoscope, ChevronRight } from 'lucide-react';

export default function RevisionsPage() {
  // Get all revisions with their progress
  const allRevisions = [];
  
  mockSubjects.forEach(subject => {
    subject.subSubjects.forEach(subSubject => {
      subSubject.revisions.forEach(revision => {
        const progress = mockProgress[revision.id] || { completionRate: 0, lastAccessed: null };
        allRevisions.push({
          ...revision,
          subject: subject.name,
          subSubject: subSubject.name,
          subjectId: subject.id,
          subSubjectId: subSubject.id,
          progress,
          icon: subject.icon
        });
      });
    });
  });

  // Sort by last accessed (most recent first)
  allRevisions.sort((a, b) => {
    if (!a.progress.lastAccessed && !b.progress.lastAccessed) return 0;
    if (!a.progress.lastAccessed) return 1;
    if (!b.progress.lastAccessed) return -1;
    return new Date(b.progress.lastAccessed) - new Date(a.progress.lastAccessed);
  });

  const recentRevisions = allRevisions.filter(r => r.progress.lastAccessed).slice(0, 5);
  const inProgressRevisions = allRevisions.filter(r => r.progress.completionRate > 0 && r.progress.completionRate < 100);
  const completedRevisions = allRevisions.filter(r => r.progress.completionRate === 100);
  const notStartedRevisions = allRevisions.filter(r => r.progress.completionRate === 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes révisions</h1>
          <p className="text-gray-600">Suivez votre progression et reprenez vos révisions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{allRevisions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-green-600">{completedRevisions.length}</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-orange-600">{inProgressRevisions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">À commencer</p>
                <p className="text-2xl font-bold text-gray-600">{notStartedRevisions.length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Recent Revisions */}
        {recentRevisions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Révisions récentes</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {recentRevisions.map((revision, index) => (
                <Link
                  key={revision.id}
                  href={`/revision/${revision.id}`}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                    index !== recentRevisions.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{revision.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{revision.title}</h3>
                      <p className="text-sm text-gray-600">{revision.subject} • {revision.subSubject}</p>
                      <p className="text-xs text-gray-500">
                        Dernière visite: {new Date(revision.progress.lastAccessed).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <div className="text-sm font-medium text-gray-900">{revision.progress.completionRate}%</div>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${revision.progress.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Revisions */}
        {inProgressRevisions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">En cours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressRevisions.map((revision) => (
                <Link
                  key={revision.id}
                  href={`/revision/${revision.id}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{revision.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{revision.title}</h3>
                        <p className="text-sm text-gray-600">{revision.subject}</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{revision.progress.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full"
                        style={{ width: `${revision.progress.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Revisions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Toutes les révisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allRevisions.map((revision) => (
              <Link
                key={revision.id}
                href={`/revision/${revision.id}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{revision.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{revision.title}</h3>
                      <p className="text-sm text-gray-600">{revision.subject}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    revision.progress.completionRate === 100 
                      ? 'bg-green-500' 
                      : revision.progress.completionRate > 0 
                      ? 'bg-orange-500' 
                      : 'bg-gray-300'
                  }`}></div>
                </div>
                
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Target className="h-3 w-3 mr-2" />
                    {revision.qcmCount} QCM
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-2" />
                    {revision.crocsCount} CROCS
                  </div>
                  <div className="flex items-center">
                    <Stethoscope className="h-3 w-3 mr-2" />
                    {revision.clinicalCount} Cas cliniques
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{revision.progress.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-purple-600 h-1.5 rounded-full"
                      style={{ width: `${revision.progress.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {revision.progress.lastAccessed && (
                  <p className="text-xs text-gray-500">
                    Dernière visite: {new Date(revision.progress.lastAccessed).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
