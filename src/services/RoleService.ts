import { HttpService } from './HttpService';
import { routes } from './apiRoutes';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleData {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface AssignRoleToUsersData {
  userIds: string[];
}

export interface PaginatedRolesResponse {
  success: boolean;
  data: {
    roles: Role[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      total: number;
    };
    message: string;
  };
}

export interface RoleResponse {
  success: boolean;
  data: {
    role: Role;
    message: string;
  };
}

export interface AssignRoleResponse {
  success: boolean;
  data: {
    message: string;
  };
}

export class RoleService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  // Create a new role
  async createRole(data: CreateRoleData): Promise<RoleResponse> {
    return this.httpService.postData<RoleResponse>(data, routes.createRole());
  }

  // Get all roles with pagination
  async getRoles(page: number = 1, limit: number = 10): Promise<PaginatedRolesResponse> {
    const url = routes.getRolesWithPagination(page, limit);
    return this.httpService.getData<PaginatedRolesResponse>(url);
  }

  // Get role by ID
  async getRoleById(roleId: string): Promise<RoleResponse> {
    const url = routes.getRoleById(roleId);
    const response = await this.httpService.getData<RoleResponse>(url);
    return response;
  }

  // Update role
  async updateRole(roleId: string, data: UpdateRoleData): Promise<RoleResponse> {
    const url = routes.updateRole(roleId);
    return this.httpService.putData<RoleResponse>(data, url);
  }

  // Delete role
  async deleteRole(roleId: string): Promise<any> {
    const url = routes.deleteRole(roleId);
    return this.httpService.deleteData<any>(url);
  }

  // Assign role to users
  async assignRoleToUsers(roleId: string, data: AssignRoleToUsersData): Promise<AssignRoleResponse> {
    const url = routes.assignRoleToUsers(roleId);
    return this.httpService.postData<AssignRoleResponse>(data, url);
  }

  // Unassign role from users
  async unassignRoleFromUsers(roleId: string, data: AssignRoleToUsersData): Promise<AssignRoleResponse> {
    const url = routes.unassignRoleFromUsers(roleId);
    return this.httpService.postData<AssignRoleResponse>(data, url);
  }

  // Get users by role
  async getUsersByRole(roleId: string, page: number = 1, limit: number = 10): Promise<any> {
    const url = routes.getUsersByRole(roleId);
    return this.httpService.getData<any>(`${url}?page=${page}&limit=${limit}`);
  }
}