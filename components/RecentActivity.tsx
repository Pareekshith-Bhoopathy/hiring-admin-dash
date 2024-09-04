import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivities = [
  { id: 1, action: "New job posted", company: "TCS", time: "2 hours ago" },
  { id: 2, action: "Candidate applied", job: "Software Engineer", time: "4 hours ago" },
  { id: 3, action: "Interview scheduled", company: "Infosys", time: "6 hours ago" },
  { id: 4, action: "New company registered", company: "Startup Inc.", time: "1 day ago" },
  { id: 5, action: "Job closed", job: "Product Manager", time: "2 days ago" },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  {activity.company || activity.job} - {activity.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}