"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit3 } from 'lucide-react';
import CityRegionService from '@/services/cityRegionService';
import type { CityRegion } from '@/services/cityRegionService';
import CreateCityRegionModal from '@/components/superAdmin/CreateCityRegionModal';

interface EditCityRegionPageProps {
  params: {
    id: string;
  };
}

const EditCityRegionPage = ({ params }: EditCityRegionPageProps) => {
  const router = useRouter();
  const [region, setRegion] = useState<CityRegion | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(true);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const fetchedRegion = await CityRegionService.getCityRegionById(params.id);
        setRegion(fetchedRegion);
      } catch (error) {
        console.error('Error fetching city region:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [params.id]);

  const handleUpdateSuccess = () => {
    setShowEditModal(false);
    // Redirect back to the main city region page after a short delay
    setTimeout(() => {
      router.push('/super-admin/subscription/city-region');
    }, 500);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
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

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCancel}
              className="flex items-center text-[#5D2A8B] hover:text-[#4a216d]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Edit City Region</h1>
          </div>
          <p className="text-gray-600">Update city region details</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <Edit3 className="w-12 h-12 text-[#5D2A8B] mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Editing city region details...</p>
              <p className="text-sm text-gray-500">Redirecting to edit form</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show the edit modal */}
      {showEditModal && region && (
        <CreateCityRegionModal 
          isOpen={showEditModal} 
          onClose={() => router.back()} 
          onSuccess={handleUpdateSuccess}
          regionToEdit={region}
        />
      )}
    </div>
  );
};

export default EditCityRegionPage;