"use client";

import type React from "react";
import { useState } from "react";
import {
  Building,
  ShieldCheck,
  Upload,
  CheckCircle,
  User,
  FileText,
  Send,
} from "lucide-react";

interface OrganizationDetails {
  type: "registered" | "unregistered";
  businessRegistrationNumber?: string;
  ownerIdentificationType?: "international-passport" | "nin" | "none";
  ownerDocumentNumber?: string;
  visibility: "public" | "private";
  verifiedBadge: boolean;
  professionalTrade?: {
    associationName?: string;
    membershipId?: string;
    certificateFile?: File;
  };
}

const VerificationBadgeSubscriptionPage: React.FC = () => {
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails>({
    type: "registered",
    visibility: "private",
    verifiedBadge: false,
    professionalTrade: {},
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrganizationDetailsChange = (field: keyof OrganizationDetails, value: any) => {
    setOrganizationDetails((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "type" && value === "unregistered") {
        updated.verifiedBadge = false;
        updated.businessRegistrationNumber = "";
        updated.ownerIdentificationType = undefined;
        updated.ownerDocumentNumber = "";
      }

      if (field === "visibility" && value === "private") {
        updated.verifiedBadge = false;
      }

      if (field === "ownerIdentificationType") {
        updated.ownerDocumentNumber = "";
      }

      return updated;
    });
  };

  const handleVerificationRequest = async () => {
    if (organizationDetails.type === "registered" && !organizationDetails.businessRegistrationNumber?.trim()) {
      alert("Please enter your business registration number");
      return;
    }

    // Owner identification is now optional, so no validation needed

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setIsProcessing(false);

      setTimeout(() => {
        alert("Verification request submitted successfully! Our team will review your application within 3-5 business days.");
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Manrope', sans-serif; }
      `}</style>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DC
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-900">Verification Badge Subscription</h1>
              <p className="text-sm text-gray-600">Get verified to build trust with customers</p>
            </div>
          </div>
          <span className="text-gray-500 text-sm">Admin Dashboard</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <ShieldCheck className="w-10 h-10 text-purple-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Organization Verification</h1>
              <p className="text-gray-600 mt-1">
                Apply for a verified badge to increase credibility and gain customer trust
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-900 text-lg mb-2">Benefits of Verification</h3>
                <ul className="text-purple-800 space-y-1">
                  <li>• Builds trust with prospective customers</li>
                  <li>• Increases preferential patronage</li>
                  <li>• Enhances organization credibility</li>
                  <li>• Shows authenticity and professionalism</li>
                  <li>• Higher visibility in search results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Details Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex items-center mb-6">
            <Building className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Organization Details</h2>
          </div>

          <div className="space-y-8">
            {/* Business Type */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                  1
                </span>
                Type of Business:
              </h3>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer p-3 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                  <input
                    type="radio"
                    name="organizationType"
                    value="registered"
                    checked={organizationDetails.type === "registered"}
                    onChange={(e) => handleOrganizationDetailsChange("type", e.target.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-700 font-medium">Registered</span>
                    <p className="text-sm text-gray-500 mt-1">Business is officially registered with government</p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                  <input
                    type="radio"
                    name="organizationType"
                    value="unregistered"
                    checked={organizationDetails.type === "unregistered"}
                    onChange={(e) => handleOrganizationDetailsChange("type", e.target.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-700 font-medium">Unregistered</span>
                    <p className="text-sm text-gray-500 mt-1">Business is not officially registered</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Registration Number for Registered Businesses */}
            {organizationDetails.type === "registered" && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                    2
                  </span>
                  Registration Number (From government) *
                </h3>
                <div>
                  <input
                    type="text"
                    value={organizationDetails.businessRegistrationNumber || ""}
                    onChange={(e) => handleOrganizationDetailsChange("businessRegistrationNumber", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter your business registration number"
                  />
                  <p className="text-sm text-gray-500 mt-2">* Required for registered businesses. This number will be verified.</p>
                </div>
              </div>
            )}

            {/* Business Owner's Verification for Registered Businesses */}
            {organizationDetails.type === "registered" && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                    3
                  </span>
                  Business Owner's Verification (Optional)
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select means of identification
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <input
                        type="radio"
                        name="identificationType"
                        value="international-passport"
                        checked={organizationDetails.ownerIdentificationType === "international-passport"}
                        onChange={(e) => handleOrganizationDetailsChange("ownerIdentificationType", e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3">
                        <span className="text-gray-700 font-medium">International Passport</span>
                        <p className="text-sm text-gray-500 mt-1">Valid passport for identification</p>
                      </div>
                    </label>
                    <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <input
                        type="radio"
                        name="identificationType"
                        value="nin"
                        checked={organizationDetails.ownerIdentificationType === "nin"}
                        onChange={(e) => handleOrganizationDetailsChange("ownerIdentificationType", e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3">
                        <span className="text-gray-700 font-medium">NIN (National Identity Number)</span>
                        <p className="text-sm text-gray-500 mt-1">National identity card number</p>
                      </div>
                    </label>
                    <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <input
                        type="radio"
                        name="identificationType"
                        value="none"
                        checked={organizationDetails.ownerIdentificationType === "none"}
                        onChange={(e) => handleOrganizationDetailsChange("ownerIdentificationType", e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3">
                        <span className="text-gray-700 font-medium">Skip Owner Verification</span>
                        <p className="text-sm text-gray-500 mt-1">Do not provide owner identification</p>
                      </div>
                    </label>
                  </div>
                </div>

                {organizationDetails.ownerIdentificationType && 
                 organizationDetails.ownerIdentificationType !== "none" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Document Number</label>
                    <input
                      type="text"
                      value={organizationDetails.ownerDocumentNumber || ""}
                      onChange={(e) => handleOrganizationDetailsChange("ownerDocumentNumber", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={
                        organizationDetails.ownerIdentificationType === "international-passport"
                          ? "Enter your International Passport number"
                          : "Enter your NIN"
                      }
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      This information is used for verification purposes only and kept confidential.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Visibility */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                  {organizationDetails.type === "registered" ? "4" : "2"}
                </span>
                Make my organization's profile visible to the public
              </h3>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={organizationDetails.visibility === "public"}
                    onChange={(e) => handleOrganizationDetailsChange("visibility", e.target.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-700 font-medium">Yes</span>
                    <p className="text-sm text-gray-500 mt-1">Profile will be publicly visible</p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={organizationDetails.visibility === "private"}
                    onChange={(e) => handleOrganizationDetailsChange("visibility", e.target.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-700 font-medium">No</span>
                    <p className="text-sm text-gray-500 mt-1">Profile will remain private</p>
                  </div>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">
                Note: Visibility of your organization's profile to the public showcases your products & services and
                increases revenue generation.
              </p>
            </div>

            {/* Verified Badge Option */}
            {organizationDetails.visibility === "public" && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                    {organizationDetails.type === "registered" ? "5" : "3"}
                  </span>
                  Do you want to be verified organisation to gain prospective customers trust and get more preferential patronage?
                </h3>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                    <input
                      type="radio"
                      name="verifiedBadge"
                      checked={organizationDetails.verifiedBadge === true}
                      onChange={() => handleOrganizationDetailsChange("verifiedBadge", true)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="ml-3">
                      <span className="text-gray-700 font-medium">Yes</span>
                      <p className="text-sm text-gray-500 mt-1">Apply for verification badge</p>
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 bg-white rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors flex-1 max-w-xs">
                    <input
                      type="radio"
                      name="verifiedBadge"
                      checked={organizationDetails.verifiedBadge === false}
                      onChange={() => handleOrganizationDetailsChange("verifiedBadge", false)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="ml-3">
                      <span className="text-gray-700 font-medium">No</span>
                      <p className="text-sm text-gray-500 mt-1">Skip verification for now</p>
                    </div>
                  </label>
                </div>

                {organizationDetails.verifiedBadge && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start mb-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Verification Process</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          A verified badge helps build trust with customers and increases your organization's
                          credibility.
                          {organizationDetails.type === "registered" &&
                            " Your registration number and owner verification will be used for the verification process."}
                        </p>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
                          <li>• Verification typically takes 3-5 business days</li>
                          <li>• You'll be notified once verification is complete</li>
                          <li>• Verification badge appears on your profile</li>
                        </ul>
                      </div>
                    </div>

                    {organizationDetails.type === "unregistered" && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                        <p className="text-sm text-yellow-900">
                          <strong>Note:</strong> To receive a verified badge, you need to have a registered business.
                          Please select "Registered" business type above and provide your registration number.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Professional Trade Association (Optional) */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                <User className="w-5 h-5 text-purple-600 mr-2" />
                Professional Trade Association (Optional)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name of Professional/Trade Association
                  </label>
                  <input
                    type="text"
                    value={organizationDetails.professionalTrade?.associationName || ""}
                    onChange={(e) =>
                      setOrganizationDetails((prev) => ({
                        ...prev,
                        professionalTrade: {
                          ...prev.professionalTrade,
                          associationName: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Chamber of Commerce, Professional Association"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Membership ID (Optional)</label>
                  <input
                    type="text"
                    value={organizationDetails.professionalTrade?.membershipId || ""}
                    onChange={(e) =>
                      setOrganizationDetails((prev) => ({
                        ...prev,
                        professionalTrade: {
                          ...prev.professionalTrade,
                          membershipId: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your membership ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Membership Certificate or ID (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setOrganizationDetails((prev) => ({
                              ...prev,
                              professionalTrade: {
                                ...prev.professionalTrade,
                                certificateFile: e.target.files![0],
                              },
                            }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {organizationDetails.professionalTrade?.certificateFile && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <FileText className="w-4 h-4 mr-1" />
                      {organizationDetails.professionalTrade.certificateFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={handleVerificationRequest}
                  disabled={isProcessing || !organizationDetails.verifiedBadge}
                  className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : !organizationDetails.verifiedBadge
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Verification Request
                    </>
                  )}
                </button>
              </div>

              {!organizationDetails.verifiedBadge && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    Please select "Yes" for verification badge to enable submission
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="font-medium text-green-800">Verification request submitted successfully!</p>
                  <p className="text-sm text-green-700 mt-1">
                    Our team will review your application within 3-5 business days. You'll receive an email notification once your verification is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </main>
    </div>
  );
};

export default VerificationBadgeSubscriptionPage;