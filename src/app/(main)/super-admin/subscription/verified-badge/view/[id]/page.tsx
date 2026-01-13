"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building, MapPin, User, Mail, Phone, Globe, DollarSign, Calendar, Hash } from 'lucide-react';

interface Branch {
  id: string;
  branchName: string;
  houseNumber: string;
  streetName: string;
  cityRegion: string;
  buildingType?: string;
  lga: string;
  state: string;
  country: string;
  contactPerson?: string;
  contactPosition?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface Organization {
  id: string;
  serialNumber: number;
  name: string;
  totalSubscriptionAmount: number;
  currency: string;
  totalLocations: number;
  headquarters: string;
  locationVerificationCost: number;
  subscriptionDuration: string;
  address: string;
  city: string;
  lga: string;
  state: string;
  country: string;
  branches: Branch[];
  createdAt: string;
  updatedAt: string;
}

interface ViewVerifiedBadgePageProps {
  params: {
    id: string;
  };
}

const ViewVerifiedBadgePage = ({ params }: ViewVerifiedBadgePageProps) => {
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sample organization data
      const sampleOrganization: Organization = {
        id: params.id,
        serialNumber: parseInt(params.id.replace('ORG-', '')) || 1,
        name: 'Tech Innovators Ltd',
        totalSubscriptionAmount: 2500000,
        currency: 'NGN',
        totalLocations: 3,
        headquarters: 'Lagos Main Office',
        locationVerificationCost: 750000,
        subscriptionDuration: '12 months',
        address: '123 Innovation Street, Ikeja',
        city: 'Lagos',
        lga: 'Ikeja',
        state: 'Lagos',
        country: 'Nigeria',
        branches: [
          {
            id: 'b1',
            branchName: 'Lagos Main Office',
            houseNumber: '123',
            streetName: 'Innovation Street',
            cityRegion: 'Ikeja',
            buildingType: 'Commercial',
            lga: 'Ikeja',
            state: 'Lagos',
            country: 'Nigeria',
            contactPerson: 'John Doe',
            contactPosition: 'Manager',
            contactEmail: 'john@techinnovators.com',
            contactPhone: '+2348012345678'
          },
          {
            id: 'b2',
            branchName: 'Lekki Branch',
            houseNumber: '456',
            streetName: 'Lekki Phase 1',
            cityRegion: 'Lekki',
            buildingType: 'Commercial',
            lga: 'Eti-Osa',
            state: 'Lagos',
            country: 'Nigeria',
            contactPerson: 'Jane Smith',
            contactPosition: 'Supervisor',
            contactEmail: 'jane@techinnovators.com',
            contactPhone: '+2348087654321'
          }
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      };
      
      setOrganization(sampleOrganization);
      setLoading(false);
    };
    
    fetchData();
  }, [params.id]);
  
  const handleBack = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!organization) {
    return (
      <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">Organization Not Found</h2>
          <p className="text-gray-500 mt-2">The requested verified badge subscription does not exist.</p>
          <button 
            onClick={handleBack}
            className="mt-6 px-4 py-2 bg-[#5D2A8B] text-white rounded-lg hover:bg-[#4a216d]"
          >
            Go Back
          </button>
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
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-[#5D2A8B] hover:text-[#4a216d] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </button>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">View Verified Badge Subscription</h1>
          <p className="text-gray-600">Detailed information about the organization and its branches</p>
        </div>
        
        {/* Organization Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">{organization.name}</h2>
              <p className="text-gray-600">ID: {organization.id}</p>
            </div>
            <div className="bg-[#5D2A8B]/10 text-[#5D2A8B] px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Subscription Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Subscription Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">{organization.currency} {organization.totalSubscriptionAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{organization.subscriptionDuration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Hash className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Total Locations</p>
                    <p className="font-medium">{organization.totalLocations}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Location Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Headquarters</p>
                    <p className="font-medium">{organization.headquarters}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{organization.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{organization.city}, {organization.state}, {organization.country}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Financial Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Financial Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Verification Cost</p>
                    <p className="font-medium">{organization.currency} {organization.locationVerificationCost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{new Date(organization.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Updated</p>
                    <p className="font-medium">{new Date(organization.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Branches Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Branches ({organization.branches.length})</h2>
          </div>
          
          <div className="space-y-6">
            {organization.branches.map((branch, index) => (
              <div key={branch.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[#1A1A1A]">{branch.branchName || `Branch ${index + 1}`}</h3>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {branch.cityRegion}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{branch.houseNumber} {branch.streetName}, {branch.lga}, {branch.state}, {branch.country}</p>
                  </div>
                  
                  {branch.buildingType && (
                    <div>
                      <p className="text-sm text-gray-500">Building Type</p>
                      <p className="font-medium">{branch.buildingType}</p>
                    </div>
                  )}
                  
                  {branch.contactPerson && (
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{branch.contactPerson}</p>
                    </div>
                  )}
                  
                  {branch.contactPosition && (
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="font-medium">{branch.contactPosition}</p>
                    </div>
                  )}
                  
                  {branch.contactEmail && (
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{branch.contactEmail}</p>
                    </div>
                  )}
                  
                  {branch.contactPhone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{branch.contactPhone}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVerifiedBadgePage;