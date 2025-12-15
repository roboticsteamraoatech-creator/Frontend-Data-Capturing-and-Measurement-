"use client";

import React, { useState } from 'react';
import { MeasurementTopNav } from '@/app/components/MeasurementTopNav';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AdminDashboard = () => {
  const router = useRouter();
  
  // Mock data for current measurement (for the top nav)
  const currentMeasurement = {
    chest: '95 cm',
    waist: '82 cm',
    hips: '98 cm',
    legs: '88 cm'
  };

  // Mock data for dashboard statistics
  const stats = [
    { name: 'Total Users', value: '1,234' },
    { name: 'Active Users', value: '856' },
    { name: 'Body Measurements', value: '2,456' },
    { name: 'Object Dimensions', value: '1,876' },
    { name: 'Questionnaires', value: '987' },
    { name: 'Pending Approvals', value: '23' },
  ];

  // Mock data for recent activity
  const recentActivities = [
    { id: 1, action: 'New user registered', description: 'John Doe registered as a new user', time: '2 hours ago' },
    { id: 2, action: 'Body measurement submitted', description: 'Jane Smith submitted a new body measurement', time: '5 hours ago' },
    { id: 3, action: 'Questionnaire created', description: 'Mike Johnson created a new questionnaire', time: '1 day ago' },
    { id: 4, action: 'Object dimension added', description: 'Sarah Wilson added new object dimensions', time: '2 days ago' },
    { id: 5, action: 'User role updated', description: 'Admin changed Robert\'s role to organisation', time: '3 days ago' },
  ];

  const handleCreateNew = (type: string) => {
    // Navigate to respective creation pages
    switch(type) {
      case 'body':
        router.push('/admin/body-measurement/create');
        break;
      case 'object':
        router.push('/admin/object-dimension/create');
        break;
      case 'questionnaire':
        router.push('/admin/questionaire/create');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* Measurement Top Nav */}
      <MeasurementTopNav 
        title="Current system metrics"
        measurements={currentMeasurement}
      />

      {/* Overview Section - Responsive */}
      <div className="px-4 pt-4 md:pt-0 md:absolute md:w-[958px] md:top-[271px] md:left-[401px]">
        <h2 className="manrope text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Overview</h2>

        {/* Three Cards Container - Responsive Grid */}
        <div className="flex flex-col gap-4 md:flex-row md:absolute md:top-[56px] md:gap-[53px] mt-4 md:mt-0">
          {/* Card 1 - Total Body Measurement - Responsive */}
          <div className="relative w-full md:w-[284px] h-[146px] rounded-[20px] p-6" style={{ background: '#F4EFFA' }}>
            <div className="flex flex-col gap-3">
              <span className="manrope text-sm md:text-base font-normal leading-tight" style={{ color: '#6E6E6EB2' }}>
                Total Body Measurement
              </span>
              <span className="manrope text-2xl font-medium leading-tight text-[#1A1A1A]">
                128
              </span>
            </div>

            {/* Card Image */}
            <div className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ background: '#FFFFFF80' }}>
              <Image 
                src="/Body Streamline Ionic Filled.png" 
                alt="Body" 
                width={20} 
                height={20}
                className="object-contain"
              />
            </div>

            {/* Create New Button */}
            <button 
              className="manrope absolute bottom-4 right-4 px-3 py-1.5 rounded-[20px] text-xs" 
              style={{ background: '#FFFFFF80', color: '#5D2A8B' }}
              onClick={() => handleCreateNew('body')}
            >
              Create New
            </button>
          </div>

          {/* Card 2 - Total Object Measurement - Responsive */}
          <div className="relative w-full md:w-[284px] h-[146px] rounded-[20px] p-6" style={{ background: '#FBF8EF' }}>
            <div className="flex flex-col gap-3">
              <span className="manrope text-sm md:text-base font-normal leading-tight" style={{ color: '#6E6E6EB2' }}>
                Total Object Measurement
              </span>
              <span className="manrope text-2xl font-medium leading-tight text-[#1A1A1A]">
                87
              </span>
            </div>

            {/* Object Image */}
            <div className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ background: '#FFFFFF80' }}>
              <Image 
                src="/Object Scan Streamline Tabler Line.png" 
                alt="Object" 
                width={20} 
                height={20}
                className="object-contain"
              />
            </div>

            {/* Create New Button */}
            <button 
              className="manrope absolute bottom-4 right-4 px-3 py-1.5 rounded-[20px] text-xs" 
              style={{ background: '#FFFFFF80', color: '#5D2A8B' }}
              onClick={() => handleCreateNew('object')}
            >
              Create New
            </button>
          </div>

          {/* Card 3 - Total Questionnaire - Responsive */}
          <div className="relative w-full md:w-[284px] h-[146px] rounded-[20px] p-6" style={{ background: '#FCEEEE' }}>
            <div className="flex flex-col gap-3">
              <span className="manrope text-sm md:text-base font-normal leading-tight" style={{ color: '#6E6E6EB2' }}>
                Total Questionnaire
              </span>
              <span className="manrope text-2xl font-medium leading-tight text-[#1A1A1A]">
                42
              </span>
            </div>

            {/* Image */}
            <div className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ background: '#FFFFFF80' }}>
              <Image 
                src="/List Dropdown Streamline Carbon.png" 
                alt="Questionnaire" 
                width={20} 
                height={20}
                className="object-contain"
              />
            </div>

            {/* Create New Button */}
            <button 
              className="manrope absolute bottom-4 right-4 px-3 py-1.5 rounded-[20px] text-xs" 
              style={{ background: '#FFFFFF80', color: '#5D2A8B' }}
              onClick={() => handleCreateNew('questionnaire')}
            >
              Create New
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Section - Responsive */}
      <div className="mx-4 mb-20 md:mb-6 bg-white shadow-sm rounded-[20px] p-4 md:p-6 md:absolute md:w-[958px] md:top-[596px] md:left-[401px] md:mx-0">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="manrope text-xl md:text-[26px] font-semibold leading-tight text-[#1A1A1A]">
            Recent Activity
          </h2>
        </div>

        {/* Mobile Activity List - Hidden on Desktop */}
        <div className="md:hidden">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="manrope font-semibold text-gray-900">
                      {activity.action}
                    </h3>
                    <p className="manrope text-sm text-gray-500 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <span className="manrope text-xs text-gray-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Activity Table - Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Activity</th>
                <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Description</th>
                <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="manrope px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </div>
                  </td>
                  <td className="manrope px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.description}
                  </td>
                  <td className="manrope px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;