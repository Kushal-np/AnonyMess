import { User, Message, Notificaion, LoginResponse, MessageResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'An error occurred');
    }

    return response.json();
  }

  async login(username: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }

  async getMe(): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/me');
  }

  async sendMessage(username: string, content: string): Promise<Message> {
    return this.request<Message>(`/message/${username}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async getMessages(): Promise<MessageResponse> {
    return this.request<MessageResponse>('/message/lol/1');
  }

  async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/notification');
  }

  async markAsRead(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/notification/read', {
      method: 'PUT',
    });
  }
}

export const apiClient = new ApiClient();