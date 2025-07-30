import { mockSubjects, getSubjectProgress } from '../../../lib/mockData';
import Link from 'next/link';
import { BookOpen, Target, Clock, TrendingUp, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  // Calculate overall stats
  const totalRevisions = mockSubjects.reduce((acc, subject) => {
    return acc + subject.subSubjects.reduce((subAcc, subSubject) => subAcc + subSubject.revisions.length, 0);
  }, 0);

  const completedRevisions = mockSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.id);
    return acc + progress.completed;
  }, 0);

  const averageScore = Math.round((completedRevisions / totalRevisions) * 100) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord étudiant</h1>
          <p className="text-gray-600">Bonjour Étudiant Médecine, prêt pour vos révisions ?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Matières</p>
                <p className="text-3xl font-bold">{mockSubjects.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-green-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">QCM complétés</p>
                <p className="text-3xl font-bold">157</p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-purple-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Score moyen</p>
                <p className="text-3xl font-bold">{averageScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Temps total</p>
                <p className="text-3xl font-bold">24h</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Rechercher une matière..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockSubjects.map((subject) => {
            const progress = getSubjectProgress(subject.id);
            const completionPercentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
            
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{subject.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progression</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{progress.completed}</p>
                    <p className="text-gray-500">terminé</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{progress.inProgress}</p>
                    <p className="text-gray-500">en cours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-400">{progress.total - progress.completed - progress.inProgress}</p>
                    <p className="text-gray-500">à faire</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Revision Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Révisions rapides</h2>
            <p className="text-purple-100">Commencez une session de révision immédiatement</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/revision/qcm"
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors text-center"
            >
              QCM Rapide
            </Link>
            <Link
              href="/revision/crocs"
              className="bg-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors text-center"
            >
              CROCS du jour
            </Link>
            <Link
              href="/revision/clinical"
              className="bg-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors text-center"
            >
              Cas clinique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
