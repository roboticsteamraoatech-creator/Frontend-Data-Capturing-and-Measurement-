import { HttpService } from './HttpService';

// Interfaces for Super Admin location verification API
interface LocationVerification {
  id: string;
  locationId: string;
  organizationId: string;
  locationIndex: number;
  brandName: string;
  country: string;
  state: string;
  city: string;
  address: string;
  paymentStatus: string;
  verificationStatus: string;
  createdAt: string;
  paidAt: string;
}

interface LocationVerificationDetails extends LocationVerification {
  paymentAmount: number;
  paymentMethod: string;
  transactionId: string;
  organization: {
    name: string;
    email: string;
    phone: string;
  };
}

interface GetPendingLocationsResponse {
  success: boolean;
  data: {
    locations: LocationVerification[];
    total: number;
    pendingCount: number;
  };
}

interface ApproveLocationRequest {
  approvedBy: string;
  notes?: string;
}

interface ApproveLocationResponse {
  success: boolean;
  data: {
    id: string;
    locationId: string;
    verificationStatus: string;
    approvedBy: string;
    approvedAt: string;
    notes?: string;
  };
}

interface RejectLocationRequest {
  rejectedBy: string;
  rejectionReason: string;
  notes?: string;
}

interface RejectLocationResponse {
  success: boolean;
  data: {
    id: string;
    locationId: string;
    verificationStatus: string;
    rejectedBy: string;
    rejectedAt: string;
    rejectionReason: string;
    notes?: string;
  };
}

interface GetLocationVerificationResponse {
  success: boolean;
  data: LocationVerificationDetails;
}

interface GetVerificationStatsResponse {
  success: boolean;
  data: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

interface SearchVerificationParams {
  status?: string;
  organization?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

interface SearchVerificationResponse {
  success: boolean;
  data: {
    locations: LocationVerification[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

class LocationVerificationService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  /**
   * Get all pending location verifications
   */
  async getPendingLocations(): Promise<GetPendingLocationsResponse> {
    try {
      const url = '/api/super-admin/location-verifications/pending';
      const response = await this.httpService.getData<GetPendingLocationsResponse>(url);
      return response;
    } catch (error) {
      console.error('Error getting pending locations:', error);
      throw error;
    }
  }

  /**
   * Approve a location verification
   */
  async approveLocation(id: string, request: ApproveLocationRequest): Promise<ApproveLocationResponse> {
    try {
      const url = `/api/super-admin/location-verifications/${id}/approve`;
      const response = await this.httpService.patchData<ApproveLocationResponse>(request, url);
      return response;
    } catch (error) {
      console.error('Error approving location:', error);
      throw error;
    }
  }

  /**
   * Reject a location verification
   */
  async rejectLocation(id: string, request: RejectLocationRequest): Promise<RejectLocationResponse> {
    try {
      const url = `/api/super-admin/location-verifications/${id}/reject`;
      const response = await this.httpService.patchData<RejectLocationResponse>(request, url);
      return response;
    } catch (error) {
      console.error('Error rejecting location:', error);
      throw error;
    }
  }

  /**
   * Get details of a specific location verification
   */
  async getLocationVerification(id: string): Promise<GetLocationVerificationResponse> {
    try {
      const url = `/api/super-admin/location-verifications/${id}`;
      const response = await this.httpService.getData<GetLocationVerificationResponse>(url);
      return response;
    } catch (error) {
      console.error('Error getting location verification details:', error);
      throw error;
    }
  }

  /**
   * Get verification statistics
   */
  async getVerificationStats(): Promise<GetVerificationStatsResponse> {
    try {
      const url = '/api/super-admin/location-verifications/stats';
      const response = await this.httpService.getData<GetVerificationStatsResponse>(url);
      return response;
    } catch (error) {
      console.error('Error getting verification stats:', error);
      throw error;
    }
  }

  /**
   * Search location verifications with filters
   */
  async searchVerifications(params: SearchVerificationParams): Promise<SearchVerificationResponse> {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.organization) queryParams.append('organization', params.organization);
      if (params.location) queryParams.append('location', params.location);
      if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
      if (params.dateTo) queryParams.append('dateTo', params.dateTo);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      
      const queryString = queryParams.toString();
      const url = `/api/super-admin/location-verifications/search${queryString ? '?' + queryString : ''}`;
      
      const response = await this.httpService.getData<SearchVerificationResponse>(url);
      return response;
    } catch (error) {
      console.error('Error searching verifications:', error);
      throw error;
    }
  }
}

export default new LocationVerificationService();
export type {
  LocationVerification,
  LocationVerificationDetails,
  GetPendingLocationsResponse,
  ApproveLocationRequest,
  ApproveLocationResponse,
  RejectLocationRequest,
  RejectLocationResponse,
  GetLocationVerificationResponse,
  GetVerificationStatsResponse,
  SearchVerificationParams,
  SearchVerificationResponse
};