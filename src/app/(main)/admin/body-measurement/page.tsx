"use client";

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import ActionModal from '@/app/components/ActionModal';
import { MeasurementTopNav } from '@/app/components/MeasurementTopNav';

// Mock data for body measurements
const mockMeasurements = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    measurementType: 'Manual',
    sections: [
      {
        sectionName: 'Upper Body',
        measurements: [
          { bodyPartName: 'Chest', size: '92' },
          { bodyPartName: 'Waist', size: '80' },
          { bodyPartName: 'Hips', size: '95' }
        ]
      },
      {
        sectionName: 'Lower Body',
        measurements: [
          { bodyPartName: 'Thigh', size: '60' },
          { bodyPartName: 'Leg', size: '85' }
        ]
      }
    ],
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    measurementType: 'AI',
    sections: [
      {
        sectionName: 'Upper Body',
        measurements: [
          { bodyPartName: 'Chest', size: '88' },
          { bodyPartName: 'Waist', size: '75' },
          { bodyPartName: 'Hips', size: '90' }
        ]
      },
      {
        sectionName: 'Lower Body',
        measurements: [
          { bodyPartName: 'Thigh', size: '55' },
          { bodyPartName: 'Leg', size: '80' }
        ]
      }
    ],
    createdAt: '2023-05-16T14:45:00Z'
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    measurementType: 'Manual',
    sections: [
      {
        sectionName: 'Upper Body',
        measurements: [
          { bodyPartName: 'Chest', size: '100' },
          { bodyPartName: 'Waist', size: '85' },
          { bodyPartName: 'Hips', size: '102' }
        ]
      },
      {
        sectionName: 'Lower Body',
        measurements: [
          { bodyPartName: 'Thigh', size: '65' },
          { bodyPartName: 'Leg', size: '90' }
        ]
      }
    ],
    createdAt: '2023-05-17T09:15:00Z'
  }
];

const AdminBodyMeasurementPage = () => {
  const [selectedMeasurement, setSelectedMeasurement] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  
  // Get unique section names for table headers
  const getUniqueSectionNames = () => {
    const sectionNames = new Set<string>();
    
    mockMeasurements.forEach((item: any) => {
      item.sections?.forEach((section: any) => {
        sectionNames.add(section.sectionName);
      });
    });
    
    return Array.from(sectionNames);
  };

  // Get measurements for a specific section (only sizes)
  const getMeasurementsForSection = (item: any, sectionName: string) => {
    const section = item.sections?.find((s: any) => s.sectionName === sectionName);
    if (section && section.measurements && section.measurements.length > 0) {
      // Return only the sizes, not the body part names
      return section.measurements.map((m: any) => `${m.size}`).join(', ');
    }
    return '--';
  };

  const handleActionClick = (measurement: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMeasurement(measurement);
    setIsModalOpen(true);
    
    // Set modal position based on button position with better viewport awareness
    const button = e.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    
    // Calculate position relative to viewport
    const top = rect.bottom + window.scrollY + 5;
    const left = rect.left + window.scrollX - 50; // Adjust to center the modal on the button
    
    setModalPosition({
      top,
      left
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleView = () => {
    if (selectedMeasurement) {
      console.log('View measurement:', selectedMeasurement.id);
      // Implement view functionality
    }
  };

  const handleEdit = () => {
    if (selectedMeasurement) {
      console.log('Edit measurement:', selectedMeasurement.id);
      // Implement edit functionality
    }
  };

  const handleDelete = () => {
    if (selectedMeasurement) {
      console.log('Delete measurement:', selectedMeasurement.id);
      // Implement delete functionality
    }
    setIsModalOpen(false);
  };

  // Mock data for current measurement (for the top nav)
  const currentMeasurement = {
    chest: '92 cm',
    waist: '80 cm',
    hips: '95 cm',
    legs: '85 cm'
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* Measurement Top Nav */}
      <MeasurementTopNav 
        title="Current body measurement"
        measurements={currentMeasurement}
      />


      {/* Main Content */}
      <div className="w-full px-4 py-6 md:absolute md:w-[958px] md:top-[150px] md:left-[401px] md:px-0">
        {/* Header with Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="manrope text-xl md:text-3xl font-semibold text-gray-800">
            All Body Measurements
          </h1>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">User</th>
                  <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Measurement Type</th>
                  {/* Dynamic section headers */}
                  {getUniqueSectionNames().slice(0, 4).map((sectionName, index) => (
                    <th key={index} className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">
                      {sectionName}
                    </th>
                  ))}
                  <th className="manrope text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockMeasurements.map((measurement: any) => (
                  <tr key={measurement.id} className="hover:bg-gray-50">
                    <td className="manrope px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {measurement.firstName} {measurement.lastName}
                      </div>
                    </td>
                    <td className="manrope px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.email}
                    </td>
                    <td className="manrope px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.measurementType}
                    </td>
                    {/* Dynamic section measurements */}
                    {getUniqueSectionNames().slice(0, 4).map((sectionName, secIndex) => (
                      <td key={secIndex} className="manrope px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getMeasurementsForSection(measurement, sectionName)}
                      </td>
                    ))}
                    <td className="manrope px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => handleActionClick(measurement, e)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="space-y-4 p-4">
              {mockMeasurements.map((measurement: any) => (
                <div key={measurement.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="manrope font-semibold text-gray-900">
                        {measurement.firstName} {measurement.lastName}
                      </h3>
                      <p className="manrope text-sm text-gray-500 mt-1">
                        {measurement.email}
                      </p>
                      <p className="manrope text-sm text-gray-500 mt-1">
                        {measurement.measurementType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {getUniqueSectionNames().slice(0, 4).map((sectionName, secIndex) => (
                      <div key={secIndex} className="flex justify-between items-center">
                        <span className="manrope text-sm text-gray-500">{sectionName}:</span>
                        <span className="manrope text-sm font-medium text-gray-900">
                          {getMeasurementsForSection(measurement, sectionName)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={(e) => handleActionClick(measurement, e)}
                      className="manrope text-sm text-gray-500 hover:text-gray-700"
                    >
                      ...
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onViewMeasurement={handleView}
        onEditMeasurement={handleEdit}
        onDelete={handleDelete}
        position={modalPosition}
      />
    </div>
  );
};

export default AdminBodyMeasurementPage;