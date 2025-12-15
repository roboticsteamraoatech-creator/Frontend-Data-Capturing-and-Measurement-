"use client";

import React from 'react';

const AdminObjectDimensionViewPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">View Object Dimension</h1>
        <p className="text-gray-600 mt-2">Detailed view of a specific object dimension record</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Object Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">User</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">December 15, 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Object Type</p>
                <p className="font-medium">Box</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dimension Data</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Length</p>
                <p className="font-medium">12 inches</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Width</p>
                <p className="font-medium">8 inches</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium">6 inches</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex space-x-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Edit Dimension
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Delete Dimension
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminObjectDimensionViewPage;