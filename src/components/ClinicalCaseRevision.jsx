import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, Stethoscope, Users, AlertCircle } from 'lucide-react';

const ClinicalQuestion = ({ question, onAnswer, selectedAnswer, showResult = false }) => {
  const [localSelected, setLocalSelected] = useState(selectedAnswer);

  const handleOptionClick = (optionId) => {
    if (showResult) return;
    setLocalSelected(optionId);
    onAnswer(optionId);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-medium mb-4">{question.question}</h4>
        <div className="space-y-2">
          {question.options.map((option) => {
            let buttonClass = "w-full p-3 text-left border rounded-lg transition-all duration-200 ";
            
            if (showResult) {
              const isCorrect = option.id === question.correctAnswer;
              const isSelected = localSelected === option.id;
              
              if (isCorrect) {
                buttonClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200";
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400";
              }
            } else {
              if (option.id === localSelected) {
                buttonClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
              } else {
                buttonClass += "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700";
              }
            }

            return (
              <button
                key={option.id}
                className={buttonClass}
                onClick={() => handleOptionClick(option.id)}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <div className="flex items-center space-x-2">
                    {showResult && option.id === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {showResult && localSelected === option.id && option.id !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showResult && question.explanation && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            <strong>Explication :</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

const PatientInfo = ({ patient }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Users className="h-5 w-5" />
        <span>Informations patient</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Âge</p>
          <p className="font-semibold">{patient.age} ans</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Sexe</p>
          <p className="font-semibold">{patient.gender}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Antécédents</p>
          <p className="font-semibold">{patient.medicalHistory || 'Aucun'}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Traitements</p>
          <p className="font-semibold">{patient.currentTreatments || 'Aucun'}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ClinicalCaseRevision = ({ cases, onComplete, title = "Cas cliniques de révision" }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentCase = cases[currentCaseIndex];
  const progress = ((currentCaseIndex + 1) / cases.length) * 100;
  const isLastCase = currentCaseIndex === cases.length - 1;
  
  // Check if all questions in current case are answered
  const allQuestionsAnswered = currentCase?.questions.every(q => 
    answers[`${currentCase.id}-${q.id}`] !== undefined
  );

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentCase.id}-${questionId}`]: answer
    }));
  };

  const handleNext = () => {
    if (isLastCase) {
      setShowResults(true);
      if (onComplete) {
        const score = calculateScore();
        onComplete({ answers, score, timeSpent });
      }
    } else {
      setCurrentCaseIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    cases.forEach(caseItem => {
      caseItem.questions.forEach(question => {
        total++;
        const answerKey = `${caseItem.id}-${question.id}`;
        const userAnswer = answers[answerKey];
        
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      });
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  if (showResults) {
    const score = calculateScore();
    let correctAnswers = 0;
    let totalQuestions = 0;

    cases.forEach(caseItem => {
      caseItem.questions.forEach(question => {
        totalQuestions++;
        const answerKey = `${caseItem.id}-${question.id}`;
        const userAnswer = answers[answerKey];
        
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      });
    });

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Résultats des cas cliniques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold">
                <Badge variant={getScoreColor(score)} className="text-2xl px-6 py-3">
                  {score}%
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bonnes réponses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Erreurs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.reload()} variant="outline">
                Recommencer
              </Button>
              <Button onClick={() => setShowResults(false)} className="btn-medical">
                Revoir les réponses
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review all cases */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Correction détaillée</h3>
          {cases.map((caseItem, index) => (
            <Card key={caseItem.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5" />
                  <span>Cas clinique {index + 1}: {caseItem.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <PatientInfo patient={caseItem.patient} />

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Présentation clinique :</h4>
                  <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                    {caseItem.presentation}
                  </p>
                </div>

                {caseItem.examinations && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Examens complémentaires :
                    </h4>
                    <p className="text-yellow-900 dark:text-yellow-100 leading-relaxed">
                      {caseItem.examinations}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {caseItem.questions.map((question) => (
                    <ClinicalQuestion
                      key={question.id}
                      question={question}
                      selectedAnswer={answers[`${caseItem.id}-${question.id}`]}
                      showResult={true}
                      onAnswer={() => {}}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Cas {currentCaseIndex + 1} sur {cases.length}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Current Case */}
      {currentCase && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Cas clinique {currentCaseIndex + 1}: {currentCase.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PatientInfo patient={currentCase.patient} />

              {/* Clinical Presentation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Présentation clinique :</h4>
                <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                  {currentCase.presentation}
                </p>
              </div>

              {/* Additional Examinations */}
              {currentCase.examinations && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Examens complémentaires :
                  </h4>
                  <p className="text-yellow-900 dark:text-yellow-100 leading-relaxed">
                    {currentCase.examinations}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentCase.questions.map((question) => (
                <ClinicalQuestion
                  key={question.id}
                  question={question}
                  selectedAnswer={answers[`${currentCase.id}-${question.id}`]}
                  onAnswer={(answer) => handleAnswer(question.id, answer)}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentCaseIndex === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Précédent</span>
            </Button>

            <div className="text-center">
              <Badge variant="outline">
                {Object.keys(answers).length} réponses données
              </Badge>
            </div>

            <Button
              onClick={handleNext}
              disabled={!allQuestionsAnswered}
              className="btn-medical flex items-center space-x-2"
            >
              <span>{isLastCase ? 'Terminer' : 'Suivant'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ClinicalCaseRevision, ClinicalQuestion };
