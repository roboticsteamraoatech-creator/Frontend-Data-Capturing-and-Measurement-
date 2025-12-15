"use client";

import React from 'react';

const AdminBodyMeasurementEditPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Body Measurement</h1>
        <p className="text-gray-600 mt-2">Edit an existing body measurement record</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
                User
              </label>
              <select
                id="user"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                defaultValue="John Doe"
              >
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
                Measurement Type
              </label>
              <select
                id="measurementType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                defaultValue="Manual"
              >
                <option>Manual</option>
                <option>AI Scan</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="chest" className="block text-sm font-medium text-gray-700 mb-1">
                Chest (inches)
              </label>
              <input
                type="number"
                id="chest"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="42"
                defaultValue="42"
              />
            </div>
            
            <div>
              <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
                Waist (inches)
              </label>
              <input
                type="number"
                id="waist"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="36"
                defaultValue="36"
              />
            </div>
            
            <div>
              <label htmlFor="hip" className="block text-sm font-medium text-gray-700 mb-1">
                Hip (inches)
              </label>
              <input
                type="number"
                id="hip"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="40"
                defaultValue="40"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Update Measurement
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBodyMeasurementEditPage;