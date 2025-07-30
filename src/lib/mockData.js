// Mock data for testing the UI

export const mockSubjects = [
  {
    id: 'cardiologie',
    name: 'La cardiologie',
    icon: '❤️',
    color: '#ef4444',
    order: 1,
    subSubjects: [
      {
        id: 'cardio-1',
        name: 'Insuffisance cardiaque',
        order: 1,
        revisions: [
          {
            id: 'revision-1',
            title: 'Insuffisance cardiaque systolique',
            order: 1,
            qcmCount: 15,
            crocsCount: 3,
            clinicalCount: 2
          },
          {
            id: 'revision-2',
            title: 'Insuffisance cardiaque diastolique',
            order: 2,
            qcmCount: 12,
            crocsCount: 2,
            clinicalCount: 1
          }
        ]
      },
      {
        id: 'cardio-2',
        name: 'Coronaropathies',
        order: 2,
        revisions: [
          {
            id: 'revision-3',
            title: 'Syndrome coronarien aigu',
            order: 1,
            qcmCount: 20,
            crocsCount: 4,
            clinicalCount: 3
          }
        ]
      }
    ]
  },
  {
    id: 'ophtalmologie',
    name: 'L\'ophtalmologie',
    icon: '👁️',
    color: '#3b82f6',
    order: 2,
    subSubjects: [
      {
        id: 'ophtalmo-1',
        name: 'Pathologies rétiniennes',
        order: 1,
        revisions: [
          {
            id: 'revision-4',
            title: 'Décollement de rétine',
            order: 1,
            qcmCount: 10,
            crocsCount: 2,
            clinicalCount: 1
          },
          {
            id: 'revision-5',
            title: 'Dégénérescence maculaire',
            order: 2,
            qcmCount: 15,
            crocsCount: 3,
            clinicalCount: 2
          }
        ]
      },
      {
        id: 'ophtalmo-2',
        name: 'Glaucome',
        order: 2,
        revisions: [
          {
            id: 'revision-6',
            title: 'Glaucome chronique',
            order: 1,
            qcmCount: 12,
            crocsCount: 2,
            clinicalCount: 1
          }
        ]
      }
    ]
  },
  {
    id: 'neurologie',
    name: 'La neurologie',
    icon: '🧠',
    color: '#8347ff',
    order: 3,
    subSubjects: [
      {
        id: 'neuro-1',
        name: 'AVC',
        order: 1,
        revisions: [
          {
            id: 'revision-7',
            title: 'AVC ischémique',
            order: 1,
            qcmCount: 18,
            crocsCount: 4,
            clinicalCount: 3
          },
          {
            id: 'revision-8',
            title: 'AVC hémorragique',
            order: 2,
            qcmCount: 14,
            crocsCount: 3,
            clinicalCount: 2
          }
        ]
      },
      {
        id: 'neuro-2',
        name: 'Épilepsie',
        order: 2,
        revisions: [
          {
            id: 'revision-9',
            title: 'Crises généralisées',
            order: 1,
            qcmCount: 16,
            crocsCount: 3,
            clinicalCount: 2
          }
        ]
      }
    ]
  }
];

export const mockProgress = {
  'revision-1': { completionRate: 100, lastAccessed: '2024-01-20' },
  'revision-2': { completionRate: 75, lastAccessed: '2024-01-19' },
  'revision-3': { completionRate: 50, lastAccessed: '2024-01-18' },
  'revision-4': { completionRate: 100, lastAccessed: '2024-01-17' },
  'revision-5': { completionRate: 25, lastAccessed: '2024-01-16' },
  'revision-6': { completionRate: 0, lastAccessed: null },
  'revision-7': { completionRate: 90, lastAccessed: '2024-01-15' },
  'revision-8': { completionRate: 60, lastAccessed: '2024-01-14' },
  'revision-9': { completionRate: 0, lastAccessed: null }
};

export const mockQCMQuestions = [
  {
    id: 'qcm-1',
    question: 'Quel est le principal mécanisme physiopathologique de l\'insuffisance cardiaque systolique ?',
    options: [
      'Diminution de la contractilité myocardique',
      'Augmentation de la rigidité ventriculaire',
      'Diminution du retour veineux',
      'Augmentation de la post-charge'
    ],
    correctAnswer: 0,
    explanation: 'L\'insuffisance cardiaque systolique est caractérisée par une diminution de la fraction d\'éjection due à une altération de la contractilité myocardique.'
  },
  {
    id: 'qcm-2',
    question: 'Quelle est la classe thérapeutique de première intention dans l\'insuffisance cardiaque à fraction d\'éjection altérée ?',
    options: [
      'Diurétiques thiazidiques',
      'Inhibiteurs de l\'ECA ou ARA2',
      'Bêta-bloquants',
      'Antagonistes des récepteurs minéralocorticoïdes'
    ],
    correctAnswer: 1,
    explanation: 'Les inhibiteurs de l\'ECA (ou ARA2 en cas d\'intolérance) constituent le traitement de première intention, associés aux bêta-bloquants.'
  }
];

export const mockCROCSProblems = [
  {
    id: 'crocs-1',
    scenario: 'Vous recevez aux urgences un patient âgé de 49 ans qui consulte pour douleur thoracique à type de brûlures évoluant depuis 3 heures associée à une dyspnée d\'effort. Patient ayant comme antécédents une HTA mal équilibrée sous trithérapie anti-hypertensive, un diabète de type 1 sous insulinothérapie et une néphropathie diabétique avec insuffisance rénale chronique au stade d\'hémodialyse à raison de 3 séances par semaine depuis 10 ans.',
    questions: [
      {
        id: 'crocs-q-1',
        question: 'L\'agitation du patient',
        type: 'single',
        options: ['A', 'B', 'C', 'D', 'E']
      },
      {
        id: 'crocs-q-2',
        question: 'L\'intensité des douleurs thoraciques',
        type: 'single',
        options: ['A', 'B', 'C', 'D', 'E']
      },
      {
        id: 'crocs-q-3',
        question: 'L\'Hypertension artérielle',
        type: 'single',
        options: ['A', 'B', 'C', 'D', 'E']
      }
    ],
    answers: [
      { questionId: 'crocs-q-1', correctAnswers: ['A'], explanation: 'L\'agitation du patient...' },
      { questionId: 'crocs-q-2', correctAnswers: ['B'], explanation: 'L\'intensité des douleurs...' },
      { questionId: 'crocs-q-3', correctAnswers: ['C'], explanation: 'L\'hypertension artérielle...' }
    ]
  }
];

export const mockClinicalProblems = [
  {
    id: 'clinical-1',
    patientCase: 'Vous recevez aux urgences un patient âgé de 49 ans qui consulte pour douleur thoracique à type de brûlures évoluant depuis 3 heures associée à une dyspnée d\'effort. Patient ayant comme antécédents une HTA mal équilibrée sous trithérapie anti-hypertensive, un diabète de type 1 sous insulinothérapie et une néphropathie diabétique avec insuffisance rénale chronique au stade d\'hémodialyse à raison de 3 séances par semaine depuis 10 ans.',
    clinicalData: {
      vitals: {
        bloodPressure: '80/60 mmHg au membre supérieur droit',
        heartRate: 40,
        temperature: 36.2,
        respiratoryRate: 28,
        oxygenSaturation: 88
      },
      labResults: {
        'Urée': '30 mmol/l',
        'Créatinine': '627 μmol/l',
        'K+': '5.8 mmol/l',
        'Na+': '130 mmol/l',
        'Hémoglobine': '8.2 g/dl',
        'Plaquettes': '185 000/mm3',
        'Globules blancs': '5000/mm3'
      },
      physicalExam: 'À l\'examen : patient agité, sueurs profuses, TA = 80/60 mmHg au membre supérieur droit, fistule artérioveneineuse à gauche. FC = 40 bpm, rythme régulier, FR = 28 cpm, SaO2 = 88% à l\'air ambiant, souffle systolique 2/6 au foyer aortique, des râles crépitants à deux hémichamps pulmonaires. Pas de signes d\'insuffisance cardiaque droite. Les pouls périphériques sont faibles.'
    },
    questions: [
      {
        id: 'clinical-q-1',
        question: 'Quel est votre diagnostic principal ?',
        type: 'diagnosis',
        options: [
          'Syndrome coronarien aigu',
          'Œdème aigu du poumon',
          'Embolie pulmonaire',
          'Pneumothorax',
          'Tamponnade'
        ]
      },
      {
        id: 'clinical-q-2',
        question: 'Quels examens demandez-vous en première intention ?',
        type: 'investigation',
        options: [
          'ECG',
          'Radiographie thoracique',
          'Échocardiographie',
          'Gaz du sang artériel',
          'Troponines'
        ]
      }
    ],
    correctApproach: {
      diagnosis: 'Œdème aigu du poumon sur insuffisance cardiaque décompensée',
      treatment: [
        'Position demi-assise',
        'Oxygénothérapie',
        'Diurétiques IV (furosémide)',
        'Vasodilatateurs (dérivés nitrés)',
        'Surveillance scopique'
      ],
      investigations: [
        'ECG 12 dérivations',
        'Radiographie thoracique',
        'Échocardiographie',
        'Gaz du sang artériel',
        'Ionogramme sanguin complet'
      ],
      followUp: 'Surveillance rapprochée, réévaluation clinique et paraclinique',
      explanation: 'Le patient présente un tableau d\'œdème aigu du poumon avec insuffisance cardiaque décompensée sur terrain de cardiopathie ischémique probable.'
    }
  }
];

export const mockUser = {
  id: 'user-1',
  email: 'student@medq.com',
  name: 'Étudiant Médecine',
  role: 'STUDENT'
};

// Helper functions for mock data
export function getSubjectProgress(subjectId) {
  const subject = mockSubjects.find(s => s.id === subjectId);
  if (!subject) return { completed: 0, inProgress: 0, total: 0 };
  
  let completed = 0;
  let inProgress = 0;
  let total = 0;
  
  subject.subSubjects.forEach(subSubject => {
    subSubject.revisions.forEach(revision => {
      total++;
      const progress = mockProgress[revision.id];
      if (progress) {
        if (progress.completionRate === 100) {
          completed++;
        } else if (progress.completionRate > 0) {
          inProgress++;
        }
      }
    });
  });
  
  return { completed, inProgress, total };
}

// Mock clinical cases data
export const mockClinicalCases = [
  {
    id: 'case-1',
    title: 'Douleur thoracique aiguë',
    patient: {
      age: 65,
      gender: 'Homme',
      medicalHistory: 'HTA, diabète type 2',
      currentTreatments: 'Metformine, Lisinopril'
    },
    presentation: 'Patient de 65 ans qui consulte aux urgences pour une douleur thoracique rétrosternale intense apparue il y a 2 heures, irradiant vers le bras gauche et la mâchoire. La douleur est accompagnée de sueurs, nausées et dyspnée. Le patient décrit la douleur comme constrictive et évalue son intensité à 9/10.',
    examinations: 'ECG: sus-décalage de ST en DII, DIII, aVF. Troponines: 45 ng/L (N<14). CK-MB: 85 U/L (N<25). Échographie cardiaque: hypokinésie de la paroi inférieure.',
    questions: [
      {
        id: 'q1',
        question: 'Quel est le diagnostic le plus probable?',
        options: [
          { id: 'a', text: 'Infarctus du myocarde inférieur' },
          { id: 'b', text: 'Péricardite aiguë' },
          { id: 'c', text: 'Embolie pulmonaire' },
          { id: 'd', text: 'Dissection aortique' },
          { id: 'e', text: 'Pneumothorax' }
        ],
        correctAnswer: 'a',
        explanation: 'Les signes cliniques (douleur constrictive avec irradiation typique), l\'ECG (sus-décalage de ST en territoire inférieur), et les biomarqueurs élevés (troponines, CK-MB) sont pathognomoniques d\'un infarctus du myocarde inférieur.'
      },
      {
        id: 'q2',
        question: 'Quelle artère coronaire est le plus probablement occluse?',
        options: [
          { id: 'a', text: 'Artère interventriculaire antérieure (IVA)' },
          { id: 'b', text: 'Artère circonflexe gauche' },
          { id: 'c', text: 'Artère coronaire droite (CD)' },
          { id: 'd', text: 'Artère marginale' },
          { id: 'e', text: 'Artère diagonale' }
        ],
        correctAnswer: 'c',
        explanation: 'L\'infarctus inférieur avec sus-décalage en DII, DIII, aVF correspond classiquement à une occlusion de l\'artère coronaire droite qui vascularise la paroi inférieure du ventricule gauche.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Trouble de la vision chez un diabétique',
    patient: {
      age: 58,
      gender: 'Femme',
      medicalHistory: 'Diabète type 2 depuis 15 ans, HTA',
      currentTreatments: 'Insuline, Amlodipine'
    },
    presentation: 'Patiente de 58 ans, diabétique de type 2 depuis 15 ans, qui consulte pour une baisse progressive de l\'acuité visuelle bilatérale évoluant depuis 6 mois. Elle rapporte également des "mouches volantes" et des éclairs lumineux. L\'examen ophtalmologique révèle une acuité visuelle à 5/10 à droite et 4/10 à gauche.',
    examinations: 'Fond d\'œil: microanévrismes, hémorragies punctiformes, exsudats lipidiques, œdème maculaire bilatéral. Angiographie fluorescéinique: zones d\'ischémie rétinienne, néovaisseaux au niveau de la papille.',
    questions: [
      {
        id: 'q1',
        question: 'Quel est le diagnostic le plus probable?',
        options: [
          { id: 'a', text: 'Rétinopathie hypertensive' },
          { id: 'b', text: 'Rétinopathie diabétique proliférante' },
          { id: 'c', text: 'Décollement de rétine' },
          { id: 'd', text: 'Glaucome chronique' },
          { id: 'e', text: 'Cataracte diabétique' }
        ],
        correctAnswer: 'b',
        explanation: 'La présence de microanévrismes, hémorragies, exsudats lipidiques, œdème maculaire et surtout de néovaisseaux papillaires chez une diabétique de longue durée signe une rétinopathie diabétique proliférante.'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Céphalées et déficit neurologique',
    patient: {
      age: 72,
      gender: 'Homme',
      medicalHistory: 'Fibrillation auriculaire, AVC ischémique antérieur',
      currentTreatments: 'Warfarine, Bisoprolol'
    },
    presentation: 'Patient de 72 ans amené par sa famille pour installation brutale depuis 2 heures de céphalées intenses (10/10) associées à des vomissements et une hémiparésie droite. Le patient était en forme ce matin. Pas de traumatisme récent. Score de Glasgow à 13/15.',
    examinations: 'TDM cérébrale sans injection: hyperdensité spontanée fronto-pariétale gauche avec effet de masse et engagement sous-falcoriel débutant. INR: 3.2.',
    questions: [
      {
        id: 'q1',
        question: 'Quel est le diagnostic le plus probable?',
        options: [
          { id: 'a', text: 'AVC ischémique aigu' },
          { id: 'b', text: 'Hémorragie méningée' },
          { id: 'c', text: 'Hémorragie cérébrale' },
          { id: 'd', text: 'Thrombose veineuse cérébrale' },
          { id: 'e', text: 'Tumeur cérébrale' }
        ],
        correctAnswer: 'c',
        explanation: 'L\'hyperdensité spontanée au scanner avec effet de masse chez un patient sous anticoagulants (INR élevé) avec installation brutale de signes neurologiques évoque une hémorragie cérébrale.'
      }
    ]
  }
];

export function getRevisionProgress(revisionId) {
  return mockProgress[revisionId] || { completionRate: 0, lastAccessed: null };
}
