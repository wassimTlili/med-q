import { mockSubjects, mockQCMQuestions, mockCROCSProblems, mockClinicalProblems } from '../../../../lib/mockData';
import { Target, FileText, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function RevisionPage({ params }) {
  // Find the revision from all subjects
  let revision = null;
  let subject = null;
  let subSubject = null;

  for (const s of mockSubjects) {
    for (const ss of s.subSubjects) {
      const r = ss.revisions.find(rev => rev.id === params.revisionId);
      if (r) {
        revision = r;
        subject = s;
        subSubject = ss;
        break;
      }
    }
    if (revision) break;
  }

  if (!revision) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Link href="/subjects" className="hover:text-purple-600">Matières</Link>
            <span className="mx-2">/</span>
            <Link href={`/subjects/${subject.id}`} className="hover:text-purple-600">{subject.name}</Link>
            <span className="mx-2">/</span>
            <span>{subSubject.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{revision.title}</h1>
          <p className="text-gray-600">Choisissez votre mode de révision</p>
        </div>

        {/* Revision Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* QCM */}
          <Link
            href={`/revision/${revision.id}/qcm`}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                {revision.qcmCount} questions
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              QCM
            </h3>
            <p className="text-gray-600 mb-4">
              Questions à choix multiples pour tester vos connaissances théoriques
            </p>
            <div className="text-sm text-gray-500">
              <p>• Questions à choix unique ou multiple</p>
              <p>• Explications détaillées</p>
              <p>• Score instantané</p>
            </div>
          </Link>

          {/* CROCS */}
          <Link
            href={`/revision/${revision.id}/crocs`}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                {revision.crocsCount} problèmes
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              CROCS
            </h3>
            <p className="text-gray-600 mb-4">
              Cas cliniques orientés pour l'analyse diagnostique
            </p>
            <div className="text-sm text-gray-500">
              <p>• Scénarios cliniques réalistes</p>
              <p>• Analyse par items</p>
              <p>• Méthodologie diagnostique</p>
            </div>
          </Link>

          {/* Clinical Cases */}
          <Link
            href={`/revision/${revision.id}/clinical`}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <Stethoscope className="h-8 w-8 text-purple-600" />
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
                {revision.clinicalCount} cas
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              Cas cliniques
            </h3>
            <p className="text-gray-600 mb-4">
              Simulations complètes de consultations médicales
            </p>
            <div className="text-sm text-gray-500">
              <p>• Patients virtuels</p>
              <p>• Examens complémentaires</p>
              <p>• Prise en charge globale</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de cette révision</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{revision.qcmCount}</div>
              <div className="text-sm text-gray-600">Questions QCM</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">{revision.crocsCount}</div>
              <div className="text-sm text-gray-600">Problèmes CROCS</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">{revision.clinicalCount}</div>
              <div className="text-sm text-gray-600">Cas cliniques</div>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Conseils de révision</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Commencez par les QCM pour réviser les bases théoriques</p>
            <p>• Passez aux CROCS pour appliquer vos connaissances</p>
            <p>• Terminez par les cas cliniques pour une approche globale</p>
            <p>• Prenez le temps de lire les explications après chaque réponse</p>
          </div>
        </div>
      </div>
    </div>
  );
}
