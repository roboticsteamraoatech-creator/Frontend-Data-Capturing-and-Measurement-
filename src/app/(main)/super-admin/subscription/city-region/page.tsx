"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CityRegionService, { CityRegion } from '@/services/cityRegionService';

const CityRegionPage = () => {
  const [regions, setRegions] = useState<CityRegion[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<CityRegion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch data from the API
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { regions } = await CityRegionService.getCityRegions(1, 100); // Get all regions
        setRegions(regions);
        setFilteredRegions(regions);
      } catch (error) {
        console.error('Error fetching city regions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegions();
  }, []);

  // Filter regions based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRegions(regions);
    } else {
      const filtered = regions.filter(region =>
        region.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (region.lga && region.lga.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (region.region && region.region.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRegions(filtered);
    }
  }, [searchTerm, regions]);

  const handleCreateClick = () => {
    router.push('/super-admin/subscription/city-region/create');
  };

  const handleEdit = (region: CityRegion) => {
    router.push(`/super-admin/subscription/city-region/edit/${region.id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this city region? This action cannot be undone.')) {
      try {
        await CityRegionService.deleteCityRegion(id);
        // Refetch regions
        const { regions } = await CityRegionService.getCityRegions(1, 100);
        setRegions(regions);
        setFilteredRegions(regions);
      } catch (error) {
        console.error('Error deleting city region:', error);
        alert('Failed to delete city region');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const region = regions.find(r => r.id === id);
      if (region) {
        const newStatus = region.status === 'active' ? 'inactive' : 'active';
        await CityRegionService.updateCityRegionStatus(id, newStatus);
        // Refetch regions
        const { regions } = await CityRegionService.getCityRegions(1, 100);
        setRegions(regions);
        setFilteredRegions(regions);
      }
    } catch (error) {
      console.error('Error updating city region status:', error);
      alert('Failed to update city region status');
    }
  };

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
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
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">City Region Management</h1>
              <p className="text-gray-600">Manage city regions for verified badge subscriptions</p>
            </div>
            <div className="text-sm text-gray-500">
              Total: <span className="font-medium">{regions.length}</span> regions
            </div>
          </div>
        </div>

        {/* Search and Add buttons in separate containers */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search on the left - No shadow container */}
          <div className="relative md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] bg-white"
              placeholder="Search city regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Add City Region button on the right */}
          <div>
            <button 
              className="flex items-center justify-center bg-[#5D2A8B] text-white px-4 py-2 rounded-lg hover:bg-[#4a216d] transition-colors whitespace-nowrap"
              onClick={handleCreateClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add City Region
            </button>
          </div>
        </div>

        {/* Table Container - Only contains the table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">Country</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">State/Province</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">LGA</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">City</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">Region</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">Created Date</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region) => (
                    <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium text-sm">{region.countryName}</span>
                          <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {region.countryCode}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium text-sm">{region.stateName}</span>
                          <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {region.stateCode}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {region.lga ? (
                          <span className="font-medium text-sm">{region.lga}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-sm">{region.cityName}</span>
                      </td>
                      <td className="py-4 px-4">
                        {region.region ? (
                          <span className="font-medium text-sm">{region.region}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(region.id)}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                            region.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {region.status === 'active' ? (
                            <>
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                              Active
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-sm">
                        {formatDate(region.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEdit(region)}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors text-xs"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => handleDelete(region.id)}
                            className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors text-xs"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No city regions found</h3>
                        <p className="mb-4 text-sm">
                          {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first city region'}
                        </p>
                        {!searchTerm && (
                          <button 
                            className="flex items-center justify-center bg-[#5D2A8B] text-white px-4 py-2 rounded-lg hover:bg-[#4a216d] transition-colors text-sm"
                            onClick={handleCreateClick}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add City Region
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination would go here */}
          {filteredRegions.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRegions.length}</span> of{' '}
                <span className="font-medium">{filteredRegions.length}</span> results
              </div>
              <div className="flex space-x-1">
                <button className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 text-xs">
                  Previous
                </button>
                <button className="px-2 py-1 bg-[#5D2A8B] text-white rounded hover:bg-[#4a216d] text-xs">
                  1
                </button>
                <button className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-xs">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityRegionPage;