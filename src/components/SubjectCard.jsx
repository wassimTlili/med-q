import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { getProgressPercentage } from "@/lib/utils";

const ProgressIndicator = ({ completed, inProgress, total }) => {
  return (
    <div className="progress-indicator">
      {Array.from({ length: total }, (_, index) => {
        let status = 'not-started';
        if (index < completed) {
          status = 'completed';
        } else if (index < completed + inProgress) {
          status = 'in-progress';
        }
        
        return (
          <div
            key={index}
            className={`progress-dot ${status}`}
          />
        );
      })}
    </div>
  );
};

const SubjectCard = ({ subject, progress, onClick }) => {
  const progressPercentage = getProgressPercentage(progress.completed, progress.total);
  
  return (
    <Card 
      className="subject-card animate-fade-in cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader className="text-center">
        <div className="subject-icon text-4xl mb-2">
          {subject.icon}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {subject.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progression</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
        
        <div className="flex justify-between items-center">
          <ProgressIndicator 
            completed={progress.completed}
            inProgress={progress.inProgress}
            total={progress.total}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {progress.total} QCM restants
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export { SubjectCard, ProgressIndicator };
