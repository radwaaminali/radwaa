import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order, OrderStatus, Customer, Product } from '../types';

// --- MOCK DATA (Fallback) ---

const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7001', customerName: 'Ahmed Ali', status: OrderStatus.Delivered, amount: 120.50, date: '2023-10-25', items: 3 },
  { id: '#ORD-7002', customerName: 'Sarah Smith', status: OrderStatus.Pending, amount: 85.00, date: '2023-10-25', items: 1 },
  { id: '#ORD-7003', customerName: 'John Doe', status: OrderStatus.Shipped, amount: 240.20, date: '2023-10-24', items: 5 },
  { id: '#ORD-7004', customerName: 'Fatima Noor', status: OrderStatus.Cancelled, amount: 45.00, date: '2023-10-24', items: 2 },
  { id: '#ORD-7005', customerName: 'Mike Ross', status: OrderStatus.Delivered, amount: 600.00, date: '2023-10-23', items: 10 },
  { id: '#ORD-7006', customerName: 'Rachel Green', status: OrderStatus.Pending, amount: 35.99, date: '2023-10-23', items: 1 },
  { id: '#ORD-7007', customerName: 'Monica Geller', status: OrderStatus.Shipped, amount: 150.00, date: '2023-10-22', items: 4 },
  { id: '#ORD-7008', customerName: 'Chandler Bing', status: OrderStatus.Delivered, amount: 99.99, date: '2023-10-22', items: 2 },
  { id: '#ORD-7009', customerName: 'Joey Tribbiani', status: OrderStatus.Pending, amount: 25.50, date: '2023-10-21', items: 5 },
  { id: '#ORD-7010', customerName: 'Phoebe Buffay', status: OrderStatus.Cancelled, amount: 12.00, date: '2023-10-21', items: 1 },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUST-001', name: 'Ahmed Ali', email: 'ahmed@example.com', location: 'Cairo, Egypt', orders: 12, spent: '$1,200.50', status: 'Active' },
  { id: 'CUST-002', name: 'Sarah Smith', email: 'sarah@example.com', location: 'London, UK', orders: 5, spent: '$450.00', status: 'Active' },
  { id: 'CUST-003', name: 'John Doe', email: 'john@example.com', location: 'New York, USA', orders: 2, spent: '$120.00', status: 'Inactive' },
  { id: 'CUST-004', name: 'Fatima Noor', email: 'fatima@example.com', location: 'Dubai, UAE', orders: 24, spent: '$3,400.00', status: 'Active' },
  { id: 'CUST-005', name: 'Mike Ross', email: 'mike@example.com', location: 'Toronto, Canada', orders: 1, spent: '$45.00', status: 'Inactive' },
  { id: 'CUST-006', name: 'Emily Blunt', email: 'emily@example.com', location: 'Sydney, Australia', orders: 8, spent: '$890.00', status: 'Active' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'PRD-001', name: 'Luna Wireless Headset', category: 'Electronics', price: '$120.00', stock: 45, status: 'In Stock' },
  { id: 'PRD-002', name: 'Galaxy Smart Watch', category: 'Wearables', price: '$250.00', stock: 12, status: 'Low Stock' },
  { id: 'PRD-003', name: 'Ergonomic Mouse', category: 'Accessories', price: '$45.00', stock: 0, status: 'Out of Stock' },
  { id: 'PRD-004', name: 'Mechanical Keyboard', category: 'Accessories', price: '$150.00', stock: 30, status: 'In Stock' },
  { id: 'PRD-005', name: 'USB-C Hub Multiport', category: 'Accessories', price: '$60.00', stock: 100, status: 'In Stock' },
  { id: 'PRD-006', name: 'HD Webcam 4K', category: 'Electronics', price: '$99.00', stock: 5, status: 'Low Stock' },
  { id: 'PRD-007', name: 'Laptop Stand Pro', category: 'Furniture', price: '$35.00', stock: 200, status: 'In Stock' },
];

// --- API METHODS ---

const SIMULATE_DELAY = 600;

export const api = {
  getOrders: async (): Promise<Order[]> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('orders').select('*');
      if (!error && data) return data as unknown as Order[]; // Assuming Supabase schema matches types
      console.warn("Supabase Fetch Error (Orders):", error);
    }
    
    // Fallback or if not configured
    await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
    return MOCK_ORDERS;
  },

  getCustomers: async (): Promise<Customer[]> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('customers').select('*');
      if (!error && data) return data as unknown as Customer[];
    }
    await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
    return MOCK_CUSTOMERS;
  },

  getProducts: async (): Promise<Product[]> => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) return data as unknown as Product[];
    }
    await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
    return MOCK_PRODUCTS;
  }
};