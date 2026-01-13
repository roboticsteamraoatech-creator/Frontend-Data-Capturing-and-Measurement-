



"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import SubscriptionService from '@/services/subscriptionService';

interface SubscriptionPackage {
  id: string;
  packageName: string;
  services: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  setupDate: string;
  promoStartDate?: string;
  promoEndDate?: string;
  updatedDate: string;
  status: 'active' | 'inactive';
  description: string;
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPackage[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<SubscriptionPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // Use the subscription service to fetch data
        const { packages } = await SubscriptionService.getSubscriptionPackages(1, 10);
        
        setSubscriptions(packages);
        setFilteredSubscriptions(packages);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubscriptions();
  }, []);

  // Filter subscriptions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubscriptions(subscriptions);
    } else {
      const filtered = subscriptions.filter(subscription =>
        subscription.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.services.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscriptions(filtered);
    }
  }, [searchTerm, subscriptions]);

  const handleView = (subscription: SubscriptionPackage) => {
    // Navigate to view page
    window.location.href = `/super-admin/subscription/view/${subscription.id}`;
  };

  const handleEdit = (subscription: SubscriptionPackage) => {
    // Navigate to edit page
    window.location.href = `/super-admin/subscription/edit/${subscription.id}`;
  };

  const handleDelete = (subscription: SubscriptionPackage) => {
    if (confirm(`Are you sure you want to delete "${subscription.packageName}"? This action cannot be undone.`)) {
      // In a real app, this would call an API to delete the subscription
      setSubscriptions(subscriptions.filter(sub => sub.id !== subscription.id));
      setFilteredSubscriptions(filteredSubscriptions.filter(sub => sub.id !== subscription.id));
      alert('Subscription deleted successfully!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Subscription Management</h1>
            <p className="text-gray-600">Manage platform subscriptions</p>
          </div>
          
          {/* Add Package Button - Moved to top right */}
          <button 
            className="flex items-center justify-center bg-[#5D2A8B] text-white px-4 py-2 rounded-lg hover:bg-[#4a216d] transition-colors whitespace-nowrap self-start"
            onClick={() => window.location.href = '/super-admin/subscription/create'}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Package Subscription
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B]"
                  placeholder="Search by package name, description, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Search results info */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredSubscriptions.length} of {subscriptions.length} subscription packages
                {searchTerm && (
                  <span className="ml-2">
                    for "<span className="font-medium">{searchTerm}</span>"
                  </span>
                )}
              </div>
              
              {/* Clear Search Button (only shown when search is active) */}
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-[#5D2A8B] hover:text-[#4a216d] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Package Name</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Description</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Services</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Monthly Price</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Quarterly Price</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Yearly Price</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Subscribers</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Setup Date</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{subscription.packageName}</td>
                        <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                          {subscription.description}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {subscription.services}
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {formatCurrency(subscription.monthlyPrice)}
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {formatCurrency(subscription.quarterlyPrice)}
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {formatCurrency(subscription.yearlyPrice)}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${subscription.subscriberCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} font-medium`}>
                              {subscription.subscriberCount}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {formatDate(subscription.setupDate)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleView(subscription)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleEdit(subscription)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(subscription)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-12 px-4 text-center text-gray-500">
                        {searchTerm ? (
                          <div className="flex flex-col items-center">
                            <Search className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-lg font-medium text-gray-600">No subscriptions found</p>
                            <p className="text-gray-500 mb-4">Try a different search term</p>
                            <button 
                              onClick={() => setSearchTerm('')}
                              className="text-[#5D2A8B] hover:text-[#4a216d] hover:underline"
                            >
                              Clear search to see all packages
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-600">No subscription packages yet</p>
                            <p className="text-gray-500 mb-6">Get started by creating your first package</p>
                            <button 
                              className="flex items-center justify-center bg-[#5D2A8B] text-white px-6 py-3 rounded-lg hover:bg-[#4a216d] transition-colors"
                              onClick={() => window.location.href = '/super-admin/subscription/create'}
                            >
                              <Plus className="w-5 h-5 mr-2" />
                              Create First Package
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;