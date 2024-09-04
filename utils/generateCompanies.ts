import seedrandom from 'seedrandom';

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employees: number;
  activeJobs: number;
}

export const generateCompanies = (): Company[] => {
  const rng = seedrandom('fixed-seed-companies');
  const industries = ['IT Services', 'IT Consulting', 'Technology', 'Software Development', 'Cloud Services', 'Cybersecurity'];
  const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Noida', 'Gurgaon'];
  const companyNames = ['Tech', 'Soft', 'Data', 'Cloud', 'Cyber', 'Info', 'Net', 'Digi', 'Inno', 'Smart'];
  const companySuffixes = ['Systems', 'Solutions', 'Technologies', 'Innovations', 'Networks', 'Enterprises', 'Corp', 'Inc', 'Group', 'Labs'];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `${companyNames[Math.floor(rng() * companyNames.length)]}${companySuffixes[Math.floor(rng() * companySuffixes.length)]}`,
    industry: industries[Math.floor(rng() * industries.length)],
    location: locations[Math.floor(rng() * locations.length)],
    employees: Math.floor(rng() * 500000) + 1000,
    activeJobs: Math.floor(rng() * 200) + 1,
  }));
};