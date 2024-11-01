"use client";

import { useEffect, useState } from 'react';
import { CalendarIcon, DownloadCloudIcon, BellIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LayoutPage from '../Layout';
import AppBar from '@/components/layout/AppBar';
import axios from 'axios';
import { UUID } from 'crypto';
interface Report {
  id: number;
  report_name: string;
  report_link: string;
  created_at: string;
  user_id: UUID; // Changed to boolean for easier tracking
}

export default function ComplianceDashboard() {
  const [reminderSent, setReminderSent] = useState(false);
  const [recentReports, setRecentReports] =useState<Report[]>([]); 
  const [csrfToken, setCsrfToken] = useState('');

  const complianceStatus = {
    status: 'Yellow',
    score: 75,
    nextAuditDate: '2024-03-15',
    upcomingTasks: [
      { id: 1, task: 'Annual data protection audit', deadline: '2024-03-15' },
      { id: 2, task: 'Privacy policy review', deadline: '2024-02-28' },
      { id: 3, task: 'Data breach notification drill', deadline: '2024-04-10' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Green':
        return 'bg-green-500';
      case 'Yellow':
        return 'bg-yellow-500';
      case 'Red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    // Format the date to YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  const sendReminder = () => {
    // Simulating sending a reminder
    setTimeout(() => {
      setReminderSent(true);
      setTimeout(() => setReminderSent(false), 3000);
    }, 1000);
  };

  const downloadReport = (reportLink: string) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = reportLink;
    link.target = '_blank'; // Open in a new tab (optional)
    link.download = ''; // This attribute tells the browser to download the file instead of navigating to it
  
    // Append the anchor to the body
    document.body.appendChild(link);
  
    // Trigger the click event
    link.click();
  
    // Remove the anchor from the document
    document.body.removeChild(link);
  };
  
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const response = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
  //     console.log('response from csrf', response.data.csrf_token);
  //     setCsrfToken(response.data.csrf_token);
  //   };
  //   getCsrfToken();
  // }, []);

  // Fetch recent reports from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch CSRF token
        const csrfResponse = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
        console.log('response from csrf', csrfResponse.data.csrf_token);
        setCsrfToken(csrfResponse.data.csrf_token);

        // Fetch recent reports using the CSRF token
        const userData = localStorage.getItem('userId');
        const reportsResponse = await axios.post('http://localhost:8000/api/recent-reports', { 'user': userData }, {
          headers: {
            'X-CSRF-TOKEN': csrfResponse.data.csrf_token, // Use the fetched CSRF token here
          },
          withCredentials: true,
        });

        if (reportsResponse.data.success && Array.isArray(reportsResponse.data.data)) {
          setRecentReports(reportsResponse.data.data);
        } else {
          console.error('Failed to fetch reports:', reportsResponse.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <LayoutPage>
      <AppBar />
      <div className="container w-full bg-purple-200" style={{ height: 'calc(100vh - 64px)', paddingTop: '150px' }}>
        <h1 className="text-3xl font-bold mb-6 text-black">Compliance Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Current compliance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full ${getStatusColor(complianceStatus.status)}`}></div>
                <Progress value={complianceStatus.score} className="w-2/3" />
                <span className="font-semibold">{complianceStatus.score}%</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Next audit due: {complianceStatus.nextAuditDate}
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Compliance tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {complianceStatus.upcomingTasks.map((task) => (
                  <li key={task.id} className="flex justify-between items-center">
                    <span>{task.task}</span>
                    <Badge variant="outline">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {task.deadline}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Audit Reports</CardTitle>
            <CardDescription>Download and view recent compliance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentReports.map((report) => (
                <li key={report.id} className="flex justify-between items-center">
                  <span>{report.report_name}</span>
                  <div>
                    <Badge variant="secondary" className="mr-2"> {formatDate(report.created_at)} </Badge>
                    <Button size="sm" variant="outline" onClick={() => downloadReport(report.report_link)}>
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
