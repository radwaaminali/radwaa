import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, X, Moon } from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { label: 'Orders', icon: ShoppingBag, id: 'orders' },
  { label: 'Customers', icon: Users, id: 'customers' },
  { label: 'Products', icon: Package, id: 'products' },
  { label: 'Settings', icon: Settings, id: 'settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-950 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-800">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Moon className="w-6 h-6 text-indigo-400" fill="currentColor" />
            <span>Luna Store</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-indigo-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-indigo-800">
          <div className="flex items-center gap-3">
             <img 
               src="https://picsum.photos/100/100" 
               alt="Khalifa Admin" 
               className="w-10 h-10 rounded-full border-2 border-indigo-400"
             />
             <div>
               <p className="text-sm font-semibold">Khalifa Admin</p>
               <p className="text-xs text-indigo-300">Super Admin</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
