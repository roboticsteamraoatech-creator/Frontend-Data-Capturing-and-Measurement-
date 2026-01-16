"use client";

import React from 'react';
import Link from 'next/link';

const SubscriptionPage = () => {
  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-[#F4EFFA]">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage subscriptions for your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/subscription/package-subscription">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Package Subscription</h3>
            <p className="text-gray-600">Manage subscription packages and plans</p>
          </div>
        </Link>
        
        <Link href="/admin/subscription/verified-badge-subscription">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Badge Subscription</h3>
            <p className="text-gray-600">Manage verified badge subscriptions</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionPage;