'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  Eye,
  Send,
  FileText,
  Target,
  Stethoscope,
  Brain,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle,
  Circle,
  Upload,
  Download
} from 'lucide-react';

export default function CreateRevision() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [revision, setRevision] = useState({
    title: '',
    subSubjectId: '',
    description: '',
    objectives: '',
    difficulty: 'intermediate',
    estimatedTime: 30,
    status: 'draft'
  });

  const [qcmQuestions, setQcmQuestions] = useState([]);
  const [crocsProblems, setCrocsProblems] = useState([]);
  const [clinicalCases, setClinicalCases] = useState([]);

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText, completed: false },
    { id: 'qcm', label: 'QCM Questions', icon: Target, completed: false },
    { id: 'crocs', label: 'CROCS Problems', icon: Brain, completed: false },
    { id: 'clinical', label: 'Clinical Cases', icon: Stethoscope, completed: false },
    { id: 'preview', label: 'Preview & Publish', icon: Eye, completed: false }
  ];

  const subjects = [
    { id: 1, name: 'Cardiologie', subSubjects: [
      { id: 1, name: 'Anatomie cardiaque' },
      { id: 2, name: 'Physiologie cardiaque' },
      { id: 3, name: 'Pathologies coronariennes' }
    ]},
    { id: 2, name: 'Neurologie', subSubjects: [
      { id: 4, name: 'Anatomie du système nerveux' },
      { id: 5, name: 'Neurophysiologie' },
      { id: 6, name: 'Pathologies neurologiques' }
    ]}
  ];

  const handleSaveDraft = () => {
    // Save as draft logic
    console.log('Saving as draft:', { revision, qcmQuestions, crocsProblems, clinicalCases });
  };

  const handlePublish = () => {
    // Publish logic
    console.log('Publishing:', { revision, qcmQuestions, crocsProblems, clinicalCases });
  };

  const addQcmQuestion = () => {
    setQcmQuestions([...qcmQuestions, {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswers: [],
      explanation: '',
      difficulty: 'intermediate'
    }]);
  };

  const updateQcmQuestion = (id, field, value) => {
    setQcmQuestions(qcmQuestions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQcmQuestion = (id) => {
    setQcmQuestions(qcmQuestions.filter(q => q.id !== id));
  };

  const addCrocsCase = () => {
    setCrocsProblems([...crocsProblems, {
      id: Date.now(),
      scenario: '',
      patientData: {
        age: '',
        gender: '',
        symptoms: '',
        history: ''
      },
      questions: [],
      expectedAnswers: []
    }]);
  };

  const addClinicalCase = () => {
    setClinicalCases([...clinicalCases, {
      id: Date.now(),
      title: '',
      presentation: '',
      vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: ''
      },
      labResults: [],
      imagingFindings: '',
      physicalExam: '',
      reasoningSteps: [],
      difficulty: 'intermediate'
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Revision</h1>
                <p className="text-sm text-gray-500">Build comprehensive medical education content</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Revision Builder</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-3" />
                      <span className="flex-1 text-left">{tab.label}</span>
                      {tab.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Progress</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">QCM Questions</span>
                    <span className="text-gray-900">{qcmQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CROCS Cases</span>
                    <span className="text-gray-900">{crocsProblems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinical Cases</span>
                    <span className="text-gray-900">{clinicalCases.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <p className="text-gray-600 mb-6">Set up the fundamental details of your revision content.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Revision Title</label>
                      <input
                        type="text"
                        value={revision.title}
                        onChange={(e) => setRevision({ ...revision, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter a descriptive title for your revision..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject & Sub-subject</label>
                      <select
                        value={revision.subSubjectId}
                        onChange={(e) => setRevision({ ...revision, subSubjectId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select sub-subject...</option>
                        {subjects.map(subject => (
                          <optgroup key={subject.id} label={subject.name}>
                            {subject.subSubjects.map(subSubject => (
                              <option key={subSubject.id} value={subSubject.id}>
                                {subSubject.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                      <select
                        value={revision.difficulty}
                        onChange={(e) => setRevision({ ...revision, difficulty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={revision.description}
                        onChange={(e) => setRevision({ ...revision, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Provide a brief description of what this revision covers..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                      <textarea
                        value={revision.objectives}
                        onChange={(e) => setRevision({ ...revision, objectives: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="List the key learning objectives for this revision..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (minutes)</label>
                      <input
                        type="number"
                        value={revision.estimatedTime}
                        onChange={(e) => setRevision({ ...revision, estimatedTime: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="5"
                        max="180"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* QCM Questions Tab */}
              {activeTab === 'qcm' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">QCM Questions</h2>
                      <p className="text-gray-600">Create multiple choice questions for knowledge assessment.</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </button>
                      <button
                        onClick={addQcmQuestion}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </button>
                    </div>
                  </div>

                  {qcmQuestions.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No QCM questions yet</h3>
                      <p className="text-gray-500 mb-4">Start building your question bank for this revision.</p>
                      <button
                        onClick={addQcmQuestion}
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Question
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {qcmQuestions.map((question, index) => (
                        <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <GripVertical className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteQcmQuestion(question.id)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                              <textarea
                                value={question.question}
                                onChange={(e) => updateQcmQuestion(question.id, 'question', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter your question here..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                              <div className="space-y-3">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-3">
                                    <input
                                      type="checkbox"
                                      checked={question.correctAnswers.includes(optionIndex)}
                                      onChange={(e) => {
                                        const correctAnswers = e.target.checked
                                          ? [...question.correctAnswers, optionIndex]
                                          : question.correctAnswers.filter(i => i !== optionIndex);
                                        updateQcmQuestion(question.id, 'correctAnswers', correctAnswers);
                                      }}
                                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 min-w-0 w-8">
                                      {String.fromCharCode(65 + optionIndex)}.
                                    </span>
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options];
                                        newOptions[optionIndex] = e.target.value;
                                        updateQcmQuestion(question.id, 'options', newOptions);
                                      }}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                              <textarea
                                value={question.explanation}
                                onChange={(e) => updateQcmQuestion(question.id, 'explanation', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Explain why the correct answer(s) are correct..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1].id);
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={activeTab === tabs[0].id}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={activeTab === tabs[tabs.length - 1].id}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
