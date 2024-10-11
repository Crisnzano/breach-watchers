"use client"
import React from 'react';
import LayoutPage from '../Layout';
import AppBar from '@/components/layout/AppBar';

const Audit = () => {
  return (
    <LayoutPage>
      <AppBar/>
      <div className="container w-full bg-purple-200" style={{ height: 'calc(100vh - 64px)', paddingTop: '150px' }}>
      <h1>Website Audit</h1>
      {/* Add your audit content here */}
      </div>
    </LayoutPage>
  );
};

export default Audit;
