'use client';

import React, { useState, useEffect } from 'react';
import { useManualMeasurement, useSaveManualMeasurement } from '@/api/hooks/useManualMeasurement';
import { MeasurementSection, MeasurementData } from '@/api/hooks/useManualMeasurement';

interface MeasurementProfileProps {
  measurementId?: string;
}

const MeasurementProfile: React.FC<MeasurementProfileProps> = ({ measurementId }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    measurementType: '',
    subject: '',
  });
  
  const [sections, setSections] = useState<MeasurementSection[]>([
    { 
      sectionName: 'Upper Body', 
      measurements: [{ bodyPartName: 'Chest', size: '' }] 
    }
  ]);

  // Fetch measurement data if ID is provided
  const { data: measurement, isLoading, error, refetch } = useManualMeasurement(measurementId || null);

  // Save measurement hook
  const { mutate: saveMeasurement, isPending: isSaving, isSuccess, error: saveError } = useSaveManualMeasurement();

  // Handle success - this replaces the onSuccess callback that was incorrectly passed to mutate
  useEffect(() => {
    if (isSuccess) {
      setEditMode(false);
      if (measurementId) {
        refetch();
      }
    }
  }, [isSuccess, measurementId, refetch]);

  // Initialize form data when measurement data loads
  useEffect(() => {
    if (measurement && measurementId) {
      setFormData({
        firstName: measurement.firstName || '',
        lastName: measurement.lastName || '',
        measurementType: measurement.measurementType || '',
        subject: measurement.subject || '',
      });
      setSections(measurement.sections || []);
    }
  }, [measurement, measurementId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle section name change
  const handleSectionNameChange = (index: number, name: string) => {
    const newSections = [...sections];
    newSections[index].sectionName = name;
    setSections(newSections);
  };

  // Handle measurement field change
  const handleMeasurementChange = (sectionIndex: number, measurementIndex: number, field: keyof MeasurementData, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].measurements[measurementIndex] = {
      ...newSections[sectionIndex].measurements[measurementIndex],
      [field]: value
    };
    setSections(newSections);
  };

  // Add a new section
  const addSection = () => {
    setSections([...sections, { sectionName: '', measurements: [{ bodyPartName: '', size: '' }] }]);
  };

  // Add a new measurement to a section
  const addMeasurement = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].measurements.push({ bodyPartName: '', size: '' });
    setSections(newSections);
  };

  // Remove a section
  const removeSection = (index: number) => {
    if (sections.length > 1) {
      const newSections = [...sections];
      newSections.splice(index, 1);
      setSections(newSections);
    }
  };

  // Remove a measurement from a section
  const removeMeasurement = (sectionIndex: number, measurementIndex: number) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].measurements.length > 1) {
      newSections[sectionIndex].measurements.splice(measurementIndex, 1);
      setSections(newSections);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      ...formData,
      sections
    };
    
    saveMeasurement(requestData);
  };

  if (measurementId && isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (measurementId && error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading measurement</h3>
        <p className="text-red-600">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {measurementId ? 'Measurement Details' : 'Create New Measurement'}
        </h1>
        {!measurementId && (
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">Measurement saved successfully!</p>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">Error saving measurement: {(saveError as Error).message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editMode && !!measurementId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!editMode && !!measurementId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
                Measurement Type
              </label>
              <select
                id="measurementType"
                name="measurementType"
                value={formData.measurementType}
                onChange={handleInputChange}
                disabled={!editMode && !!measurementId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              >
                <option value="">Select type</option>
                <option value="Body Scan">Body Scan</option>
                <option value="Manual">Manual</option>
                <option value="AI Assisted">AI Assisted</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={!editMode && !!measurementId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Measurement Sections</h2>
            {editMode && (
              <button
                type="button"
                onClick={addSection}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                + Add Section
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <input
                    type="text"
                    value={section.sectionName}
                    onChange={(e) => handleSectionNameChange(sectionIndex, e.target.value)}
                    disabled={!editMode}
                    placeholder="Section name"
                    className="text-lg font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 px-0 py-0 disabled:text-gray-600"
                  />
                  {editMode && sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {section.measurements.map((measurement, measurementIndex) => (
                    <div key={measurementIndex} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                      <div className="md:col-span-5">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Body Part
                        </label>
                        <input
                          type="text"
                          value={measurement.bodyPartName}
                          onChange={(e) => handleMeasurementChange(sectionIndex, measurementIndex, 'bodyPartName', e.target.value)}
                          disabled={!editMode}
                          placeholder="e.g., Chest"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 text-sm"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Size (cm)
                        </label>
                        <input
                          type="text"
                          value={measurement.size}
                          onChange={(e) => handleMeasurementChange(sectionIndex, measurementIndex, 'size', e.target.value)}
                          disabled={!editMode}
                          placeholder="e.g., 102"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 text-sm"
                        />
                      </div>
                      {editMode && section.measurements.length > 1 && (
                        <div className="md:col-span-2">
                          <button
                            type="button"
                            onClick={() => removeMeasurement(sectionIndex, measurementIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {editMode && (
                  <button
                    type="button"
                    onClick={() => addMeasurement(sectionIndex)}
                    className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    + Add Measurement
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {((!measurementId || editMode) && sections.length > 0) && (
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : measurementId ? 'Update Measurement' : 'Create Measurement'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MeasurementProfile;