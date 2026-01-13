"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Filter,
  MapPin,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  ChevronDown,
  X,
  Calendar,
  DollarSign,
  Hash,
  Map,
  Home,
  Clock
} from 'lucide-react';

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

const VerifiedBadgeSubscriptionPage = () => {
  // States
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Organization; direction: 'asc' | 'desc' } | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Sample data
  const sampleData: Organization[] = [
    {
      id: 'ORG-001',
      serialNumber: 1,
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
        }
      ],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 'ORG-002',
      serialNumber: 2,
      name: 'Green Energy Solutions',
      totalSubscriptionAmount: 1800000,
      currency: 'NGN',
      totalLocations: 2,
      headquarters: 'Port Harcourt HQ',
      locationVerificationCost: 600000,
      subscriptionDuration: '24 months',
      address: '45 Energy Road, GRA',
      city: 'Port Harcourt',
      lga: 'Port Harcourt City',
      state: 'Rivers',
      country: 'Nigeria',
      branches: [
        {
          id: 'b2',
          branchName: 'Port Harcourt HQ',
          houseNumber: '45',
          streetName: 'Energy Road',
          cityRegion: 'GRA',
          buildingType: 'Industrial',
          lga: 'Port Harcourt City',
          state: 'Rivers',
          country: 'Nigeria',
          contactPerson: 'Michael Brown',
          contactPosition: 'Director',
          contactEmail: 'michael@greenenergy.com',
          contactPhone: '+2348055555555'
        }
      ],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02'
    },
    {
      id: 'ORG-003',
      serialNumber: 3,
      name: 'MediCare Hospital Group',
      totalSubscriptionAmount: 3500000,
      currency: 'NGN',
      totalLocations: 4,
      headquarters: 'Abuja Central',
      locationVerificationCost: 950000,
      subscriptionDuration: '36 months',
      address: '78 Health Avenue, Wuse 2',
      city: 'Abuja',
      lga: 'Abuja Municipal',
      state: 'FCT',
      country: 'Nigeria',
      branches: [],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    }
  ];

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrganizations(sampleData);
        setFilteredOrganizations(sampleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter and search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.lga.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrganizations(filtered);
    }
  }, [searchTerm, organizations]);

  // Sorting
  const sortedOrganizations = useMemo(() => {
    if (!sortConfig) return filteredOrganizations;
    
    return [...filteredOrganizations].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredOrganizations, sortConfig]);

  const requestSort = (key: keyof Organization) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    const headers = [
      'S/N',
      'Organization Name',
      'ID',
      'Total Subscription (₦)',
      'Currency',
      'Total Locations',
      'Headquarters',
      'Location Verification Cost',
      'Subscription Duration',
      'Address',
      'City',
      'LGA',
      'State',
      'Country',
      'Created Date',
      'Updated Date'
    ];

    const data = organizations.map(org => [
      org.serialNumber,
      org.name,
      org.id,
      org.totalSubscriptionAmount,
      org.currency,
      org.totalLocations,
      org.headquarters,
      org.locationVerificationCost,
      org.subscriptionDuration,
      org.address,
      org.city,
      org.lga,
      org.state,
      org.country,
      formatDate(org.createdAt),
      formatDate(org.updatedAt)
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'verified-badge-subscriptions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle view headquarters
  const handleViewHeadquarters = (org: Organization) => {
    setSelectedOrganization(org);
    setShowBranchModal(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setOrganizationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (organizationToDelete) {
      setOrganizations(orgs => orgs.filter(org => org.id !== organizationToDelete));
      setFilteredOrganizations(orgs => orgs.filter(org => org.id !== organizationToDelete));
      setShowDeleteModal(false);
      setOrganizationToDelete(null);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((col) => (
                      <th key={col} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((row) => (
                    <tr key={row} className="border-b border-gray-100">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((col) => (
                        <td key={col} className="py-4 px-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
        
        /* Custom scrollbar for table */
        .table-container::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        
        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .table-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        .table-container::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
        
        /* Fix table header */
        .sticky-header {
          position: sticky;
          top: 0;
          background: #f9fafb;
          z-index: 10;
        }
      `}</style>

      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Verified Badge Subscriptions</h1>
          <p className="text-gray-600">Manage organization verified badge subscriptions</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B]"
                  placeholder="Search organizations by name, ID, city, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                More Filters
              </button>
            </div>
            
            <div className="flex gap-3">
              <button 
                className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={exportToExcel}
              >
                <Download className="w-5 h-5 mr-2" />
                Export to Excel
              </button>
              
              <button 
                className="flex items-center justify-center bg-[#5D2A8B] text-white px-4 py-2 rounded-lg hover:bg-[#4a216d] transition-colors"
                onClick={() => window.location.href = '/super-admin/subscription/verified-badge/create'}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Main Table with Horizontal Scroll */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div ref={tableContainerRef} className="table-container overflow-x-auto max-h-[600px]">
            <table className="w-full min-w-[1600px]">
              <thead className="sticky-header">
                <tr className="bg-gray-50 border-b border-gray-200">
                  {/* S/N */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('serialNumber')}
                  >
                    <div className="flex items-center">
                     
                      S/N
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'serialNumber' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Organization Name */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      
                      Organization Name
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'name' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* ID */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                     
                      ID
                    </div>
                  </th>
                  
                  {/* Total Subscription */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('totalSubscriptionAmount')}
                  >
                    <div className="flex items-center">
                     
                      Total Subscription
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'totalSubscriptionAmount' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Currency */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                    
                      Currency
                    </div>
                  </th>
                  
                  {/* Total Locations */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('totalLocations')}
                  >
                    <div className="flex items-center">
                     
                      Total Locations
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'totalLocations' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Headquarters */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                     
                      Headquarters
                    </div>
                  </th>
                  
                  {/* Location Verification Cost */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('locationVerificationCost')}
                  >
                    <div className="flex items-center">
                     
                      Verification Cost
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'locationVerificationCost' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Subscription Duration */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                      
                      Duration
                    </div>
                  </th>
                  
                  {/* Address */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                      
                      Address
                    </div>
                  </th>
                  
                  {/* City */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('city')}
                  >
                    <div className="flex items-center">
                      
                      City
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'city' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* LGA */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                     
                      LGA
                    </div>
                  </th>
                  
                  {/* State */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('state')}
                  >
                    <div className="flex items-center">
                    
                      State
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'state' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Country */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('country')}
                  >
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      Country
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'country' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Created At */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('createdAt')}
                  >
                    <div className="flex items-center">
                     
                      Created
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'createdAt' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Updated At */}
                  <th 
                    className="py-3 px-4 text-left text-gray-600 font-medium cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => requestSort('updatedAt')}
                  >
                    <div className="flex items-center">
                     
                      Updated
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        sortConfig?.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  
                  {/* Actions */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium sticky right-0 bg-gray-50 whitespace-nowrap">
                    <div className="flex items-center">
                      <Edit className="w-4 h-4 mr-2 text-gray-400" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedOrganizations.length > 0 ? (
                  sortedOrganizations.map((org) => (
                    <tr key={org.id} className="border-b border-gray-100 hover:bg-gray-50">
                      {/* S/N */}
                      <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                        {org.serialNumber}
                      </td>
                      
                      {/* Organization Name */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{org.name}</div>
                      </td>
                      
                      {/* ID */}
                      <td className="py-4 px-4 text-gray-700 font-mono whitespace-nowrap">
                        {org.id}
                      </td>
                      
                      {/* Total Subscription */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">
                          {formatCurrency(org.totalSubscriptionAmount, org.currency)}
                        </div>
                      </td>
                      
                      {/* Currency */}
                      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {org.currency}
                        </span>
                      </td>
                      
                      {/* Total Locations */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium">
                            {org.totalLocations}
                          </span>
                        </div>
                      </td>
                      
                      {/* Headquarters */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewHeadquarters(org)}
                          className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </td>
                      
                      {/* Location Verification Cost */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium text-red-600">
                          {formatCurrency(org.locationVerificationCost, org.currency)}
                        </div>
                      </td>
                      
                      {/* Subscription Duration */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {org.subscriptionDuration}
                        </span>
                      </td>
                      
                      {/* Address */}
                      <td className="py-4 px-4 whitespace-nowrap max-w-[200px] truncate">
                        <div className="text-gray-700" title={org.address}>
                          {org.address}
                        </div>
                      </td>
                      
                      {/* City */}
                      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                        {org.city}
                      </td>
                      
                      {/* LGA */}
                      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                        {org.lga}
                      </td>
                      
                      {/* State */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {org.state}
                        </span>
                      </td>
                      
                      {/* Country */}
                      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                        {org.country}
                      </td>
                      
                      {/* Created At */}
                      <td className="py-4 px-4 text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(org.createdAt)}
                      </td>
                      
                      {/* Updated At */}
                      <td className="py-4 px-4 text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(org.updatedAt)}
                      </td>
                      
                      {/* Actions (Sticky) */}
                      <td className="py-4 px-4 sticky right-0 bg-white whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => window.location.href = `/super-admin/subscription/verified-badge/view/${org.id}`}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => window.location.href = `/super-admin/subscription/verified-badge/edit/${org.id}`}
                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(org.id)}
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
                    <td colSpan={16} className="py-8 px-4 text-center text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {sortedOrganizations.length} of {organizations.length} organizations
        </div>
      </div>

      {/* Branch Details Modal */}
      {showBranchModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Branch Details</h3>
                <p className="text-gray-600">{selectedOrganization.name}</p>
              </div>
              <button
                onClick={() => setShowBranchModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Branch list */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">All Branches ({selectedOrganization.branches.length})</h4>
                
                {selectedOrganization.branches.map((branch, index) => (
                  <div key={branch.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Building className="w-5 h-5 text-purple-600 mr-2" />
                          <h5 className="text-lg font-semibold text-gray-900">{branch.branchName}</h5>
                          {index === 0 && (
                            <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Headquarters
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {branch.houseNumber} {branch.streetName}, {branch.cityRegion}, {branch.lga}, {branch.state}, {branch.country}
                        </p>
                        {branch.buildingType && (
                          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                            {branch.buildingType}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    {branch.contactPerson && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h6 className="text-sm font-medium text-gray-700 mb-3">Contact Person</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-700">{branch.contactPerson}</span>
                          </div>
                          {branch.contactPosition && (
                            <div className="flex items-center">
                              <Building className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-700">{branch.contactPosition}</span>
                            </div>
                          )}
                          {branch.contactEmail && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-700">{branch.contactEmail}</span>
                            </div>
                          )}
                          {branch.contactPhone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-700">{branch.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add More Branches Button */}
                <div className="mt-6">
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Plus className="w-5 h-5 inline-block mr-2" />
                    Add More Branches
                  </button>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowBranchModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => window.location.href = `/super-admin/subscription/verified-badge/edit/${selectedOrganization.id}`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Edit Organization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Organization</h3>
                  <p className="text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this organization? All associated data including branches will be permanently removed.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedBadgeSubscriptionPage;