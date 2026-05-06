import axios from 'axios';
import { NotificationsResponse } from '@/types/notification';
import { MOCK_NOTIFICATIONS } from './mockData';

// Base URL for the notifications API
const BASE_URL = 'http://20.207.122.201/evaluation-service/notifications';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Reduced timeout for faster fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch notifications from the API with optional query parameters.
 * Supports pagination (page, limit) and filtering by notification_type.
 */
export const fetchNotifications = async (params: {
  limit?: number;
  page?: number;
  notification_type?: string;
}): Promise<NotificationsResponse> => {
  try {
    const response = await apiClient.get('', { params });
    const data = response.data;

    // Normalize: if the response is an array, wrap it
    if (Array.isArray(data)) {
      return {
        notifications: data,
        total: data.length,
        page: params.page || 1,
        limit: params.limit || 10,
      };
    }

    if (data.notifications) {
      return data as NotificationsResponse;
    }
    
    if (data.data && Array.isArray(data.data)) {
      return {
        notifications: data.data,
        total: data.total || data.data.length,
        page: data.page || params.page || 1,
        limit: data.limit || params.limit || 10,
        totalPages: data.totalPages,
      };
    }

    return {
      notifications: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 10,
    };
  } catch (error) {
    console.error('API Error, falling back to mock data:', error);
    
    // Filtering mock data to simulate API behavior
    let filtered = [...MOCK_NOTIFICATIONS];
    if (params.notification_type && params.notification_type !== 'All') {
      filtered = filtered.filter(n => n.notification_type === params.notification_type);
    }
    
    const limit = params.limit || 10;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      notifications: paginated,
      total: filtered.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }
};
