import { mockSubjects, getSubjectProgress } from '../../../lib/mockData';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Matières</h1>
          <p className="text-gray-600">Explorez vos matières et suivez votre progression</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => {
            const progress = getSubjectProgress(subject.id);
            const completionPercentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
            
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{subject.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {subject.name}
                      </h3>
                    </div>
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

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{progress.completed} terminé</span>
                  <span>{progress.inProgress} en cours</span>
                  <span>{progress.total - progress.completed - progress.inProgress} à faire</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
