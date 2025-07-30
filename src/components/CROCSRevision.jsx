import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, FileText } from 'lucide-react';

const CROCSQuestion = ({ question, onAnswer, selectedAnswer, showResult = false }) => {
  const [localSelected, setLocalSelected] = useState(selectedAnswer);

  const handleOptionClick = (option) => {
    if (showResult) return;
    setLocalSelected(option);
    onAnswer(option);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">{question.question}</h4>
        <div className="grid grid-cols-5 gap-2">
          {question.options.map((option) => {
            let buttonClass = "p-2 text-center border rounded transition-all duration-200 ";
            
            if (showResult) {
              // Show correct/incorrect styling
              const isCorrect = question.correctAnswers?.includes(option);
              const isSelected = localSelected === option;
              
              if (isCorrect) {
                buttonClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200";
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400";
              }
            } else {
              if (option === localSelected) {
                buttonClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
              } else {
                buttonClass += "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700";
              }
            }

            return (
              <button
                key={option}
                className={buttonClass}
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
              >
                <div className="flex items-center justify-center">
                  <span className="font-medium">{option}</span>
                  {showResult && question.correctAnswers?.includes(option) && (
                    <CheckCircle className="h-4 w-4 text-green-600 ml-1" />
                  )}
                  {showResult && localSelected === option && !question.correctAnswers?.includes(option) && (
                    <XCircle className="h-4 w-4 text-red-600 ml-1" />
                  )}
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

const CROCSRevision = ({ problems, onComplete, title = "CROCS de révision" }) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentProblem = problems[currentProblemIndex];
  const progress = ((currentProblemIndex + 1) / problems.length) * 100;
  const isLastProblem = currentProblemIndex === problems.length - 1;
  
  // Check if all questions in current problem are answered
  const allQuestionsAnswered = currentProblem?.questions.every(q => 
    answers[`${currentProblem.id}-${q.id}`] !== undefined
  );

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentProblem.id}-${questionId}`]: answer
    }));
  };

  const handleNext = () => {
    if (isLastProblem) {
      setShowResults(true);
      if (onComplete) {
        const score = calculateScore();
        onComplete({ answers, score, timeSpent });
      }
    } else {
      setCurrentProblemIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    problems.forEach(problem => {
      problem.questions.forEach(question => {
        total++;
        const answerKey = `${problem.id}-${question.id}`;
        const userAnswer = answers[answerKey];
        const correctAnswer = problem.answers.find(a => a.questionId === question.id);
        
        if (correctAnswer && correctAnswer.correctAnswers.includes(userAnswer)) {
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

    problems.forEach(problem => {
      problem.questions.forEach(question => {
        totalQuestions++;
        const answerKey = `${problem.id}-${question.id}`;
        const userAnswer = answers[answerKey];
        const correctAnswer = problem.answers.find(a => a.questionId === question.id);
        
        if (correctAnswer && correctAnswer.correctAnswers.includes(userAnswer)) {
          correctAnswers++;
        }
      });
    });

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Résultats du CROCS</CardTitle>
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

        {/* Review all problems */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Correction détaillée</h3>
          {problems.map((problem, index) => (
            <Card key={problem.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Cas clinique {index + 1}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                    {problem.scenario}
                  </p>
                </div>

                <div className="space-y-4">
                  {problem.questions.map((question) => {
                    const correctAnswer = problem.answers.find(a => a.questionId === question.id);
                    return (
                      <CROCSQuestion
                        key={question.id}
                        question={{ ...question, correctAnswers: correctAnswer?.correctAnswers, explanation: correctAnswer?.explanation }}
                        selectedAnswer={answers[`${problem.id}-${question.id}`]}
                        showResult={true}
                        onAnswer={() => {}}
                      />
                    );
                  })}
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
              <span>Cas {currentProblemIndex + 1} sur {problems.length}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Current Problem */}
      {currentProblem && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Cas clinique {currentProblemIndex + 1}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scenario */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                {currentProblem.scenario}
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Questions :</h3>
              {currentProblem.questions.map((question) => (
                <CROCSQuestion
                  key={question.id}
                  question={question}
                  selectedAnswer={answers[`${currentProblem.id}-${question.id}`]}
                  onAnswer={(answer) => handleAnswer(question.id, answer)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentProblemIndex === 0}
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
              <span>{isLastProblem ? 'Terminer' : 'Suivant'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { CROCSRevision, CROCSQuestion };
