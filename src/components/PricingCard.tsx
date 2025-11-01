import React from 'react';
import { Bot } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  aiCalls: string;
  leadsLimit: string;
  agents: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  isPopular?: boolean;
  isPremium?: boolean;
  onGetStarted?: () => void;
}

export function PricingCard({ title, price, aiCalls, leadsLimit, agents, features, isPopular, isPremium, onGetStarted }: PricingCardProps) {
  return (
    <div 
      className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        isPopular 
          ? 'border-2 border-[#007bff] shadow-xl shadow-[#007bff]/20' 
          : isPremium
          ? 'border-2 border-[#007bff]/30 shadow-xl shadow-[#007bff]/10'
          : 'border-2 border-gray-200 shadow-lg'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#007bff] to-[#0066e6] text-white px-6 py-1.5 rounded-full shadow-lg" style={{ fontWeight: '600', fontSize: '14px' }}>
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Header with Gradient */}
      <div className="bg-gradient-to-r from-[#007bff] to-[#0066e6] rounded-xl p-4 mb-6 text-center">
        <h3 className="text-white mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
          {title}
        </h3>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="mb-2">
          <span className="text-[#0d1b2a]" style={{ fontSize: '48px', fontWeight: '700' }}>
            {price}
          </span>
        </div>
        <p className="text-gray-600">per month</p>
      </div>

      {/* AI Calls, Leads Limit & Agents */}
      <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-700" style={{ fontWeight: '600' }}>AI Calls:</span>
          <span className="text-[#007bff]" style={{ fontWeight: '600' }}>{aiCalls}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700" style={{ fontWeight: '600' }}>Leads Limit:</span>
          <span className="text-[#007bff]" style={{ fontWeight: '600' }}>{leadsLimit}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-[#007bff]" />
            <span className="text-gray-700" style={{ fontWeight: '600' }}>Agents:</span>
          </div>
          <span className="text-[#0d1b2a]" style={{ fontWeight: '600' }}>{agents}</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-4 mb-8">
        <p className="text-gray-600 mb-4" style={{ fontWeight: '600' }}>Key Features:</p>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onGetStarted}
        className={`w-full py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
          isPopular
            ? 'bg-[#007bff] text-white hover:bg-[#0066e6]'
            : 'bg-gray-100 text-[#0d1b2a] hover:bg-[#007bff] hover:text-white'
        }`}
        style={{ fontWeight: '600' }}
      >
        Get Started
      </button>
    </div>
  );
}
