"use client";

import React from "react";
import { useState } from "react";
import {
  CheckCircle,
  Circle,
  CalendarIcon,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LayoutPage from "../Layout";
import AppBar from "@/components/layout/AppBar";

// Mock data with links
const auditChecklist = [
  {
    id: 1,
    title: "Personal Data Collection and Consent",
    description: "Ensure user consent and data relevance for activities",
    completed: true,
    steps: [
      { text: "Review data collection processes", link: "/dashboard/datacollection" },
      { text: "Verify consent mechanisms", link: " " },
      { text: "Assess data relevance to business activities", link: " " },
    ],
  },
  {
    id: 2,
    title: "Data Security",
    description: "Evaluate storage, access, and encryption measures",
    completed: false,
    steps: [
      { text: "Confirm cloud service country compliance", link: "/dashboard/datasecurity" },
      { text: "Review password policies", link: "/password-policies" },
      { text: "Assess access level controls", link: " " },
      { text: "Verify data encryption methods", link: " " },
    ],
  },
  {
    id: 3,
    title: "Data Subject Rights",
    description: "Ensure compliance with data access rights",
    completed: false,
    steps: [
      { text: "Review data access request process", link: "/dashboard/datasubject" },
      { text: "Verify data portability measures", link: " " },
      { text: "Assess right to erasure procedures", link: " " },
    ],
  },
  {
    id: 4,
    title: "Data Breach Handling",
    description: "Evaluate prevention and recovery measures",
    completed: false,
    steps: [
      { text: "Review breach prevention strategies", link: "/dashboard/databreach" },
      { text: "Assess incident response plan", link: " " },
      { text: "Verify recovery procedures", link: " " },
      { text: "Test breach notification process", link: "" },
    ],
  },
];

export default function ComplianceAuditChecklist() {
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const nextAuditDate = "2024-06-15";

  const toggleChecklistCompletion = () => {
    setChecklistCompleted(!checklistCompleted);
  };

  return (
    <LayoutPage>
      <AppBar />
      <div className="container w-full bg-purple-200" style={{ height: "calc(100vh - 64px)", paddingTop: "150px" }}>
        <Card className="w-full max-w-3xl mx-auto pt-20">
          <CardHeader>
            <CardTitle className="text-2xl">Compliance Audit Checklist</CardTitle>
            <CardDescription>Complete these steps to ensure compliance with data protection regulations</CardDescription>
          </CardHeader>
          <CardContent>
            {checklistCompleted ? (
              <div className="text-center p-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Audit Checklist Completed</h3>
                <p className="mb-4">Great job! You can view the full report in the Reports tab.</p>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Audit Report
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {auditChecklist.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        {item.completed ? (
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="mr-2 h-5 w-5 text-gray-300" />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2 text-muted-foreground">{item.description}</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.steps.map((step, index) => (
                          <li key={index}>
                            <a
                              href={step.link}
                              className="text-blue-500 hover:underline"
                            >
                              {step.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Next audit: {nextAuditDate}</span>
            </div>
            <Button onClick={toggleChecklistCompletion}>
              {checklistCompleted ? "Reopen Checklist" : "Mark as Completed"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </LayoutPage>
  );
}
