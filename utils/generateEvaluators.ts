import seedrandom from 'seedrandom';

export interface QueuedEvaluation {
  candidateId: number;
  candidateName: string;
  date: string;
  time: string;
}

export interface Evaluator {
  id: number;
  name: string;
  expertise: string[];
  yearsOfExperience: number;
  evaluationsCompleted: number;
  averageRating: number;
  status: 'Available' | 'Interviewing' | 'Assigned';
  currentInterview?: {
    candidateId: number;
    candidateName: string;
  };
  queuedEvaluations: QueuedEvaluation[];
}

export const generateEvaluators = (): Evaluator[] => {
  const rng = seedrandom('fixed-seed-evaluators');
  const expertiseAreas = ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Machine Learning', 'Mobile Development', 'Data Science', 'Cloud Computing'];
  const names = [
    'Amit Kumar', 'Priya Sharma', 'Rajesh Gupta', 'Sneha Patel', 'Vikram Singh', 'Neha Reddy', 'Sanjay Verma', 'Anjali Desai', 'Karthik Nair', 'Pooja Mehta',
    'Ravi Shankar', 'Lakshmi Iyer', 'Arjun Rao', 'Meera Joshi', 'Nitin Kapoor', 'Sunita Jain', 'Rohit Malhotra', 'Divya Nair', 'Suresh Bhat', 'Kiran Kulkarni',
    'Asha Menon', 'Manoj Saxena', 'Vijay Bhatt', 'Rekha Chatterjee', 'Anand Ghosh', 'Pallavi Das', 'Siddharth Bose', 'Nandini Iyer', 'Vikas Reddy', 'Tara Kapoor'
  ];
  const statuses: Evaluator['status'][] = ['Available', 'Interviewing', 'Assigned'];
  const candidateNames = [
    'Aarav Patel', 'Aditi Sharma', 'Arjun Singh', 'Diya Kumar', 'Ishaan Gupta', 'Kavya Shah', 'Neha Reddy', 'Rohan Joshi', 'Sanya Mehta', 'Vikram Verma',
    'Ananya Desai', 'Aryan Nair', 'Dev Kapoor', 'Isha Jain', 'Karan Malhotra', 'Lara Bhat', 'Maya Saxena', 'Nikhil Bhatt', 'Pooja Chatterjee', 'Riya Ghosh',
    'Siddharth Das', 'Tara Bose', 'Varun Iyer', 'Zara Reddy', 'Meera Kapoor', 'Saanvi Gupta', 'Vihaan Shah', 'Ayaan Reddy', 'Tanish Joshi', 'Samaira Mehta'
  ];

  const generateQueuedEvaluations = (): QueuedEvaluation[] => {
    const count = Math.floor(rng() * 5);
    return Array.from({ length: count }, () => ({
      candidateId: Math.floor(rng() * 1000) + 1,
      candidateName: candidateNames[Math.floor(rng() * candidateNames.length)],
      date: new Date(Date.now() + Math.floor(rng() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      time: `${String(Math.floor(rng() * 12) + 9).padStart(2, '0')}:${String(Math.floor(rng() * 4) * 15).padStart(2, '0')}`
    }));
  };

  return Array.from({ length: 50 }, (_, i) => {
    const status = statuses[Math.floor(rng() * statuses.length)];
    const evaluator: Evaluator = {
      id: i + 1,
      name: names[Math.floor(rng() * names.length)],
      expertise: [
        expertiseAreas[Math.floor(rng() * expertiseAreas.length)],
        expertiseAreas[Math.floor(rng() * expertiseAreas.length)]
      ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
      yearsOfExperience: Math.floor(rng() * 15) + 3,
      evaluationsCompleted: Math.floor(rng() * 500) + 50,
      averageRating: Number((rng() * (5 - 3.5) + 3.5).toFixed(1)),
      status: status,
      queuedEvaluations: generateQueuedEvaluations()
    };

    if (status === 'Interviewing') {
      evaluator.currentInterview = {
        candidateId: Math.floor(rng() * 1000) + 1,
        candidateName: candidateNames[Math.floor(rng() * candidateNames.length)]
      };
    }

    return evaluator;
  });
};
