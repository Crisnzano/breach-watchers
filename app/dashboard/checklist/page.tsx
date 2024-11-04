"use client";

import React, { useEffect, useState } from "react";
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
import axios from 'axios';
import QuestionsModal from './QuestionsModal'; 
import { Modal, Box, CircularProgress, Typography } from '@mui/material'; 
import { useRouter } from "next/navigation";

interface Stage {
  id: number;
  stage_id: string;
  stage: string;
  completed: boolean; 
}

export default function ComplianceAuditChecklist() {
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const nextAuditDate = "2024-06-15";
  const [stages, setStages] = useState<Stage[]>([]);
  const [auditChecklist, setAuditChecklist] = useState<Stage[]>([]);
  const [completedStages, setCompletedStages] = useState<number[]>([]); 
  const [csrfToken, setCsrfToken] = useState('');
  const [answers, setAnswers] = useState<Record<number, Record<number, string[]>>>({});
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [reportLink, setReportLink] = useState('');

  const toggleChecklistCompletion = () => {
    setChecklistCompleted(!checklistCompleted);
  };

  const openQuestionsModal = (id: number, stage: string) => {
    setSelectedStage(id); 
    setShowQuestionsModal(true); 
  };

  const closeQuestionsModal = () => {
    setShowQuestionsModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-stages');
        const data = response.data;
        if (data.success && Array.isArray(data.data)) {
          const updatedData = data.data.map((item: any) => ({
            ...item,
            completed: false
          }));
          console.log('Fetched stages with completed field:', updatedData);
          setAuditChecklist(updatedData);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
      console.log('response from csrf', response.data.csrf_token);
      setCsrfToken(response.data.csrf_token);
    };
    getCsrfToken();
  }, []);

  const handleSaveAnswers = (stageId: number, selectedChoices: Record<number, string[]>) => {
    console.log(`Saving answers for stage ${stageId}:`, selectedChoices);
   
    setAnswers((prev) => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        ...selectedChoices, 
      },
    }));
    if (!completedStages.includes(stageId)) {
      setCompletedStages((prev) => [...prev, stageId]);
    }
  
    const updatedChecklist = auditChecklist.map((item) => {
      if (item.id === stageId) {
        return { ...item, completed: true }; 
      }
      return item;
    });
  
    setAuditChecklist(updatedChecklist);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsLoading(true); 
      setShowReportModal(true); 
      
      const userId = localStorage.getItem('userId');

      const response = await axios.post(
        'http://localhost:8000/api/submit-answers',
        {
          user_id: userId,
          answers: answers,
        },
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setChecklistCompleted(true); 
        console.log('All answers submitted successfully:', response.data);
        const reportLinkFromResponse = response.data.pdf_url; 
        setReportLink(reportLinkFromResponse); 

       
        setTimeout(() => {
          setIsLoading(false); 
          setShowReportModal(false);         
        }, 3000);
      } else {
        console.error('Failed to submit answers:', response.data.message);
        setIsLoading(false);
        setShowReportModal(false);
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      setIsLoading(false);
      setShowReportModal(false);
    }
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
                 <Button 
                  variant="outline" 
                  onClick={() => router.push(reportLink)} // Redirect to report download
                  disabled={!reportLink} // Disable if no report link
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Audit Report
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {auditChecklist.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger onClick={() => openQuestionsModal(item.id, item.stage)}>
                      <div className="flex items-center">
                        {item.completed ? (
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="mr-2 h-5 w-5 text-gray-300" />
                        )}
                        <span>{item.stage}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
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
            <Button
              onClick={handleFinalSubmit}
              disabled={completedStages.length !== auditChecklist.length}
            >
              Submit All Answers
            </Button>
          </CardFooter>
        </Card>
      </div>
  
      {/* Questions Modal */}
      {showQuestionsModal && selectedStage && (
        
        <QuestionsModal
          onShow={showQuestionsModal}
          stage={selectedStage}
          industry={1}
          onClose={closeQuestionsModal}
          onSave={handleSaveAnswers} 
        />
      )}

      {/* Modal showing loading and success message */}
      <Modal open={showReportModal} onClose={() => setShowReportModal(false)}>
        <Box sx={modalStyle}>
          {isLoading ? (
            <>
              <CircularProgress />
              <Typography variant="h6" mt={2}>We are generating your report...</Typography>
            </>
          ) : (
            <Typography variant="h6">Your report is ready!</Typography>
          )}
        </Box>
      </Modal>
    </LayoutPage>
  );
}

// Modal styles for MUI Modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

