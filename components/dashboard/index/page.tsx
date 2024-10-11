"use client";

import { useState } from "react";
import {
  CalendarIcon,
  DownloadCloudIcon,
  BellIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LayoutPage from "@/components/dashboard/Layout";
import AppBar from "@/components/layout/AppBar";

// Mock data
const complianceStatus = {
  status: "Yellow",
  score: 75,
  nextAuditDate: "2024-03-15",
  upcomingTasks: [
    { id: 1, task: "Annual data protection audit", deadline: "2024-03-15" },
    { id: 2, task: "Privacy policy review", deadline: "2024-02-28" },
    { id: 3, task: "Data breach notification drill", deadline: "2024-04-10" },
  ],
  recentReports: [
    { id: 1, title: "Q4 2023 Compliance Audit", date: "2023-12-31" },
    { id: 2, title: "Website Privacy Assessment", date: "2024-01-15" },
  ],
};

export default function ComplianceDashboard() {
  const [reminderSent, setReminderSent] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Green":
        return "bg-green-500";
      case "Yellow":
        return "bg-yellow-500";
      case "Red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const sendReminder = () => {
    // Simulating sending a reminder
    setTimeout(() => {
      setReminderSent(true);
      setTimeout(() => setReminderSent(false), 3000);
    }, 1000);
  };

  const downloadReport = () => {
    // Simulating report download
    alert("Downloading compliance report...");
  };

  return (
    <LayoutPage>
      <div
        className="container w-full h-full bg-purple-200 p-6 pt-20"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <h1 className="text-2xl font-bold mb-6 text-black">Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-200 text-black">
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Current compliance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div
                  className={`w-6 h-6 rounded-full ${getStatusColor(
                    complianceStatus.status
                  )}`}
                ></div>
                {/* Progress bar with custom main color */}
                <Progress
                  value={complianceStatus.score}
                  className="w-2/3 bg-gray-400"
                />
                <span className="font-semibold">{complianceStatus.score}%</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Next audit due: {complianceStatus.nextAuditDate}
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-gray-200 text-black">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Compliance tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {complianceStatus.upcomingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center text-black"
                  >
                    <span>{task.task}</span>
                    <Badge variant="secondary" className="mr-2">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {task.deadline}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-gray-200 text-black">
          <CardHeader>
            <CardTitle>Recent Audit Reports</CardTitle>
            <CardDescription>
              Download and view recent compliance reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {complianceStatus.recentReports.map((report) => (
                <li
                  key={report.id}
                  className="flex justify-between items-center"
                >
                  <span>{report.title}</span>
                  <div>
                    <Badge variant="secondary" className="mr-2">
                      {report.date}
                    </Badge>
                    <Button
                      className="bg-white"
                      size="sm"
                      variant="outline"
                      onClick={downloadReport}
                    >
                      <DownloadCloudIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  );
}