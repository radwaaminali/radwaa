import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import SalesChart from './components/SalesChart';
import OrdersTable from './components/OrdersTable';
import CustomersPage from './components/CustomersPage';
import ProductsPage from './components/ProductsPage';
import SettingsPage from './components/SettingsPage';
import { DollarSign, ShoppingCart, UserPlus, AlertCircle } from 'lucide-react';
import { StatItem } from './types';
import AI_PLANNING from './AI_PLANNING.md?raw'; // Import for demonstration

// Mock Stats Data
const statsData: StatItem[] = [
  {
    title: 'Total Sales Today',
    value: '$2,540.00',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: 'bg-indigo-500', // Used for icon background tint
  },
  {
    title: 'New Orders',
    value: '145',
    change: '+5.2%',
    isPositive: true,
    icon: ShoppingCart,
    color: 'bg-blue-500',
  },
  {
    title: 'New Customers',
    value: '32',
    change: '-2.4%',
    isPositive: false,
    icon: UserPlus,
    color: 'bg-purple-500',
  },
  {
    title: 'Low Stock Items',
    value: '8',
    icon: AlertCircle,
    color: 'bg-orange-500',
  },
];

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>

            {/* Chart & Tables Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart takes 2/3 on large screens */}
              <div className="lg:col-span-2">
                 <SalesChart />
              </div>
              
              {/* Secondary Info or Promotional */}
              <div className="lg:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg flex flex-col justify-center">
                 <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                 <p className="text-indigo-100 mb-6">Upgrade to unlock advanced analytics and inventory forecasting.</p>
                 <button className="bg-white text-indigo-600 py-2 px-4 rounded-lg font-semibold w-fit hover:bg-indigo-50 transition-colors">
                   View Details
                 </button>
              </div>
            </div>

            {/* Recent Orders Table */}
            <OrdersTable title="Recent Orders" />
          </div>
        );
      case 'orders':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
             <div className="flex justify-between items-center">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                   <p className="text-gray-500">View and manage all your store orders.</p>
                 </div>
             </div>
             <OrdersTable title="All Orders" showExport={true} />
          </div>
        );
      case 'customers':
        return (
          <div className="max-w-7xl mx-auto">
            <CustomersPage />
          </div>
        );
      case 'products':
        return (
          <div className="max-w-7xl mx-auto">
            <ProductsPage />
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
