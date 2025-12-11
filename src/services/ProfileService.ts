import { HttpService } from './HttpService';
import { routes } from './apiRoutes';

export interface UserProfile {
  id: string;
  userId?: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string | null;
  role: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export class ProfileService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  // Get user profile
  async getProfile(): Promise<UserProfile> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await this.httpService.getData<any>('/api/user/profile');
      const data: any = response.data;
      
      // Handle different response structures
      let profileData: any = data.user || data.data?.user || data.data || data;
      
      // Ensure firstName and lastName are available
      if (profileData.fullName && profileData.fullName.trim() && !profileData.firstName && !profileData.lastName) {
        const [firstName, ...lastNameParts] = profileData.fullName.split(' ');
        const lastName = lastNameParts.join(' ');
        profileData = {
          ...profileData,
          firstName: firstName || '',
          lastName: lastName || ''
        };
      } else if (!profileData.firstName && !profileData.lastName) {
        // If fullName is empty, try to extract from email
        const emailName = profileData.email?.split('@')[0] || '';
        profileData = {
          ...profileData,
          firstName: emailName,
          lastName: ''
        };
      }
      
      // Ensure userId is available
      if (profileData.id && !profileData.userId) {
        profileData = {
          ...profileData,
          userId: profileData.id
        };
      }
      
      return profileData as UserProfile;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<UserProfile>) {
    return this.httpService.patchData(data, routes.updateUserProfile());
  }
}

export default ProfileService;