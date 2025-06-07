import { Winner, PotData, ApiResponse } from './types';
import { mockWinners, mockPotData } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Get the current estimated jackpot/pot
   */
  async getPot(): Promise<ApiResponse<PotData>> {
    try {
      // Simulate network delay
      await delay(300);
      
      // In a real implementation, this would make an HTTP request
      // const response = await fetch('/api/pot');
      // const data = await response.json();
      
      return {
        success: true,
        data: mockPotData
      };
    } catch (error) {
      return {
        success: false,
        data: mockPotData, // fallback to mock data
        error: error instanceof Error ? error.message : 'Failed to fetch pot data'
      };
    }
  },

  /**
   * Get all winners
   */
  async getWinners(): Promise<ApiResponse<Winner[]>> {
    try {
      // Simulate network delay
      await delay(500);
      
      // In a real implementation, this would make an HTTP request
      // const response = await fetch('/api/winners');
      // const data = await response.json();
      
      return {
        success: true,
        data: mockWinners
      };
    } catch (error) {
      return {
        success: false,
        data: mockWinners, // fallback to mock data
        error: error instanceof Error ? error.message : 'Failed to fetch winners data'
      };
    }
  },

  /**
   * Get recent winners (limited count)
   */
  async getRecentWinners(count: number = 3): Promise<ApiResponse<Winner[]>> {
    try {
      const winnersResponse = await this.getWinners();
      
      if (!winnersResponse.success) {
        return winnersResponse;
      }

      const recentWinners = winnersResponse.data
        .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
        .slice(0, count);

      return {
        success: true,
        data: recentWinners
      };
    } catch (error) {
      return {
        success: false,
        data: mockWinners.slice(0, count), // fallback to mock data
        error: error instanceof Error ? error.message : 'Failed to fetch recent winners'
      };
    }
  }
};