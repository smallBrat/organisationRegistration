import React, { useState, useRef } from 'react';
import { Navigation } from './Navigation';
import { Upload, PhoneIncoming, PhoneOutgoing, Phone } from 'lucide-react';

interface RegistrationPageProps {
  onNavigateHome: () => void;
}

export function RegistrationPage({ onNavigateHome }: RegistrationPageProps) {
  const [agentType, setAgentType] = useState<'inbound' | 'outbound' | 'hybrid'>('hybrid');
  const [agreed, setAgreed] = useState(false);

  // Controlled form fields
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [urls, setUrls] = useState('');

  // Webhook resolution (not shown in UI): prefer VITE_WEBHOOK_URL, then production/local, then ngrok fallback
  const envWebhook = (import.meta as any).env?.VITE_WEBHOOK_URL;
  const productionWebhook = 'http://localhost:5678/webhook/velric';
  const ngrokFallback = 'https://efc28561a29f.ngrok-free.app';
  const resolvedWebhook = envWebhook || productionWebhook || ngrokFallback;
  const [autoCompletedWebhook, setAutoCompletedWebhook] = useState<string | null>(null);

  // If you have a known webhook id, we can auto-append it when user provides only the host.
  // Using the webhook id you provided earlier.
  const KNOWN_WEBHOOK_ID = 'e9d3b15c-b5e2-48b0-8f47-b9334797dc09';

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // store File objects so we can append binary content to FormData
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit invoked', { orgName, email, contact, agreed });
    setResultMessage(null);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Resolve webhook (env -> production -> ngrok) and validate; this URL is not shown in the UI
    let targetWebhook = (resolvedWebhook || '').trim();
    if (!targetWebhook) {
      setErrorMessage('Webhook URL is required');
      return;
    }

    // Basic validation: must include scheme
    if (!/^https?:\/\//i.test(targetWebhook)) {
      setErrorMessage('Webhook URL must start with http:// or https://');
      return;
    }

    // Auto-complete webhook path if missing and we have a known webhook id
    if (!/\/webhook\//i.test(targetWebhook) && KNOWN_WEBHOOK_ID) {
      // If URL ends with slash, avoid double slashes
      targetWebhook = targetWebhook.replace(/\/+$/, '') + `/webhook/${KNOWN_WEBHOOK_ID}`;
      setAutoCompletedWebhook(targetWebhook);
      console.log('Auto-completed webhook URL to:', targetWebhook);
    } else {
      setAutoCompletedWebhook(null);
    }

    // Build FormData for multipart/form-data submission including file binaries
    const formData = new FormData();
    // Organization fields
    formData.append('organizationName', orgName);
    formData.append('industry', industry);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('password', password); // ensure your backend hashes this
    // Agent type and agreement
    formData.append('agentType', agentType);
    formData.append('agreed', String(agreed));
    formData.append('submittedAt', new Date().toISOString());

    // Append each URL as a separate field 'urls'
    const urlList = urls.split('\n').map((u) => u.trim()).filter(Boolean);
    for (const u of urlList) {
      formData.append('urls', u);
    }

    // Append files as binary under the same key 'knowledgeBaseFiles'
    for (const file of selectedFiles) {
      formData.append('knowledgeBaseFiles', file, file.name);
    }

  console.log('Posting registration FormData to webhook:', targetWebhook, { orgName, industry, email, contact, agentType, agreed, urls: urlList, files: selectedFiles.map(f=>f.name) });

    setSubmitting(true);
    try {
      // IMPORTANT: do NOT set the Content-Type header; the browser will set the correct
      // multipart/form-data boundary when sending FormData.
      const res = await fetch(targetWebhook, {
        method: 'POST',
        body: formData,
      });
      // Read response text for debugging and clearer feedback
      const respText = await res.text();
      console.log('Webhook response:', res.status, respText);

      if (!res.ok) {
        throw new Error(`Webhook responded with ${res.status}: ${respText}`);
      }

      setResultMessage(
        respText
          ? `Registration sent successfully. Server response: ${res.status} — ${respText}`
          : `Registration sent successfully. Server response: ${res.status}`
      );
      // Optionally clear form (keeping webhook URL)
      setOrgName('');
      setIndustry('');
      setEmail('');
      setContact('');
      setPassword('');
      setConfirmPassword('');
      setUrls('');
      setSelectedFiles([]);
      setAgreed(false);
    } catch (err: any) {
      // Common browser TypeError: Failed to fetch can indicate CORS, network, or mixed-content issues
      const msg = err?.message || '';
      if (err?.name === 'TypeError' && msg.includes('Failed to fetch')) {
        setErrorMessage('Network error: failed to reach the webhook. Common causes: CORS, mixed-content (HTTPS page calling HTTP webhook), or the webhook URL is unreachable. Check the browser console and network tab for details.');
      } else {
        setErrorMessage(err?.message || 'Failed to send to webhook');
      }
      console.error('Webhook error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation onNavigateHome={onNavigateHome} isRegistrationPage />

      {/* Main Registration Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Registration Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Heading */}
            <div className="text-center mb-10">
              <h1 className="text-[#0d1b2a] mb-4" style={{ fontSize: '48px', fontWeight: '700' }}>
                Register Your Organization
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
                Get started with VELRIC — your AI-powered CRM built for automation, scalability, and intelligent engagement.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Details - 2 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orgName" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors"
                    placeholder="Enter organization name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Industry Type
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors bg-white"
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="government">Government</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Organization Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors"
                    placeholder="contact@organization.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {/* Knowledge Base Section */}
              <div className="border-2 border-blue-200 rounded-2xl p-6 bg-blue-50/30">
                <h3 className="text-[#0d1b2a] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>
                  Add Your Knowledge Base
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="urls" className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                      URLs / Links
                    </label>
                    <textarea
                      id="urls"
                      rows={4}
                      value={urls}
                      onChange={(e) => setUrls(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#007bff] transition-colors resize-none"
                      placeholder="Add relevant knowledge base links (one per line)"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                      Documents
                    </label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#007bff] transition-colors cursor-pointer bg-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={40} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
                      <p className="text-gray-400" style={{ fontSize: '14px' }}>Supported formats: PDF, DOC, TXT</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []) as File[];
                          setSelectedFiles(files);
                        }}
                      />
                      {selectedFiles.length > 0 && (
                        <div className="mt-4 text-left text-sm text-gray-700">
                          <strong>Selected files:</strong>
                          <ul className="list-disc ml-5">
                            {selectedFiles.map((f) => (
                              <li key={f.name + String(f.size)}>{f.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Type Selection */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-[#0d1b2a] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>
                  Select Your Agent Type
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose how your AI Agent interacts
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Inbound */}
                  <button
                    type="button"
                    onClick={() => setAgentType('inbound')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      agentType === 'inbound'
                        ? 'border-[#007bff] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <PhoneIncoming 
                      size={32} 
                      className={`mx-auto mb-3 ${agentType === 'inbound' ? 'text-[#007bff]' : 'text-gray-400'}`} 
                    />
                    <h4 className="text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                      Inbound
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      Receive and manage incoming calls
                    </p>
                  </button>

                  {/* Outbound */}
                  <button
                    type="button"
                    onClick={() => setAgentType('outbound')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      agentType === 'outbound'
                        ? 'border-[#007bff] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <PhoneOutgoing 
                      size={32} 
                      className={`mx-auto mb-3 ${agentType === 'outbound' ? 'text-[#007bff]' : 'text-gray-400'}`} 
                    />
                    <h4 className="text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                      Outbound
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      Make automated outgoing calls
                    </p>
                  </button>

                  {/* Hybrid */}
                  <button
                    type="button"
                    onClick={() => setAgentType('hybrid')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      agentType === 'hybrid'
                        ? 'border-[#007bff] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Phone 
                      size={32} 
                      className={`mx-auto mb-3 ${agentType === 'hybrid' ? 'text-[#007bff]' : 'text-gray-400'}`} 
                    />
                    <h4 className="text-[#0d1b2a] mb-2" style={{ fontWeight: '600' }}>
                      Hybrid
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      Both inbound and outbound capabilities
                    </p>
                  </button>
                </div>
              </div>

              {/* Terms & Submit */}
                <div className="space-y-6 pt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#007bff]"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-[#007bff] hover:underline">
                      Terms & Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Webhook is read from VITE_WEBHOOK_URL (no UI or hard-coded test URL shown) */}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    onClick={() => console.log('submit button clicked')}
                    className={`bg-[#007bff] text-white px-12 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${submitting ? 'opacity-60 cursor-wait' : 'hover:bg-[#0066e6]'}`}
                    style={{ fontWeight: '600' }}
                  >
                    {submitting ? 'Sending...' : 'Register'}
                  </button>

                  {resultMessage && <p className="mt-4 text-sm text-green-600">{resultMessage}</p>}
                  {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

                  <p className="mt-6 text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-[#007bff] hover:underline" style={{ fontWeight: '600' }}>
                      Login here
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[#007bff]/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-[#0d1b2a]/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
