import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { ButtonPrimary } from './components/ButtonPrimary';
import { FeatureCard } from './components/FeatureCard';
import { PricingCard } from './components/PricingCard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { RegistrationPage } from './components/RegistrationPage';
import { Phone, BarChart3, Shield, Box, CheckCircle, TrendingUp, Headphones, Database, Mic, Bot, MessageCircle, Activity, Sparkles, Zap } from 'lucide-react';

export default function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (showRegistration) {
    return <RegistrationPage onNavigateHome={() => setShowRegistration(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onRegisterClick={() => setShowRegistration(true)} onPricingClick={scrollToPricing} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3QlMjBibHVlfGVufDF8fHx8MTc2MTY2OTIyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a]/90 via-[#0d1b2a]/85 to-[#007bff]/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6 tracking-wide" style={{ fontSize: '68px', fontWeight: '700', lineHeight: '1.1' }}>
            One Platform. Endless Possibilities for Every Organization.
          </h1>
          <p className="text-white/90 mb-12 max-w-4xl mx-auto" style={{ fontSize: '21px', fontWeight: '500', lineHeight: '1.5' }}>
            Sign up today to streamline operations, boost engagement, and access next-gen analytics designed for growth.
          </p>
          <ButtonPrimary onClick={() => setShowRegistration(true)}>
            Register
          </ButtonPrimary>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>

      {/* Feature Highlights Section */}
      <section 
        id="features" 
        data-animate
        className={`py-24 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has('features') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#0d1b2a] mb-4">
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Phone size={40} strokeWidth={1.5} />}
              title="AI Calling Agents"
              description="Automate your customer engagement with intelligent AI agents capable of initiating and managing voice-based conversations — no human intervention needed."
            />
            <FeatureCard
              icon={<BarChart3 size={40} strokeWidth={1.5} />}
              title="Advanced Analytics"
              description="Gain data-driven insights on engagement patterns and customer sentiment through real-time dashboards and analytics."
            />
            <FeatureCard
              icon={<Shield size={40} strokeWidth={1.5} />}
              title="Enterprise Security"
              description="Ensure top-tier protection with encrypted data storage, secure APIs, and compliance with modern security standards."
            />
            <FeatureCard
              icon={<Box size={40} strokeWidth={1.5} />}
              title="Scalable & Modular Architecture"
              description="Easily adapt the CRM to educational institutions, businesses, or government service platforms with flexible modules and multi-tenant support."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing" 
        ref={pricingRef}
        data-animate
        className={`py-24 bg-white transition-all duration-1000 ${
          visibleSections.has('pricing') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#0d1b2a] mb-4">
              Flexible Plans Built for Every Organization
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
              Choose the perfect plan that scales with your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Starter"
              price="₹999"
              aiCalls="100"
              leadsLimit="100"
              agents="1 prebuilt"
              features={[
                { icon: <Phone size={16} className="text-[#007bff]" />, text: 'Basic AI Calling' },
                { icon: <Database size={16} className="text-[#007bff]" />, text: 'Normal Database' },
                { icon: <Bot size={16} className="text-[#007bff]" />, text: 'AI CRM' },
                { icon: <BarChart3 size={16} className="text-[#007bff]" />, text: 'Dashboard' },
                { icon: <TrendingUp size={16} className="text-[#007bff]" />, text: 'Outbound Only' }
              ]}
              onGetStarted={() => setShowRegistration(true)}
            />

            <PricingCard
              title="Pro"
              price="₹2,999"
              aiCalls="200"
              leadsLimit="1,000"
              agents="5 agents"
              features={[
                { icon: <MessageCircle size={16} className="text-[#007bff]" />, text: 'Sentiment + Multilingual AI' },
                { icon: <CheckCircle size={16} className="text-[#007bff]" />, text: 'Includes Starter Features' },
                { icon: <Mic size={16} className="text-[#007bff]" />, text: 'AI Voice' },
                { icon: <Activity size={16} className="text-[#007bff]" />, text: 'Real-Time Dashboard' },
                { icon: <Phone size={16} className="text-[#007bff]" />, text: 'Inbound + Outbound' }
              ]}
              isPopular
              onGetStarted={() => setShowRegistration(true)}
            />

            <PricingCard
              title="Enterprise"
              price="₹4,999"
              aiCalls="Unlimited"
              leadsLimit="Unlimited"
              agents="Unlimited + custom triggers"
              features={[
                { icon: <Sparkles size={16} className="text-[#007bff]" />, text: 'Emotion-Aware AI' },
                { icon: <Zap size={16} className="text-[#007bff]" />, text: 'Contextual Conversations' },
                { icon: <CheckCircle size={16} className="text-[#007bff]" />, text: 'Includes Pro + Starter' },
                { icon: <Bot size={16} className="text-[#007bff]" />, text: 'Full Automation' },
                { icon: <Headphones size={16} className="text-[#007bff]" />, text: '24/7 Support' },
                { icon: <Phone size={16} className="text-[#007bff]" />, text: 'Hybrid Agents' }
              ]}
              isPremium
              onGetStarted={() => setShowRegistration(true)}
            />
          </div>

          {/* Caption */}
          <div className="text-center mt-12">
            <p className="text-gray-600" style={{ fontSize: '16px' }}>
              All plans include AI Calling and Real-Time Dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Benefits */}
            <div>
              <h2 className="text-[#0d1b2a] mb-6">
                Why Choose Our CRM?
              </h2>
              <p className="text-gray-600 mb-8">
                We've built a next-generation CRM designed to enhance productivity, automate interactions, and provide actionable insights — all powered by AI.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007bff]/10 flex items-center justify-center mt-1">
                    <CheckCircle size={16} className="text-[#007bff]" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1b2a] mb-2">Smart Automation</h3>
                    <p className="text-gray-600">Reduce manual calling tasks with AI-driven voice agents that handle inquiries, reminders, and follow-ups autonomously.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007bff]/10 flex items-center justify-center mt-1">
                    <CheckCircle size={16} className="text-[#007bff]" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1b2a] mb-2">Data-Driven Decisions</h3>
                    <p className="text-gray-600">Monitor performance, sentiment, and engagement trends through intelligent reporting dashboards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007bff]/10 flex items-center justify-center mt-1">
                    <CheckCircle size={16} className="text-[#007bff]" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1b2a] mb-2">Seamless Onboarding</h3>
                    <p className="text-gray-600">Get started quickly with a simple, guided setup process for teams of any size.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007bff]/10 flex items-center justify-center mt-1">
                    <CheckCircle size={16} className="text-[#007bff]" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1b2a] mb-2">Scalable Performance</h3>
                    <p className="text-gray-600">From startups to large enterprises, our system grows with your organization without compromising efficiency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#007bff]/10 flex items-center justify-center mt-1">
                    <Headphones size={16} className="text-[#007bff]" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1b2a] mb-2">24/7 Support & Continuous Innovation</h3>
                    <p className="text-gray-600">Our AI-assisted support ensures smooth operations with regular updates inspired by user feedback and industry trends.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjE2NjM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Analytics Dashboard"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#007bff]/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0d1b2a]/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Call-Out Section */}
      <section className="py-24 bg-gradient-to-br from-[#0d1b2a] to-[#007bff] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of organizations already using VELRIC to streamline their operations, increase productivity, and drive growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full sm:w-96 px-6 py-4 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/40 backdrop-blur-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowRegistration(true)}
              className="w-full sm:w-auto bg-white text-[#007bff] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Get Started Free
            </button>
          </div>

          <p className="text-white/70 mt-6">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[#007bff] mb-2">10,000+</div>
              <p className="text-gray-600">Active Organizations</p>
            </div>
            <div>
              <div className="text-[#007bff] mb-2">500K+</div>
              <p className="text-gray-600">Daily Active Users</p>
            </div>
            <div>
              <div className="text-[#007bff] mb-2">99.9%</div>
              <p className="text-gray-600">Uptime Guarantee</p>
            </div>
            <div>
              <div className="text-[#007bff] mb-2">4.9/5</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70">© 2025 VELRIC. All rights reserved.</p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
