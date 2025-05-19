
import { apiClient } from './api';

/**
 * Subscription service for managing premium subscriptions
 */

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'inactive';
  plan: 'monthly' | 'yearly' | 'free';
  renewalDate?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'payment' | 'income' | 'refund';
  description: string;
  amount: string;
}

class SubscriptionService {
  /**
   * Get current subscription status
   */
  async getSubscription(): Promise<Subscription> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Subscription>('/subscriptions/current');
  }
  
  /**
   * Subscribe to a plan
   */
  async subscribe(plan: 'monthly' | 'yearly'): Promise<Subscription> {
    // 🔧 INTEGRATION: Replace with real backend call + payment processor integration
    return apiClient.request<Subscription>('/subscriptions', {
      method: 'POST',
      body: { plan },
    });
  }
  
  /**
   * Cancel current subscription
   */
  async cancelSubscription(): Promise<void> {
    // 🔧 INTEGRATION: Replace with real backend call
    await apiClient.request('/subscriptions/current', {
      method: 'DELETE',
    });
  }
  
  /**
   * Get saved payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<PaymentMethod[]>('/payment-methods');
  }
  
  /**
   * Add a new payment method
   */
  async addPaymentMethod(tokenizedPaymentInfo: any): Promise<PaymentMethod> {
    // 🔧 INTEGRATION: Replace with real payment processor integration
    return apiClient.request<PaymentMethod>('/payment-methods', {
      method: 'POST',
      body: tokenizedPaymentInfo,
    });
  }
  
  /**
   * Remove a payment method
   */
  async removePaymentMethod(id: string): Promise<void> {
    // 🔧 INTEGRATION: Replace with real backend call
    await apiClient.request(`/payment-methods/${id}`, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get transaction history
   */
  async getTransactions(): Promise<Transaction[]> {
    // 🔧 INTEGRATION: Replace with real backend call
    return apiClient.request<Transaction[]>('/transactions');
  }
}

export const subscriptionService = new SubscriptionService();

