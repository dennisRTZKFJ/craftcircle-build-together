
/**
 * Subscription Service
 * 
 * Manages premium subscriptions, payments, and transactions.
 * Integrates with Spring Boot subscription endpoints.
 * 
 * This service:
 * - Retrieves current subscription status
 * - Handles subscription creation and cancellation
 * - Manages payment methods
 * - Tracks transaction history
 */

import { apiClient } from './api';
import { AppConfig } from '@/config/app.config';

/**
 * Subscription Interface
 * 
 * Represents a user subscription in the system.
 * Maps to MongoDB subscription document structure.
 */
export interface Subscription {
  id: string;  // Converted from MongoDB _id
  status: 'active' | 'canceled' | 'past_due' | 'inactive';
  plan: 'monthly' | 'yearly' | 'free';
  renewalDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payment Method Interface
 * 
 * Represents a saved payment method.
 * Maps to MongoDB payment method document structure.
 */
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

/**
 * Transaction Interface
 * 
 * Represents a financial transaction.
 * Maps to MongoDB transaction document structure.
 */
export interface Transaction {
  id: string;  // Converted from MongoDB _id
  date: string;
  type: 'payment' | 'income' | 'refund';
  description: string;
  amount: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Subscription Service Class
 * 
 * Manages user subscriptions and payment methods.
 * 
 * Usage example:
 * ```typescript
 * // Get current subscription
 * const subscription = await subscriptionService.getSubscription();
 * 
 * // Subscribe to premium plan
 * try {
 *   await subscriptionService.subscribe('monthly');
 *   toast({ title: "Subscription successful!" });
 * } catch (error) {
 *   console.error("Subscription failed:", error);
 * }
 * ```
 */
class SubscriptionService {
  /**
   * Get Current Subscription
   * 
   * Retrieves the user's current subscription status.
   * 
   * @returns Subscription details
   * 
   * Production implementation:
   * - Sends authenticated request to subscription endpoint
   * - Returns MongoDB document with subscription details
   * - Document is transformed (_id → id) by API client
   */
  async getSubscription(): Promise<Subscription> {
    // 🔧 INTEGRATION: Replace with Spring Boot subscription endpoint
    // GET /subscriptions/current will return MongoDB document with user subscription
    const endpoint = AppConfig.api.endpoints.subscriptions.current;
    return apiClient.request<Subscription>(endpoint);
  }
  
  /**
   * Subscribe to Plan
   * 
   * Creates a new subscription for the user.
   * 
   * @param plan The subscription plan to sign up for
   * @returns New subscription details
   * 
   * Production implementation:
   * - Sends plan selection to backend
   * - Backend integrates with payment processor
   * - Returns created subscription document
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
   * Cancel Subscription
   * 
   * Cancels the user's current subscription.
   * 
   * Production implementation:
   * - Sends cancellation request to backend
   * - Backend updates subscription status in database
   * - Backend notifies payment processor
   */
  async cancelSubscription(): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot subscription cancellation endpoint
    // POST /subscriptions/cancel will mark subscription as canceled
    const endpoint = AppConfig.api.endpoints.subscriptions.cancel;
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get Payment Methods
   * 
   * Retrieves all saved payment methods for the user.
   * 
   * @returns Array of payment methods
   * 
   * Production implementation:
   * - Retrieves payment methods from backend
   * - Backend fetches from database and payment processor
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // 🔧 INTEGRATION: Replace with Spring Boot payment methods endpoint
    // GET /payment-methods will return array of MongoDB payment method documents
    const endpoint = AppConfig.api.endpoints.subscriptions.paymentMethods;
    return apiClient.request<PaymentMethod[]>(endpoint);
  }
  
  /**
   * Add Payment Method
   * 
   * Adds a new payment method for the user.
   * 
   * @param tokenizedPaymentInfo Tokenized payment information from payment processor
   * @returns Newly added payment method
   * 
   * Production implementation:
   * - Sends tokenized payment info to backend (never raw card details)
   * - Backend validates and stores with payment processor
   * - Returns created payment method document
   * 
   * Example production code:
   * ```typescript
   * // Using Stripe Elements for secure tokenization
   * const { token } = await stripe.createToken(cardElement);
   * const paymentMethod = await subscriptionService.addPaymentMethod({
   *   tokenId: token.id,
   *   last4: token.card.last4,
   *   brand: token.card.brand,
   *   expiryMonth: token.card.exp_month,
   *   expiryYear: token.card.exp_year
   * });
   * ```
   */
  async addPaymentMethod(tokenizedPaymentInfo: any): Promise<PaymentMethod> {
    // 🔧 INTEGRATION: Replace with real payment processor integration
    // POST /payment-methods will store payment method in MongoDB and with payment processor
    const endpoint = AppConfig.api.endpoints.subscriptions.addPaymentMethod;
    return apiClient.request<PaymentMethod>(endpoint, {
      method: 'POST',
      body: tokenizedPaymentInfo,
    });
  }
  
  /**
   * Remove Payment Method
   * 
   * Deletes a saved payment method.
   * 
   * @param id Payment method ID
   * 
   * Production implementation:
   * - Sends deletion request to backend
   * - Backend removes from database and payment processor
   */
  async removePaymentMethod(id: string): Promise<void> {
    // 🔧 INTEGRATION: Replace with real Spring Boot endpoint
    // DELETE /payment-methods/{id} will remove payment method from MongoDB and payment processor
    const endpoint = AppConfig.api.endpoints.subscriptions.removePaymentMethod(id);
    await apiClient.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  /**
   * Get Transaction History
   * 
   * Retrieves transaction history for the user.
   * 
   * @param params Optional date range filter
   * @returns Array of transactions
   * 
   * Production implementation:
   * - Retrieves filtered transactions from backend
   * - Backend fetches from database with appropriate filters
   * 
   * Example usage:
   * ```typescript
   * // Get transactions for last month
   * const startDate = new Date();
   * startDate.setMonth(startDate.getMonth() - 1);
   * 
   * const transactions = await subscriptionService.getTransactions({
   *   startDate: startDate.toISOString().split('T')[0],
   *   endDate: new Date().toISOString().split('T')[0]
   * });
   * ```
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

/**
 * Subscription Service Instance
 * 
 * Exported for use throughout the application
 */
export const subscriptionService = new SubscriptionService();
