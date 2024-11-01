"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'; 
import Router from 'next/router';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios';



interface Industry {
  id: string;
  industry_name: string;
}

export default function BusinessRegistrationForm() {
  console.log('BusinessRegistrationForm rendered');
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    industry: '',
    industryName: ''
  })

   // State to hold the fetched data
   const [industries, setIndustries] = useState<Industry[]>([]);
   const [selectedIndustry, setSelectedIndustry] = useState('');
   const [csrfToken, setCsrfToken] = useState('');
   const [user, setUser] = useState('');
   useEffect(() => {
    //Fetch industries data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-industries');
        
        const data = response.data;
        
        if (data.success && Array.isArray(data.data)) {
          console.log('Fetched industries:', data.data);
          setIndustries(data.data); 
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
    // Fetch the CSRF token
    const userId = localStorage.getItem('userId');
    console.log('user id from supabase is ', userId);
      const getCsrfToken = async () => {
        const response = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
        console.log('response from csrf', response.data.csrf_token);
        setCsrfToken(response.data.csrf_token);
    };
    getCsrfToken();
  }, []);
  // const getCsrfToken = async () => {
  //   try {
  //     await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
  //       withCredentials: true, 
  //     });
  //   } catch (error) {
  //     console.error('Error fetching CSRF token:', error);
  //   }
  // };
  // const getCsrfToken = async () => {
  //         const response = await axios.get('http://localhost:8000/api/csrf-token', { withCredentials: true });
  //         console.log('response from csrf', response.data.csrf_token);
  //         setCsrfToken(response.data.csrf_token);
  //     };
  const getUserDetails = async () => {
    try {
     // getCsrfToken();
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        withCredentials: true,
      });
      const userData = response.data;
      const userId = userData.identities[0]?.id || 'No ID found'; 
      setUser(userId); 
      localStorage.setItem('user', userId); 
      console.log('user data from supabase: ',response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  // useEffect(() => {
  //   if (csrfToken) {
  //     getUserDetails();
  //   }
  // }, [csrfToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleIndustryChange = (value: string) => {
    console.log('industry: ', value);

    const selectedIndustry = industries.find(industry => industry.id === value);
    console.log('industry name: ', selectedIndustry?.industry_name);

    // Update form data based on selected industry
    setFormData(prevData => ({
      ...prevData,
      industry: value,
      industryName: selectedIndustry ? selectedIndustry.industry_name : '' // Default to empty string
    }));

    // Log formData after state update
    console.log('Updated form data:', {
      ...formData,
      industry: value,
      industryName: selectedIndustry ? selectedIndustry.industry_name : ''
    });
  };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('csrf token is ', csrfToken);
    const userData = localStorage.getItem('userId');
    if(!userData){
      console.error('User info not found');
    }else{
      const updatedFormData = { 
        ...formData, 
        user: userData 
      };
     
      if (!csrfToken) {
          console.error('CSRF token not set');
        //  return;
      }else{
        console.log('CSRF token set');
      }
      try {
        const response = await axios.post('http://localhost:8000/api/register-business', updatedFormData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          withCredentials: true
        });
        const data = response.data;
          if (data.success) {
            console.log('Business registered successfully:');
            router.push('/protected');
          } else {
            console.error('Error registering business:', data.message);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }
   
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
            <Select onValueChange={handleIndustryChange} value={formData.industry} 
                disabled={industries.length === 0} >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry">
                    {formData.industryName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.industry_name}
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