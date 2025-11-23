import React from 'react';

export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  customerName: string;
  status: OrderStatus;
  amount: number;
  date: string;
  items: number;
}

export interface StatItem {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

export interface NavItem {
  label: string;
  icon: React.ComponentType<any>;
  id: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  spent: string;
  status: 'Active' | 'Inactive';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
