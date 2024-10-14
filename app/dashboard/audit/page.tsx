"use client"

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LayoutPage from '../Layout'
import AppBar from '@/components/layout/AppBar'

// Mock audit function
const auditWebsite = async (url: string): Promise<AuditResult> => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock audit result
  return {
    isCompliant: Math.random() > 0.5,
    issues: [
      { type: 'Cookie Consent', description: 'Cookie consent banner is missing or incomplete.' },
      { type: 'Privacy Policy', description: 'Privacy policy link is not easily accessible.' },
      { type: 'Data Collection', description: 'Forms are collecting data without explicit user consent.' },
    ].filter(() => Math.random() > 0.6) // Randomly include some issues
  }
}

type AuditResult = {
  isCompliant: boolean
  issues: Array<{ type: string; description: string }>
}

export default function WebsiteAudit() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)

  const handleAudit = async () => {
    if (!url) return

    setIsLoading(true)
    try {
      const result = await auditWebsite(url)
      setAuditResult(result)
    } catch (error) {
      console.error('Audit failed:', error)
      // Handle error state here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutPage>
      <AppBar/>
      <div className="container w-full bg-purple-200" style={{ height: 'calc(100vh - 64px)', paddingTop: '150px' }}>
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Website Compliance Audit</CardTitle>
        <CardDescription>
          Enter your website URL to check for data collection compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={handleAudit} disabled={isLoading || !url}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Audit'}
          </Button>
        </div>

        {auditResult && (
          <div className="mt-6 space-y-4">
            <Alert variant={auditResult.isCompliant ? "default" : "destructive"}>
              <AlertTitle className="flex items-center">
                {auditResult.isCompliant ? (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                )}
                {auditResult.isCompliant ? 'Website is compliant' : 'Compliance issues detected'}
              </AlertTitle>
              <AlertDescription>
                {auditResult.isCompliant
                  ? 'Your website appears to be following data collection best practices.'
                  : 'Your website may need improvements in its data collection practices.'}
              </AlertDescription>
            </Alert>

            {auditResult.issues.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Issues Found:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {auditResult.issues.map((issue, index) => (
                    <li key={index}>
                      <strong>{issue.type}:</strong> {issue.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          This audit checks for common compliance issues. For a comprehensive review, please consult with a legal professional.
        </p>
      </CardFooter>
    </Card>
    </div>
    </LayoutPage>
  )
}