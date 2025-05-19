
import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * Subscription service for managing premium subscriptions
 * Integrates with Spring Boot subscription endpoints
 */

export interface Subscription {
  id: string;  // Converted from MongoDB _id
  status: 'active' | 'canceled' | 'past_due' | 'inactive';
  plan: 'monthly' | 'yearly' | 'free';
  renewalDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentMethod {
  id: string;  // Converted from MongoDB _id
  type: 'card' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string;  // Converted from MongoDB _id
  date: string;
  type: 'payment' | 'income' | 'refund';
  description: string;
  amount: string;
  createdAt?: string;
  updatedAt?: string;
}

class SubscriptionService {
  /**
   * Get current subscription status
   */
  async getSubscription(): Promise<Subscription> {
    // 🔧 INTEGRATION: Replace with Spring Boot subscription endpoint
    // GET /subscriptions/current will return MongoDB document with user subscription
    const endpoint = AppConfig.api.endpoints.subscriptions.current;
    return apiClient.request<Subscription>(endpoint);
  }
  
  /**
   * Subscribe to a plan
   * @param plan The subscription plan to sign up for
   */
  async subscribe(plan: 'monthly' | 'yearly'): Promise<Subscription> {
    // 🔧 INTEGRATION: Replace with real Spring Boot + payment processor integration
    // POST /subscriptions will process payment and create subscription document
    const endpoint = AppConfig.api.endpoints.subscriptions.create;
    return apiClient.request<Subscription>(endpoint, {
      method: 'POST',
      body: { plan },
    });
  }
  
  /**
   * Cancel current subscription
   */
  async cancelSubscription(): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot subscription cancellation endpoint
    // DELETE /subscriptions/current will mark subscription as canceled
    const endpoint = AppConfig.api.endpoints.subscriptions.cancel;
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get saved payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // 🔧 INTEGRATION: Replace with Spring Boot payment methods endpoint
    // GET /payment-methods will return array of MongoDB payment method documents
    const endpoint = AppConfig.api.endpoints.subscriptions.paymentMethods;
    return apiClient.request<PaymentMethod[]>(endpoint);
  }
  
  /**
   * Add a new payment method
   */
  async addPaymentMethod(tokenizedPaymentInfo: any): Promise<PaymentMethod> {
    // 🔧 INTEGRATION: Replace with real payment processor integration
    // POST /payment-methods will store payment method in MongoDB and with payment processor
    const endpoint = AppConfig.api.endpoints.subscriptions.paymentMethods;
    return apiClient.request<PaymentMethod>(endpoint, {
      method: 'POST',
      body: tokenizedPaymentInfo,
    });
  }
  
  /**
   * Remove a payment method
   */
  async removePaymentMethod(id: string): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // DELETE /payment-methods/{id} will remove payment method from MongoDB and payment processor
    const endpoint = `${AppConfig.api.endpoints.subscriptions.paymentMethods}/${id}`;
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get transaction history
   */
  async getTransactions(params?: {startDate?: string, endDate?: string}): Promise<Transaction[]> {
    // 🔧 INTEGRATION: Replace with real Spring Boot transactions endpoint
    // GET /transactions will return array of MongoDB transaction documents
    const endpoint = AppConfig.api.endpoints.subscriptions.transactions;
    return apiClient.request<Transaction[]>(endpoint, {
      params: params as Record<string, string>
    });
  }
}

export const subscriptionService = new SubscriptionService();
