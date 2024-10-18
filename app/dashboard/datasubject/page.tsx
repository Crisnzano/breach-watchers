"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LayoutPage from '../Layout'
import AppBar from '@/components/layout/AppBar'

const verificationMethods = [
  "Government-issued ID",
  "Security questions",
  "Not applicable"
]

const informationMethods = [
  "Privacy policy on the website",
  "During onboarding or registration",
  "Regular communications (e.g., newsletters)"
]

const dataPortabilityMethods = [
  "Provide data in a common format (e.g., CSV, JSON)",
  "Transfer data directly to another service provider",
  "No processes in place"
]

const refusalConditions = [
  "Verification of identity not provided",
  "Request is manifestly unfounded or excessive",
  "Legal obligations prevent compliance"
]

const trainingMethods = [
  "Regular training sessions",
  "Written guidelines and procedures",
  "No specific training"
]

export default function DataSubjectRightsQuestionnaire() {
  const [formData, setFormData] = useState({
    accessProcedures: '',
    verificationMethods: [] as string[],
    responseTime: '',
    correctionProcess: '',
    informationMethods: [] as string[],
    deletionProcess: '',
    dataPortabilityMethods: [] as string[],
    refusalConditions: [] as string[],
    recordMaintenance: '',
    trainingMethods: [] as string[]
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
    <Card className="w-full max-w-3xl mx-auto pt-11" >
      <CardHeader>
        <CardTitle>Data Subject Rights</CardTitle>
        <CardDescription>
          Assessing Your Organization's Compliance with Data Subject Rights
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Data Subject Rights Information Section</h2>
            <p className="text-sm text-muted-foreground">
              The Kenya Data Protection Act grants individuals specific rights regarding their personal data, designed to enhance transparency and empower data subjects.
            </p>
            <h3 className="text-md font-semibold">Key Rights:</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Right to Access: Individuals can request access to their personal data held by organizations, including information on processing purposes and data recipients.</li>
              <li>Right to Rectification: Individuals can request corrections to their data if it is inaccurate or incomplete.</li>
              <li>Right to Erasure: Individuals can request the deletion of their data when it is no longer needed for its original purpose.</li>
              <li>Right to Data Portability: Individuals can obtain their data in a structured format to transfer it to another controller.</li>
              <li>Right to Object: Individuals can object to data processing, especially for direct marketing.</li>
              <li>Right to Restrict Processing: Individuals can request limitations on the processing of their data under certain conditions.</li>
              <li>Right to Withdraw Consent: Individuals can withdraw consent for data processing at any time.</li>
            </ul>
            <h3 className="text-md font-semibold">Organizational Responsibilities:</h3>
            <p className="text-sm text-muted-foreground">
              Organizations must have procedures in place to facilitate these rights, including:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Clear communication on how to exercise rights.</li>
              <li>Verification processes for identity.</li>
              <li>Timely responses to requests.</li>
              <li>Staff training on data subject rights.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Understanding and upholding these rights is crucial for compliance and building trust with clients. Please respond to the following questions to assess your organization's practices regarding data subject rights.
            </p>
          </div>

          <div className="space-y-2">
            <Label>1. Do you have procedures in place for individuals to access their personal data?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('accessProcedures', value)} value={formData.accessProcedures}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="accessProceduresYes" />
                <Label htmlFor="accessProceduresYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="accessProceduresNo" />
                <Label htmlFor="accessProceduresNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="accessProceduresInDev" />
                <Label htmlFor="accessProceduresInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>2. How do you verify the identity of individuals requesting access to their personal data? (Select all that apply)</Label>
            {verificationMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.verificationMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('verificationMethods', [...formData.verificationMethods, method])
                    } else {
                      handleInputChange('verificationMethods', formData.verificationMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherVerificationMethod"
                checked={formData.verificationMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('verificationMethods', [...formData.verificationMethods, 'Other'])
                  } else {
                    handleInputChange('verificationMethods', formData.verificationMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherVerificationMethod">Other verification methods:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.verificationMethods.includes('Other')) {
                    handleInputChange('verificationMethods', [...formData.verificationMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>3. What is the average response time for processing data access requests?</Label>
            <Select onValueChange={(value) => handleInputChange('responseTime', value)} value={formData.responseTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select response time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Within 7 days">Within 7 days</SelectItem>
                <SelectItem value="Within 30 days">Within 30 days</SelectItem>
                <SelectItem value="Longer than 30 days">Longer than 30 days</SelectItem>
                <SelectItem value="Not applicable">Not applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>4. Do you have a process for individuals to request corrections to their personal data?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('correctionProcess', value)} value={formData.correctionProcess}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="correctionProcessYes" />
                <Label htmlFor="correctionProcessYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="correctionProcessNo" />
                <Label htmlFor="correctionProcessNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="correctionProcessInDev" />
                <Label htmlFor="correctionProcessInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>5. How do you inform individuals of their rights under the Kenya Data Protection Act? (Select all that apply)</Label>
            {informationMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.informationMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('informationMethods', [...formData.informationMethods, method])
                    } else {
                      handleInputChange('informationMethods', formData.informationMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherInformationMethod"
                checked={formData.informationMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('informationMethods', [...formData.informationMethods, 'Other'])
                  } else {
                    handleInputChange('informationMethods', formData.informationMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherInformationMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.informationMethods.includes('Other')) {
                    handleInputChange('informationMethods', [...formData.informationMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>6. Do you have a process for individuals to request the deletion of their personal data?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('deletionProcess', value)} value={formData.deletionProcess}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="deletionProcessYes" />
                <Label htmlFor="deletionProcessYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="deletionProcessNo" />
                <Label htmlFor="deletionProcessNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="deletionProcessInDev" />
                <Label htmlFor="deletionProcessInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>7. How do you handle requests for data portability? (Select all that apply)</Label>
            {dataPortabilityMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.dataPortabilityMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataPortabilityMethods', [...formData.dataPortabilityMethods, method])
                    } else {
                      handleInputChange('dataPortabilityMethods', formData.dataPortabilityMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataPortabilityMethod"
                checked={formData.dataPortabilityMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataPortabilityMethods', [...formData.dataPortabilityMethods, 'Other'])
                  } else {
                    handleInputChange('dataPortabilityMethods', formData.dataPortabilityMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataPortabilityMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.dataPortabilityMethods.includes('Other')) {
                    handleInputChange('dataPortabilityMethods', [...formData.dataPortabilityMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>8. Are there any conditions under which you would refuse to comply with a data subject's request? (Select all that apply)</Label>
            {refusalConditions.map((condition) => (
              <div className="flex items-center space-x-2" key={condition}>
                <Checkbox
                  id={condition}
                  checked={formData.refusalConditions.includes(condition)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('refusalConditions', [...formData.refusalConditions, condition])
                    } else {
                      handleInputChange('refusalConditions', formData.refusalConditions.filter(c => c !== condition))
                    }
                  }}
                />
                <Label htmlFor={condition}>{condition}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherRefusalCondition"
                
                checked={formData.refusalConditions.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('refusalConditions', [...formData.refusalConditions, 'Other'])
                  } else {
                    handleInputChange('refusalConditions', formData.refusalConditions.filter(c => c !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherRefusalCondition">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.refusalConditions.includes('Other')) {
                    handleInputChange('refusalConditions', [...formData.refusalConditions, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>9. Do you maintain a record of data subject requests and how they were handled?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('recordMaintenance', value)} value={formData.recordMaintenance}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="recordMaintenanceYes" />
                <Label htmlFor="recordMaintenanceYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="recordMaintenanceNo" />
                <Label htmlFor="recordMaintenanceNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In development" id="recordMaintenanceInDev" />
                <Label htmlFor="recordMaintenanceInDev">In development</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>10. How do you ensure staff are trained on data subject rights and the handling of requests? (Select all that apply)</Label>
            {trainingMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.trainingMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('trainingMethods', [...formData.trainingMethods, method])
                    } else {
                      handleInputChange('trainingMethods', formData.trainingMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherTrainingMethod"
                checked={formData.trainingMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('trainingMethods', [...formData.trainingMethods, 'Other'])
                  } else {
                    handleInputChange('trainingMethods', formData.trainingMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherTrainingMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.trainingMethods.includes('Other')) {
                    handleInputChange('trainingMethods', [...formData.trainingMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Questionnaire</Button>
        </CardFooter>
      </form>
    </Card>
    </LayoutPage>
  )
}