import seedrandom from 'seedrandom';

export interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: number;
  location: string;
  status: string;
  appliedJobs: number;
}

export const generateCandidates = (): Candidate[] => {
  const rng = seedrandom('fixed-seed');
  const skills = ['React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'Machine Learning', 'Data Analysis'];
  const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];
  const statuses = ['Active', 'Interviewing', 'Hired', 'Inactive'];
  const firstNames = [
    'Aarav', 'Aditi', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Neha', 'Rohan', 'Sanya', 'Vikram',
    'Ananya', 'Aryan', 'Dev', 'Isha', 'Karan', 'Lara', 'Maya', 'Nikhil', 'Pooja', 'Riya',
    'Siddharth', 'Tara', 'Varun', 'Zara', 'Meera', 'Saanvi', 'Vihaan', 'Ayaan', 'Tanish', 'Samaira',
    'Aditya', 'Bhavya', 'Chirag', 'Deepika', 'Esha', 'Farhan', 'Gauri', 'Harsh', 'Ira', 'Jatin',
    'Kunal', 'Lavanya', 'Manav', 'Naina', 'Om', 'Prisha', 'Rahul', 'Shruti', 'Tanvi', 'Yash'
  ];
  const lastNames = [
    'Patel', 'Sharma', 'Singh', 'Kumar', 'Gupta', 'Shah', 'Reddy', 'Joshi', 'Mehta', 'Verma',
    'Bose', 'Chatterjee', 'Das', 'Ghosh', 'Iyer', 'Jain', 'Kapoor', 'Malhotra', 'Nair', 'Pandey',
    'Rao', 'Saxena', 'Trivedi', 'Venkatesh', 'Yadav', 'Zaveri', 'Bhatt', 'Chauhan', 'Desai', 'Garg',
    'Ahuja', 'Bhatia', 'Chopra', 'Dutta', 'Eapen', 'Fernandes', 'Grover', 'Hegde', 'Iyengar', 'Jha',
    'Kohli', 'Lal', 'Mahajan', 'Nambiar', 'Oberoi', 'Pereira', 'Qureshi', 'Rana', 'Sethi', 'Tandon'
  ];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[Math.floor(rng() * firstNames.length)]} ${lastNames[Math.floor(rng() * lastNames.length)]}`,
    skills: [skills[Math.floor(rng() * skills.length)], skills[Math.floor(rng() * skills.length)]],
    experience: Math.floor(rng() * 15) + 1,
    location: locations[Math.floor(rng() * locations.length)],
    status: statuses[Math.floor(rng() * statuses.length)],
    appliedJobs: Math.floor(rng() * 10) + 1,
  }));
};
