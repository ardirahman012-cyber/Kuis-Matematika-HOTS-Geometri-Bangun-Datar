export interface StudentIdentity {
  name: string;
  absenceNumber: string;
  studentClass: string;
  schoolName: string;
  date: string;
}

export type OptionKey = 'a' | 'b' | 'c' | 'd';

export interface QuestionStep {
  title: string;
  formula?: string;
  calculation: string;
  result?: string;
}

export interface HOTSQuestion {
  id: number;
  questionNumber: number; // 6, 7, 8, 9, 10
  shapeType: string;
  cognitiveLevel: string; // 'Level Kognitif C4-Menganalisis'
  title: string;
  points: number; // 20
  scenario?: string;
  questionText: string;
  imageSrc: string;
  imageAlt: string;
  options: {
    key: OptionKey;
    text: string;
  }[];
  correctAnswer: OptionKey;
  rawSolution: string[];
  conceptSummary: string;
  formulas: string[];
  steps: QuestionStep[];
  geometryTips: string;
}

export interface EmotionCheckIn {
  emotion: string;
  emoji: string;
  readinessNote: string;
}

export interface EmotionCheckOutAndReflection {
  emotion: string;
  emoji: string;
  effortRating: number; // 1 to 5 stars
  hardestQuestion: string;
  learnedConcept: string;
  studentNotes?: string;
}

export interface StudentSubmission {
  id: string;
  timestamp: number;
  studentName: string;
  absenceNumber: string;
  studentClass: string;
  schoolName: string;
  date: string;
  answers: Record<number, OptionKey>;
  score: number; // 0 - 100
  correctCount: number; // 0 - 5
  totalQuestions: number;
  timeSpentSeconds: number;
  checkInEmotion?: EmotionCheckIn;
  checkOutReflection?: EmotionCheckOutAndReflection;
  notes?: string;
}

export interface AffirmationData {
  score: number;
  correctCount: number;
  title: string;
  tierBadge: string;
  headerColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  affirmation: string;
  quote: string;
  actionTip: string;
}
