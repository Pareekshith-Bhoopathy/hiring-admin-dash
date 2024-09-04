import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const jobPostings = [
  { id: 1, title: "Software Engineer", company: "TCS", location: "Bangalore", salary: "₹15,00,000 - ₹25,00,000", applicants: 45 },
  { id: 2, title: "Product Manager", company: "Infosys", location: "Mumbai", salary: "₹20,00,000 - ₹30,00,000", applicants: 32 },
  { id: 3, title: "Data Scientist", company: "Wipro", location: "Hyderabad", salary: "₹18,00,000 - ₹28,00,000", applicants: 28 },
  { id: 4, title: "UX Designer", company: "HCL Technologies", location: "Pune", salary: "₹12,00,000 - ₹22,00,000", applicants: 39 },
  { id: 5, title: "DevOps Engineer", company: "Tech Mahindra", location: "Chennai", salary: "₹16,00,000 - ₹26,00,000", applicants: 22 },
];

export default function JobPostings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Postings</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary Range</TableHead>
            <TableHead>Applicants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPostings.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>{job.applicants}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}