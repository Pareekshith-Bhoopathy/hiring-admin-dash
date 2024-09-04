import seedrandom from 'seedrandom';

export interface Transaction {
  id: number;
  date: string;
  entity: string;
  amount: number;
  type: string;
  status: string;
}

export const generateTransactions = (): Transaction[] => {
  const rng = seedrandom('fixed-seed');
  const types = ['Job Posting', 'Premium Subscription', 'Featured Listing', 'Application Fee'];
  const statuses = ['Completed', 'Pending', 'Failed'];
  const companies = ['TCS', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Accenture', 'Cognizant'];
  const candidates = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams', 'Charlie Brown'];

  return Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    date: new Date(2023, Math.floor(rng() * 12), Math.floor(rng() * 28) + 1).toISOString().split('T')[0],
    entity: rng() > 0.5 ? companies[Math.floor(rng() * companies.length)] : candidates[Math.floor(rng() * candidates.length)],
    amount: Math.floor(rng() * 100000) + 1000,
    type: types[Math.floor(rng() * types.length)],
    status: statuses[Math.floor(rng() * statuses.length)],
  }));
};