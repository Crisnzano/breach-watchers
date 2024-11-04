import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import './QuestionsModal.css';

interface Question {
  id: number;
  question_id: string;
  question: string;
  choices: string[];
  choicesArray: { key: string; value: string }[];
  industry: string;
  stage: string;
  compliant_choices: string[];
}

interface QuestionsModalProps {
  onShow: boolean;
  stage: number;
  industry: number;
  onClose: () => void;
  onSave: (stageId: number, selectedChoices: Record<number, string[]>) => void; 
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({ onShow, stage, industry, onClose, onSave }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string[]>>({});
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('user id from supabase is ', userId);

    const fetchData = async (csrfToken: string) => {
      try {
        console.log('Using CSRF Token:', csrfToken);
        const response = await axios.post(
          `http://localhost:8000/api/get-questions/${stage}`,
          { user: userId },
          {
            headers: {
              'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
          }
        );
        const data = response.data;

        if (data.success && Array.isArray(data.data)) {
          console.log('Fetched questions:', data.data);

          // Process questions to parse choices
          const processedQuestions = data.data.map((question: { choices: string }) => {
            let choicesArray: { key: string; value: unknown }[] = [];
            try {
              const choices = JSON.parse(question.choices);
              choicesArray = Object.entries(choices).map(([key, value]) => ({
                key,
                value,
              }));
            } catch (error) {
              console.error('Error parsing choices:', error);
            }

            // Return the question with parsed choices
            return {
              ...question,
              choicesArray,
            };
          });

          console.log('Processed questions with choices:', processedQuestions);
          setQuestions(processedQuestions);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getCsrfToken = async () => {
      const response = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
      console.log('response from csrf', response.data.csrf_token);
      setCsrfToken(response.data.csrf_token);
      await fetchData(response.data.csrf_token);
    };
    if (onShow) {
      getCsrfToken();
    }
  }, [onShow, stage]); 

  const handleCheckboxChange = (questionId: number, choice: string) => {
    setSelectedChoices((prev) => {
      const currentChoices = prev[questionId] || [];
      if (currentChoices.includes(choice)) {
        return {
          ...prev,
          [questionId]: currentChoices.filter((c) => c !== choice),
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentChoices, choice],
        };
      }
    });
  };

  const handleSave = () => {
    onSave(stage, selectedChoices); 
    onClose(); 
  };

  return (
    <Modal open={onShow} onClose={onClose}>
      <div className="modal-content">
        <h2>Questions for Stage {stage}</h2>
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h3>{question.question}</h3>
            {question.choicesArray.map((choice) => (
              <FormControlLabel
                className="checkbox-label"
                key={choice.key}
                control={
                  <Checkbox
                    checked={selectedChoices[question.id]?.includes(choice.value as string) || false}
                    onChange={() => handleCheckboxChange(question.id, choice.value as string)}
                  />
                }
                label={choice.value as string}
              />
            ))}
          </div>
        ))}
        <div className="modal-footer">
          <Button variant="contained" onClick={handleSave}>Save Answers</Button>
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionsModal;
