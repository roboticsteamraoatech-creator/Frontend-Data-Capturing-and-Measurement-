"use client";

import React from 'react';

const AdminObjectDimensionEditPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Object Dimension</h1>
        <p className="text-gray-600 mt-2">Edit an existing object dimension record</p>
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
              <label htmlFor="objectType" className="block text-sm font-medium text-gray-700 mb-1">
                Object Type
              </label>
              <input
                type="text"
                id="objectType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Box, Cylinder, etc."
                defaultValue="Box"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                Length (inches)
              </label>
              <input
                type="number"
                id="length"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="12"
                defaultValue="12"
              />
            </div>
            
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                Width (inches)
              </label>
              <input
                type="number"
                id="width"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="8"
                defaultValue="8"
              />
            </div>
            
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (inches)
              </label>
              <input
                type="number"
                id="height"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="6"
                defaultValue="6"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Update Dimension
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

export default AdminObjectDimensionEditPage;