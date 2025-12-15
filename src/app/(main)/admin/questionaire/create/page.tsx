"use client";

import React from 'react';

const AdminQuestionnaireCreatePage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Questionnaire</h1>
        <p className="text-gray-600 mt-2">Create a new questionnaire for users</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Questionnaire Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Health & Fitness Assessment"
              />
            </div>
            
            <div>
              <label htmlFor="targetUsers" className="block text-sm font-medium text-gray-700 mb-1">
                Target Users
              </label>
              <select
                id="targetUsers"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>All Users</option>
                <option>Body Measurement Users</option>
                <option>Object Dimension Users</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Questions
            </label>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your question here..."
                  />
                </div>
                <div className="w-1/3">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Text Input</option>
                    <option>Multiple Choice</option>
                    <option>Yes/No</option>
                    <option>Rating Scale</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="px-3 py-2 text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
              
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                + Add Question
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Create Questionnaire
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

export default AdminQuestionnaireCreatePage;