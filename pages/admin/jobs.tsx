import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { usePageTitle } from '../../components/PageTitleContext';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Briefcase, Users, Clock, IndianRupeeIcon } from 'lucide-react';
import React, { useEffect } from 'react';


const jobStats = [
  { title: "Total Jobs", value: "1,234", icon: Briefcase, color: "text-blue-500" },
  { title: "Total Applicants", value: "5,678", icon: Users, color: "text-green-500" },
  { title: "Avg. Time to Hire", value: "15 days", icon: Clock, color: "text-yellow-500" },
  { title: "Avg. Salary", value: "₹8,50,000", icon: IndianRupeeIcon, color: "text-purple-500" },
];

const jobData = [
  { name: 'Jan', jobs: 65 },
  { name: 'Feb', jobs: 59 },
  { name: 'Mar', jobs: 80 },
  { name: 'Apr', jobs: 81 },
  { name: 'May', jobs: 56 },
  { name: 'Jun', jobs: 55 },
];

export default function Jobs() {
const { setPageTitle } = usePageTitle();
useEffect(() => {
    setPageTitle('Jobs Overview');
  }, [setPageTitle]);
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Postings Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}