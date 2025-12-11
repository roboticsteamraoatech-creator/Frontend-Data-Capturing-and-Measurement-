export const routes = {
  // User profile routes
  getUserProfile: () => '/user/profile',
  updateUserProfile: () => '/user/profile',
  
  // Manual measurement routes
  getManualMeasurementForms: () => '/manual-measurements/forms',
  createManualMeasurement: () => '/manual-measurements',
  
  // Auth routes
  login: () => '/auth/login',
  register: () => '/auth/register',
  verifyOtp: () => '/auth/verify-otp',
  resendOtp: () => '/auth/resend-otp',
  
  // Organization routes
  registerOrganization: () => '/organisations/register',
  
  // Measurements routes
  getMeasurements: () => '/measurements',
  getMeasurementById: (id: string) => `/measurements/${id}`,
};