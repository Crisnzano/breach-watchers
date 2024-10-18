"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import LayoutPage from '../Layout'
import AppBar from '@/components/layout/AppBar'

const industries = [
  "Financial Services", "Agriculture", "Healthcare", "E-commerce", "Education",
  "Telecommunications", "Retail", "Hospitality", "Tourism", "Manufacturing",
  "Media and Entertainment"
]

const personalDataTypes = [
  "Names", "Contact information (email, phone)", "Financial information (bank details, credit card info)",
  "Identification documents (ID numbers, passports)", "Health information"
]

const consentMethods = [
  "Written consent forms", "Digital consent via website/app", "Verbally during interactions", "None"
]

const consentStorageMethods = [
  "Secure electronic database", "Physical records", "No specific system in place"
]

const dataRelevance = [
  "Essential for compliance with regulations", "Necessary for customer service and support",
  "Important for marketing and communication"
]

const dataHandlingMethods = [
  "Data encryption", "Access controls", "Regular backups", "Data minimization (only collecting necessary data)"
]

export default function DataCollectionQuestionnaire() {
  const [formData, setFormData] = useState({
    industry: '',
    personalData: [] as string[],
    consentMethods: [] as string[],
    consentStorage: '',
    dataRelevance: [] as string[],
    dataHandling: [] as string[],
    dataMapping: '',
    dataMappingProcess: ''
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
        <CardTitle>Personal Data Collection and Consent</CardTitle>
        <CardDescription>
          This questionnaire will help you evaluate your current practices concerning personal data and ensure compliance with the Kenya Data Protection Act, 2019.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Personal Data Section: Understanding Your Responsibilities</h2>
            <p className="text-sm text-muted-foreground">
              Under the Kenya Data Protection Act, 2019, organizations are required to adhere to strict guidelines regarding the collection, processing, and storage of personal data. As a financial business, it is crucial to ensure that you are compliant with these regulations to protect your clients' privacy and maintain their trust.
            </p>
            <h3 className="text-md font-semibold">Key Responsibilities:</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Data Collection: You must clearly identify the types of personal data you collect, ensuring that it is relevant and necessary for your operations.</li>
              <li>User Consent: Obtaining explicit consent from individuals before collecting and processing their data is essential. Consent must be informed, freely given, and easily revocable.</li>
              <li>Data Handling: Implement secure methods for handling and storing personal data to prevent unauthorized access, breaches, or misuse.</li>
              <li>Data Relevance: Regularly assess the relevance of the data you collect to ensure it aligns with your business needs and complies with data minimization principles.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label>1. What industry are you in?</Label>
            <Select onValueChange={(value) => handleInputChange('industry', value)} value={formData.industry}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>2. What types of personal data do you collect from your customers? (Select all that apply)</Label>
            {personalDataTypes.map((type) => (
              <div className="flex items-center space-x-2" key={type}>
                <Checkbox
                  id={type}
                  checked={formData.personalData.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('personalData', [...formData.personalData, type])
                    } else {
                      handleInputChange('personalData', formData.personalData.filter(t => t !== type))
                    }
                  }}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherPersonalData"
                checked={formData.personalData.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('personalData', [...formData.personalData, 'Other'])
                  } else {
                    handleInputChange('personalData', formData.personalData.filter(t => t !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherPersonalData">Other:</Label>
              <Textarea
                placeholder="Please specify"
                className="h-10"
                onChange={(e) => {
                  if (e.target.value && !formData.personalData.includes('Other')) {
                    handleInputChange('personalData', [...formData.personalData, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>3. How do you obtain consent from users for collecting and processing their personal data? (Select all that apply)</Label>
            {consentMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.consentMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('consentMethods', [...formData.consentMethods, method])
                    } else {
                      handleInputChange('consentMethods', formData.consentMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherConsentMethod"
                checked={formData.consentMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('consentMethods', [...formData.consentMethods, 'Other'])
                  } else {
                    handleInputChange('consentMethods', formData.consentMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherConsentMethod">Other:</Label>
              <Textarea
                placeholder="Please specify"
                className="h-10"
                onChange={(e) => {
                  if (e.target.value && !formData.consentMethods.includes('Other')) {
                    handleInputChange('consentMethods', [...formData.consentMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>4. How do you store and manage user consent records?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('consentStorage', value)} value={formData.consentStorage}>
              {consentStorageMethods.map((method) => (
                <div className="flex items-center space-x-2" key={method}>
                  <RadioGroupItem value={method} id={method} />
                  <Label htmlFor={method}>{method}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="otherConsentStorage" />
                <Label htmlFor="otherConsentStorage">Other:</Label>
                <Textarea
                  placeholder="Please specify"
                  className="h-10"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleInputChange('consentStorage', 'Other')
                    }
                  }}
                />
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>5. How is the personal data you collect relevant to your business operations and services? (Select all that apply)</Label>
            {dataRelevance.map((relevance) => (
              <div className="flex items-center space-x-2" key={relevance}>
                <Checkbox
                  id={relevance}
                  checked={formData.dataRelevance.includes(relevance)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataRelevance', [...formData.dataRelevance, relevance])
                    } else {
                      handleInputChange('dataRelevance', formData.dataRelevance.filter(r => r !== relevance))
                    }
                  }}
                />
                <Label htmlFor={relevance}>{relevance}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataRelevance"
                checked={formData.dataRelevance.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataRelevance', [...formData.dataRelevance, 'Other'])
                  } else {
                    handleInputChange('dataRelevance', formData.dataRelevance.filter(r => r !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataRelevance">Other:</Label>
              <Textarea
                placeholder="Please specify"
                className="h-10"
                onChange={(e) => {
                  if (e.target.value && !formData.dataRelevance.includes('Other')) {
                    handleInputChange('dataRelevance', [...formData.dataRelevance, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>6. How do you handle personal data within your organization? (Select all that apply)</Label>
            {dataHandlingMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.dataHandling.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataHandling', [...formData.dataHandling, method])
                    } else {
                      handleInputChange('dataHandling', formData.dataHandling.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataHandling"
                checked={formData.dataHandling.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataHandling', [...formData.dataHandling, 'Other'])
                  } else {
                    handleInputChange('dataHandling', formData.dataHandling.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataHandling">Other:</Label>
              <Textarea
                placeholder="Please specify"
                className="h-10"
                onChange={(e) => {
                  if (e.target.value && !formData.dataHandling.includes('Other')) {
                    handleInputChange('dataHandling', [...formData.dataHandling, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>7. Have you undertaken data mapping to understand the current and future use of data within your organization?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('dataMapping', value)} value={formData.dataMapping}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="dataMappingYes" />
                <Label htmlFor="dataMappingYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="dataMappingNo" />
                <Label htmlFor="dataMappingNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.dataMapping === 'Yes' && (
            <div className="space-y-2">
              <Label htmlFor="dataMappingProcess">If yes, please describe your data mapping process:</Label>
              <Textarea
                id="dataMappingProcess"
                placeholder="Describe your data mapping process"
                value={formData.dataMappingProcess}
                onChange={(e) => handleInputChange('dataMappingProcess', e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Questionnaire</Button>
        </CardFooter>
      </form>
    </Card>
    </LayoutPage>
  )
}