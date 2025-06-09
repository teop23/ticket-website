import { ApiResponse, PotData, Winner } from './types';

const SOL_CONTRACT_ADDRESS = "So11111111111111111111111111111111111111112";
const DEFAULT_PRICE = 0.000001; // Fallback price in USD

export const getSOLPrice = async (): Promise<number> => {
  try {
    const response = await fetch(`https://api.jup.ag/price/v2?ids=${SOL_CONTRACT_ADDRESS}`);
    const data = await response.json();
    return data.data[SOL_CONTRACT_ADDRESS]?.price ?? DEFAULT_PRICE;
  } catch (error) {
    console.log('Error fetching price:', error);
    return DEFAULT_PRICE;
  }
};

export const api = {
  /**
   * Get the current estimated jackpot/pot
   */
  async getPot(): Promise<ApiResponse<PotData>> {
    try {
      // Fetch pot amount from worker
      const potResponse = await fetch('https://worker.powermillions.org/pot');
      const potData = await potResponse.json();
      
      if (!potResponse.ok || !potData.potAmount) {
        throw new Error('Failed to fetch pot data');
      }

      // Fetch current token price
      const tokenPrice = await getSOLPrice();
      
      const solAmount = potData.potAmount;
      const usdValue = solAmount * tokenPrice;
      
      return {
        success: true,
        data: {
          amount: `$${usdValue.toFixed(2)}`,
          solAmount: solAmount,
          usdValue: usdValue,
          solValue: solAmount
        }
      };
    } catch (error) {
      console.error('Error fetching pot:', error);
      
      // Fallback data
      return {
        success: false,
        data: {
          amount: "$1,039.93",
          solAmount: "6.82",
          usdValue: 1039.93,
          solValue: 6.82
        },
        error: error instanceof Error ? error.message : 'Failed to fetch pot data'
      };
    }
  },

  /**
   * Get all winners/distributions
   */
  async getWinners(): Promise<ApiResponse<Winner[]>> {
    try {
      const response = await fetch('https://worker.powermillions.org/distributions');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // The API returns an array of distributions directly
      const winners: Winner[] = Array.isArray(data) ? data : [];
      
      return {
        success: true,
        data: winners
      };
    } catch (error) {
      console.error('Error fetching winners:', error);
      
      // Fallback to empty array
      return {
        success: false,
        data: [],
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
      console.error('Error fetching recent winners:', error);
      
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch recent winners'
      };
    }
  }
};