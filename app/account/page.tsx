"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const industries = [
  { value: "financial-services", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "education", label: "Education" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "retail", label: "Retail" },
  { value: "hospitality-tourism", label: "Hospitality and Tourism" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "media-entertainment", label: "Media and Entertainment" },
  { value: "agriculture", label: "Agriculture" },
]

export default function BusinessRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    industry: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleIndustryChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, industry: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form or show success message
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-purple-900">
      <CardHeader>
        <CardTitle>Business Registration</CardTitle>
        <CardDescription>Register your business for compliance management</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Acme Inc."
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Business St, City, Country"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select onValueChange={handleIndustryChange} value={formData.industry}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Register Business</Button>
        </CardFooter>
      </form>
    </Card>
  )
}