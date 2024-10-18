"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import LayoutPage from '../Layout'
import AppBar from '@/components/layout/AppBar'

const dataStorageOptions = [
  "On-premises servers",
  "Third-party cloud service providers",
  "Hybrid (combination of on-premises and cloud)"
]

const passwordPolicies = [
  "Minimum password length",
  "Regular password changes (e.g., every 3 months)",
  "Multi-factor authentication",
  "No specific policy"
]

const accessControls = [
  "Role-based access control (RBAC)",
  "Need-to-know basis",
  "Unrestricted access"
]

const encryptionMethods = [
  "At rest (stored data)",
  "In transit (data being transmitted)",
  "No encryption in place"
]

const auditFrequencies = [
  "Monthly",
  "Quarterly",
  "Annually",
  "Never"
]

const trainingMethods = [
  "Regular training sessions",
  "Online courses on data protection",
  "No training provided"
]

const dataBreachMeasures = [
  "Incident response plan",
  "Notification procedures for affected individuals",
  "No specific measures"
]

const dataConfidentialityMeasures = [
  "Data minimization practices",
  "Regular review of data access permissions"
]

export default function DataSecurityQuestionnaire() {
  const [formData, setFormData] = useState({
    dataStorage: [] as string[],
    cloudServiceCountry: '',
    passwordPolicies: [] as string[],
    accessControls: [] as string[],
    encryptionMethods: [] as string[],
    auditFrequency: '',
    trainingMethods: [] as string[],
    dataBreachMeasures: [] as string[],
    dataConfidentialityMeasures: [] as string[]
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
        <CardTitle>Data Security</CardTitle>
        <CardDescription>
          This questionnaire will help you evaluate your organization's data security practices in relation to the Kenya Data Protection Act.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Data Security Information Section</h2>
            <p className="text-sm text-muted-foreground">
              In compliance with the Kenya Data Protection Act, organizations are required to implement appropriate technical and organizational measures to ensure the security of personal data. This includes protecting data from unauthorized access, loss, destruction, or damage. The Act emphasizes the importance of data security not only to safeguard personal information but also to maintain trust and confidence among stakeholders.
            </p>
            <h3 className="text-md font-semibold">Key Principles of Data Security Under the Kenya Data Protection Act:</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Accountability: Organizations must take responsibility for the personal data they process and ensure that they implement adequate security measures.</li>
              <li>Data Minimization: Only data that is necessary for the intended purpose should be collected and stored. This helps reduce the risk associated with data breaches.</li>
              <li>Access Controls: Implementing strict access controls ensures that only authorized personnel can access sensitive personal data, minimizing the risk of unauthorized use.</li>
              <li>Encryption: Encrypting personal data both in transit and at rest adds an essential layer of security, protecting data even if it is intercepted or accessed without authorization.</li>
              <li>Regular Audits: Conducting regular security audits helps identify vulnerabilities and ensures compliance with the provisions of the Act.</li>
              <li>Training and Awareness: Providing employees with training on data protection and security practices is crucial for maintaining a culture of compliance and safeguarding personal data.</li>
              <li>Incident Response: Organizations must have clear procedures in place for responding to data breaches, including notifying affected individuals and relevant authorities, as required by the Act.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label>1. Where do you store personal data? (Select all that apply)</Label>
            {dataStorageOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <Checkbox
                  id={option}
                  checked={formData.dataStorage.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataStorage', [...formData.dataStorage, option])
                    } else {
                      handleInputChange('dataStorage', formData.dataStorage.filter(o => o !== option))
                    }
                  }}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
            {formData.dataStorage.includes("Third-party cloud service providers") && (
              <div className="ml-6 mt-2">
                <Label htmlFor="cloudServiceCountry">Specify country:</Label>
                <Input
                  id="cloudServiceCountry"
                  value={formData.cloudServiceCountry}
                  onChange={(e) => handleInputChange('cloudServiceCountry', e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataStorage"
                checked={formData.dataStorage.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataStorage', [...formData.dataStorage, 'Other'])
                  } else {
                    handleInputChange('dataStorage', formData.dataStorage.filter(o => o !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataStorage">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.dataStorage.includes('Other')) {
                    handleInputChange('dataStorage', [...formData.dataStorage, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>2. What password policies do you enforce to protect personal data? (Select all that apply)</Label>
            {passwordPolicies.map((policy) => (
              <div className="flex items-center space-x-2" key={policy}>
                <Checkbox
                  id={policy}
                  checked={formData.passwordPolicies.includes(policy)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('passwordPolicies', [...formData.passwordPolicies, policy])
                    } else {
                      handleInputChange('passwordPolicies', formData.passwordPolicies.filter(p => p !== policy))
                    }
                  }}
                />
                <Label htmlFor={policy}>{policy}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherPasswordPolicy"
                checked={formData.passwordPolicies.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('passwordPolicies', [...formData.passwordPolicies, 'Other'])
                  } else {
                    handleInputChange('passwordPolicies', formData.passwordPolicies.filter(p => p !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherPasswordPolicy">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.passwordPolicies.includes('Other')) {
                    handleInputChange('passwordPolicies', [...formData.passwordPolicies, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>3. What access controls do you implement for sensitive personal data? (Select all that apply)</Label>
            {accessControls.map((control) => (
              <div className="flex items-center space-x-2" key={control}>
                <Checkbox
                  id={control}
                  checked={formData.accessControls.includes(control)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('accessControls', [...formData.accessControls, control])
                    } else {
                      handleInputChange('accessControls', formData.accessControls.filter(c => c !== control))
                    }
                  }}
                />
                <Label htmlFor={control}>{control}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherAccessControl"
                checked={formData.accessControls.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('accessControls', [...formData.accessControls, 'Other'])
                  } else {
                    handleInputChange('accessControls', formData.accessControls.filter(c => c !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherAccessControl">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.accessControls.includes('Other')) {
                    handleInputChange('accessControls', [...formData.accessControls, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>4. How do you encrypt personal data? (Select all that apply)</Label>
            {encryptionMethods.map((method) => (
              <div className="flex items-center space-x-2" key={method}>
                <Checkbox
                  id={method}
                  checked={formData.encryptionMethods.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('encryptionMethods', [...formData.encryptionMethods, method])
                    } else {
                      handleInputChange('encryptionMethods', formData.encryptionMethods.filter(m => m !== method))
                    }
                  }}
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherEncryptionMethod"
                checked={formData.encryptionMethods.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('encryptionMethods', [...formData.encryptionMethods, 'Other'])
                  } else {
                    handleInputChange('encryptionMethods', formData.encryptionMethods.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherEncryptionMethod">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.encryptionMethods.includes('Other')) {
                    handleInputChange('encryptionMethods', [...formData.encryptionMethods, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>5. How often do you conduct security audits or assessments in compliance with the Act?</Label>
            <RadioGroup onValueChange={(value) => handleInputChange('auditFrequency', value)} value={formData.auditFrequency}>
              {auditFrequencies.map((frequency) => (
                <div className="flex items-center space-x-2" key={frequency}>
                  <RadioGroupItem value={frequency} id={frequency} />
                  <Label htmlFor={frequency}>{frequency}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>6. What training do you provide to employees regarding data security and compliance with the Act? (Select all that apply)</Label>
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

          <div className="space-y-2">
            <Label>7. What measures do you have in place for responding to data breaches as required by the Act? (Select all that apply)</Label>
            {dataBreachMeasures.map((measure) => (
              <div className="flex items-center space-x-2" key={measure}>
                <Checkbox
                  
                  id={measure}
                  checked={formData.dataBreachMeasures.includes(measure)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataBreachMeasures', [...formData.dataBreachMeasures, measure])
                    } else {
                      handleInputChange('dataBreachMeasures', formData.dataBreachMeasures.filter(m => m !== measure))
                    }
                  }}
                />
                <Label htmlFor={measure}>{measure}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataBreachMeasure"
                checked={formData.dataBreachMeasures.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataBreachMeasures', [...formData.dataBreachMeasures, 'Other'])
                  } else {
                    handleInputChange('dataBreachMeasures', formData.dataBreachMeasures.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataBreachMeasure">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.dataBreachMeasures.includes('Other')) {
                    handleInputChange('dataBreachMeasures', [...formData.dataBreachMeasures, 'Other'])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>8. How do you ensure the confidentiality and integrity of personal data collected? (Select all that apply)</Label>
            {dataConfidentialityMeasures.map((measure) => (
              <div className="flex items-center space-x-2" key={measure}>
                <Checkbox
                  id={measure}
                  checked={formData.dataConfidentialityMeasures.includes(measure)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('dataConfidentialityMeasures', [...formData.dataConfidentialityMeasures, measure])
                    } else {
                      handleInputChange('dataConfidentialityMeasures', formData.dataConfidentialityMeasures.filter(m => m !== measure))
                    }
                  }}
                />
                <Label htmlFor={measure}>{measure}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherDataConfidentialityMeasure"
                checked={formData.dataConfidentialityMeasures.includes('Other')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('dataConfidentialityMeasures', [...formData.dataConfidentialityMeasures, 'Other'])
                  } else {
                    handleInputChange('dataConfidentialityMeasures', formData.dataConfidentialityMeasures.filter(m => m !== 'Other'))
                  }
                }}
              />
              <Label htmlFor="otherDataConfidentialityMeasure">Other:</Label>
              <Input
                placeholder="Please specify"
                onChange={(e) => {
                  if (e.target.value && !formData.dataConfidentialityMeasures.includes('Other')) {
                    handleInputChange('dataConfidentialityMeasures', [...formData.dataConfidentialityMeasures, 'Other'])
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