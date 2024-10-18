"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'
import LayoutPage from '../Layout'
import AppBar from '@/components/layout/AppBar'

const preventiveMeasures = [
  "Encryption of sensitive data",
  "Regular security audits",
  "Access controls and user permissions"
]

const detectionMethods = [
  "Intrusion detection systems",
  "Regular monitoring of systems",
  "Employee reporting mechanisms"
]

const breachResponseSteps = [
  "Contain the breach",
  "Assess the impact",
  "Notify affected individuals"
]

const documentationMethods = [
  "Incident log",
  "Post-incident review meetings",
  "No documentation process"
]

const recoveryPlanOptions = [
  "Data restoration procedures",
  "Communication strategies for stakeholders",
  "No specific recovery plan"
]

export default function DataBreachManagementQuestionnaire() {
  const [formData, setFormData] = useState({
    breachResponsePlan: '',
    trainingFrequency: '',
    preventiveMeasures: [] as string[],
    detectionMethods: [] as string[],
    breachResponseSteps: [] as string[],
    notificationProcedures: '',
    documentationMethods: [] as string[],
    recoveryPlan: [] as string[]
  })

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your backend
  }

  return (
    <LayoutPage>
      <AppBar/>
    <Card className="w-full max-w-3xl mx-auto pt-10">
      <CardHeader>
        <CardTitle>Data Breach Handling</CardTitle>
        <CardDescription>
          Assessing Your Organization's Breach Prevention and Recovery Measures
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>1. Do you have a documented data breach response plan?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('breachResponsePlan', value)} value={formData.breachResponsePlan}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="breachResponsePlanYes" />
                <Label htmlFor="breachResponsePlanYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="breachResponsePlanNo" />
                <Label htmlFor="breachResponsePlanNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="breachResponsePlanInDev" />
                <Label htmlFor="breachResponsePlanInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>2. How often do you conduct training on breach response procedures for employees?</Label>
            <Select onValueChange={(value) => handleInputChange('trainingFrequency', value)} value={formData.trainingFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regularly (e.g., quarterly)">Regularly (e.g., quarterly)</SelectItem>
                <SelectItem value="Annually">Annually</SelectItem>
                <SelectItem value="Never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>3. What preventive measures do you have in place to minimize the risk of data breaches? (Select all that apply)</Label>
            {preventiveMeasures.map((measure) => (
              <div className="flex items-center space-x-2" key={measure}>
                <Checkbox
                  id={measure}
                  checked={formData.preventiveMeasures.includes(measure)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('preventiveMeasures', [...formData.preventiveMeasures, measure])
                    } else {
                      handleInputChange('preventiveMeasures', formData.preventiveMeasures.filter(m => m !== measure))
                    }
                  }}
                />
                <Label htmlFor={measure}>{measure}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherPreventiveMeasure"
                checked={formData.preventiveMeasures.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('preventiveMeasures', [...formData.preventiveMeasures, 'Other'])
                  } else {
                    handleInputChange('preventiveMeasures', formData.preventiveMeasures.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherPreventiveMeasure">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.preventiveMeasures.includes('Other')) {
                    handleInputChange('preventiveMeasures', [...formData.preventiveMeasures, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>4. How do you detect potential data breaches? (Select all that apply)</Label>
            {detectionMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.detectionMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('detectionMethods', [...formData.detectionMethods, method])
                    } else {
                      handleInputChange('detectionMethods', formData.detectionMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDetectionMethod"
                checked={formData.detectionMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('detectionMethods', [...formData.detectionMethods, 'Other'])
                  } else {
                    handleInputChange('detectionMethods', formData.detectionMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDetectionMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.detectionMethods.includes('Other')) {
                    handleInputChange('detectionMethods', [...formData.detectionMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>5. What steps do you take immediately following the discovery of a breach? (Select all that apply)</Label>
            {breachResponseSteps.map((step) => (
              <div className="flex items-center space-x-2" key={step}>
                <Checkbox
                  id={step}
                  checked={formData.breachResponseSteps.includes(step)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('breachResponseSteps', [...formData.breachResponseSteps, step])
                    } else {
                      handleInputChange('breachResponseSteps', formData.breachResponseSteps.filter(s => s !== step))
                    }
                  }}
                />
                <Label htmlFor={step}>{step}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherBreachResponseStep"
                checked={formData.breachResponseSteps.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('breachResponseSteps', [...formData.breachResponseSteps, 'Other'])
                  } else {
                    handleInputChange('breachResponseSteps', formData.breachResponseSteps.filter(s => s !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherBreachResponseStep">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.breachResponseSteps.includes('Other')) {
                    handleInputChange('breachResponseSteps', [...formData.breachResponseSteps, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>6. Do you have procedures for notifying the relevant authorities in the event of a breach?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('notificationProcedures', value)} value={formData.notificationProcedures}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="notificationProceduresYes" />
                <Label htmlFor="notificationProceduresYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="notificationProceduresNo" />
                <Label htmlFor="notificationProceduresNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="notificationProceduresInDev" />
                <Label htmlFor="notificationProceduresInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>7. How do you document and review incidents of data breaches? (Select all that apply)</Label>
            {documentationMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.documentationMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('documentationMethods', [...formData.documentationMethods, method])
                    } else {
                      handleInputChange('documentationMethods', formData.documentationMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDocumentationMethod"
                checked={formData.documentationMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('documentationMethods', [...formData.documentationMethods, 'Other'])
                  } else {
                    handleInputChange('documentationMethods', formData.documentationMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDocumentationMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.documentationMethods.includes('Other')) {
                    handleInputChange('documentationMethods', [...formData.documentationMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>8. Do you have a plan for recovery after a breach? (Select all that apply)</Label>
            {recoveryPlanOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <Checkbox
                  id={option}
                  checked={formData.recoveryPlan.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('recoveryPlan', [...formData.recoveryPlan, option])
                    } else {
                      handleInputChange('recoveryPlan', formData.recoveryPlan.filter(o => o !== option))
                    }
                  }}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherRecoveryPlanOption"
                checked={formData.recoveryPlan.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('recoveryPlan', [...formData.recoveryPlan, 'Other'])
                  } else {
                    handleInputChange('recoveryPlan', formData.recoveryPlan.filter(o => o !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherRecoveryPlanOption">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.recoveryPlan.includes('Other')) {
                    handleInputChange('recoveryPlan', [...formData.recoveryPlan, 'Other'])
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" className="w-full">Submit Questionnaire</Button>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Call to Action</AlertTitle>
            <AlertDescription>
              To learn more about handling data breaches effectively, including step-by-step guidelines and best practices, please visit our Data Breach Response Guide. Understanding these processes is vital for compliance with the Kenya Data Protection Act and for protecting your organization's  reputation.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </form>
    </Card>
    </LayoutPage>
  )
}