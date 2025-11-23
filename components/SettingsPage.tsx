import React, { useState } from 'react';
import { User, Bell, Lock, Store, Globe, Palette, Save, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveSupabaseConfig, clearSupabaseConfig, isSupabaseConfigured, activeConfig } from '../lib/supabase';

const SettingsPage: React.FC = () => {
  // Initialize with localStorage OR the active config (which includes the hardcoded demo keys)
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('luna_supabase_url') || activeConfig.url || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('luna_supabase_key') || activeConfig.key || '');
  
  const isConnected = isSupabaseConfigured();

  const handleSaveConnection = () => {
    if (supabaseUrl && supabaseKey) {
        saveSupabaseConfig(supabaseUrl, supabaseKey);
    }
  };

  const handleDisconnect = () => {
      clearSupabaseConfig();
      setSupabaseUrl('');
      setSupabaseKey('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
           <p className="text-gray-500">Manage your account settings and preferences.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <Save size={18} className="mr-2" />
            Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation - could be sticky */}
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg transition-colors">
            <User size={18} className="mr-3" /> Profile
          </button>
          <button className="w-full flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg">
            <Database size={18} className="mr-3" /> Data Source
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg transition-colors">
            <Store size={18} className="mr-3" /> Store Info
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg transition-colors">
            <Bell size={18} className="mr-3" /> Notifications
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg transition-colors">
            <Lock size={18} className="mr-3" /> Security
          </button>
        </div>

        {/* Content Area */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
        >
           {/* Database Connection Section */}
           <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
             <div className="flex justify-between items-start mb-4 border-b pb-4">
                 <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        Supabase Connection
                        {isConnected ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                                <CheckCircle size={12} className="mr-1" /> Active
                            </span>
                        ) : (
                             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Mock Data Mode</span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Connect your real database to activate live data.</p>
                 </div>
                 {isConnected && (
                     <button onClick={handleDisconnect} className="text-xs text-red-600 hover:underline">Reset Connection</button>
                 )}
             </div>

             {!isConnected && (
                 <div className="mb-4 bg-indigo-50 p-3 rounded-lg flex gap-3 text-sm text-indigo-800">
                     <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                     <p>Currently using <strong>Mock Data</strong>. Enter your Supabase credentials below to connect to a real backend.</p>
                 </div>
             )}

             <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                    <input 
                        type="text" 
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://xyz.supabase.co" 
                        className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Public Anon Key</label>
                    <input 
                        type="password" 
                        value={supabaseKey}
                        onChange={(e) => setSupabaseKey(e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                        className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm" 
                    />
                  </div>
                  <div className="pt-2">
                      <button 
                        onClick={handleSaveConnection}
                        disabled={!supabaseUrl || !supabaseKey}
                        className="px-4 py-2 bg-indigo-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                          {isConnected ? 'Update Connection' : 'Connect Database'}
                      </button>
                  </div>
             </div>
          </section>

          {/* Profile Section */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Profile Information</h3>
            <div className="space-y-4">
               <div className="flex items-center gap-4 mb-6">
                 <img src="https://picsum.photos/100/100" alt="Avatar" className="w-20 h-20 rounded-full border-4 border-indigo-50" />
                 <div>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">Change Avatar</button>
                 </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" defaultValue="Khalifa" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Admin" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" defaultValue="admin@lunastore.com" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;