'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">M</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Med-Q</h1>
        <p className="text-gray-600">Redirection vers le tableau de bord...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredSubjects = mockSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  if (selectedSubject) {
    return (
      <Layout user={mockUser}>
        <div className="space-y-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => setSelectedSubject(null)}
            className="mb-4"
          >
            ← Retour aux matières
          </Button>

          {/* Subject header */}
          <div className="text-center space-y-4">
            <div className="text-6xl">{selectedSubject.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubject.name}
            </h1>
          </div>

          {/* Sub-subjects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedSubject.subSubjects.map((subSubject) => (
              <Card key={subSubject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{subSubject.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {subSubject.revisions.map((revision) => (
                      <div key={revision.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">{revision.title}</h4>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>{revision.qcmCount} QCM</span>
                          <span>{revision.crocsCount} CROCS</span>
                          <span>{revision.clinicalCount} Clinique</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full btn-medical">
                    Commencer la révision
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={mockUser}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Plateforme de révision médicale
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Révisez efficacement avec nos QCM, CROCS et cas cliniques interactifs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 mb-2" />
                <div className="ml-4">
                  <p className="text-blue-100">Matières</p>
                  <p className="text-2xl font-bold">{mockSubjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 mb-2" />
                <div className="ml-4">
                  <p className="text-green-100">QCM complétés</p>
                  <p className="text-2xl font-bold">157</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 mb-2" />
                <div className="ml-4">
                  <p className="text-purple-100">Score moyen</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 mb-2" />
                <div className="ml-4">
                  <p className="text-orange-100">Temps total</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une matière..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            const progress = getSubjectProgress(subject.id);
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={progress}
                onClick={() => handleSubjectClick(subject)}
              />
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="mb-6 text-purple-100">
            Choisissez votre mode de révision préféré et commencez à améliorer vos connaissances médicales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              QCM Rapide
            </Button>
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              CROCS du jour
            </Button>
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              Cas clinique
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
