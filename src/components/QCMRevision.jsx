import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

const QCMQuestion = ({ question, onAnswer, selectedAnswer, showResult = false, isCorrect = false }) => {
  const [localSelected, setLocalSelected] = useState(selectedAnswer);

  const handleOptionClick = (optionIndex) => {
    if (showResult) return; // Don't allow changes after showing result
    setLocalSelected(optionIndex);
    onAnswer(optionIndex);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 border rounded-lg transition-all duration-200 ";
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200";
              } else if (index === localSelected && index !== question.correctAnswer) {
                buttonClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200";
              } else {
                buttonClass += "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400";
              }
            } else {
              if (index === localSelected) {
                buttonClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
              } else {
                buttonClass += "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700";
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleOptionClick(index)}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && index === localSelected && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explication :</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const QCMRevision = ({ questions, onComplete, title = "QCM de révision" }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswer = answers[currentQuestion?.id] !== undefined;

  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      if (onComplete) {
        const score = calculateScore();
        onComplete({ answers, score, timeSpent });
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Résultats du QCM</CardTitle>
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
                  <p className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Erreurs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
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

        {/* Review all questions */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Correction détaillée</h3>
          {questions.map((question, index) => (
            <QCMQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id]}
              showResult={true}
              isCorrect={answers[question.id] === question.correctAnswer}
              onAnswer={() => {}}
            />
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
              <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Current Question */}
      {currentQuestion && (
        <QCMQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion.id]}
        />
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Précédent</span>
            </Button>

            <div className="text-center">
              <Badge variant="outline">
                {Object.keys(answers).length} / {questions.length} répondues
              </Badge>
            </div>

            <Button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="btn-medical flex items-center space-x-2"
            >
              <span>{isLastQuestion ? 'Terminer' : 'Suivant'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { QCMRevision, QCMQuestion };
