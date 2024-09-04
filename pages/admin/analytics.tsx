import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Briefcase, Building, IndianRupeeIcon } from 'lucide-react';

// Sample data (replace with actual data from your backend)
const revenueData = [
  { month: 'Jan', revenue: 4000, growth: 20 },
  { month: 'Feb', revenue: 3000, growth: -25 },
  { month: 'Mar', revenue: 5000, growth: 66.67 },
  { month: 'Apr', revenue: 4500, growth: -10 },
  { month: 'May', revenue: 6000, growth: 33.33 },
  { month: 'Jun', revenue: 5500, growth: -8.33 },
];

const userGrowthData = [
  { month: 'Jan', candidates: 1000, employers: 200 },
  { month: 'Feb', candidates: 1200, employers: 220 },
  { month: 'Mar', candidates: 1500, employers: 250 },
  { month: 'Apr', candidates: 1800, employers: 280 },
  { month: 'May', candidates: 2200, employers: 320 },
  { month: 'Jun', candidates: 2500, employers: 350 },
];

const jobCategoryData = [
  { name: 'IT & Software', value: 400 },
  { name: 'Marketing', value: 300 },
  { name: 'Finance', value: 200 },
  { name: 'Design', value: 150 },
  { name: 'Sales', value: 100 },
];

const hiringTrendData = [
  { month: 'Jan', applications: 500, hires: 50 },
  { month: 'Feb', applications: 600, hires: 60 },
  { month: 'Mar', applications: 750, hires: 75 },
  { month: 'Apr', applications: 800, hires: 80 },
  { month: 'May', applications: 900, hires: 90 },
  { month: 'Jun', applications: 1000, hires: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('6m');
  const { setPageTitle } = usePageTitle();
  useEffect(() => {
    setPageTitle('Analytics');
  }, [setPageTitle]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹28,00,000</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="inline mr-1" size={12} />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,340</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="inline mr-1" size={12} />
              +5.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,245</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="inline mr-1" size={12} />
              +15% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">728</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="inline mr-1" size={12} />
              +8% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="candidates" stroke="#8884d8" />
                <Line type="monotone" dataKey="employers" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Job Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {jobCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hiring Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" />
                <Bar dataKey="hires" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue">
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
                <ul className="list-disc pl-5">
                  <li>Job Postings: ₹15,000,000 (53.57%)</li>
                  <li>Premium Subscriptions: ₹8,000,000 (28.57%)</li>
                  <li>Featured Listings: ₹5,000,000 (17.86%)</li>
                </ul>
                <p>Top performing sector: IT & Software (₹10,500,000)</p>
              </div>
            </TabsContent>
            <TabsContent value="users">
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">User Statistics</h3>
                <ul className="list-disc pl-5">
                  <li>Total Registered Users: 65,000</li>
                  <li>Active Job Seekers: 45,000</li>
                  <li>Active Employers: 7,340</li>
                </ul>
                <p>User Retention Rate: 78%</p>
                <p>Average Session Duration: 15 minutes</p>
              </div>
            </TabsContent>
            <TabsContent value="jobs">
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Job Insights</h3>
                <ul className="list-disc pl-5">
                  <li>Total Job Postings: 3,245</li>
                  <li>Average Applications per Job: 22</li>
                  <li>Average Time to Fill a Position: 18 days</li>
                </ul>
                <p>Most In-Demand Skills: React, Python, Data Analysis</p>
                <p>Fastest Growing Job Category: Machine Learning Engineers (+45% YoY)</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}