import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#007bff] hover:shadow-xl transition-all duration-300 group">
      <div className="text-[#007bff] mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-[#0d1b2a] mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
