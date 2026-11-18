import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Users, 
  Calendar, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  Server
} from 'lucide-react';
import { fetchInquiries, fetchSiteVisits } from '../firebase/firebaseService';
import { isFirebaseInitialized, firebaseConfig } from '../firebase/config';

export default function AdminPanelModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'siteVisits' | 'firebaseStatus'
  const [inquiries, setInquiries] = useState([]);
  const [siteVisits, setSiteVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const inqs = await fetchInquiries();
      const visits = await fetchSiteVisits();
      setInquiries(inqs);
      setSiteVisits(visits);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="bg-stone-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-500/40 text-teal-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Kokan Nirvana Backend Management Desk
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Firebase & Node Live
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Real-time inquiries, scheduled VIP tours, and Firebase Firestore sync monitor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-stone-100 px-6 pt-3 border-b border-stone-200 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'inquiries' ? 'border-teal-800 text-teal-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Buyer Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('siteVisits')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'siteVisits' ? 'border-teal-800 text-teal-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>VIP Site Visits ({siteVisits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('firebaseStatus')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'firebaseStatus' ? 'border-teal-800 text-teal-900' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Firebase & API Configuration</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-16 text-stone-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2 text-teal-600" />
              <p className="text-xs">Synchronizing data from Firebase Firestore & Node API...</p>
            </div>
          ) : (
            <>
              {/* Tab 1: Inquiries */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 text-sm">
                      No inquiries received yet. Submit an inquiry from the website to see it appear here!
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div key={inq.id || inq._id} className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-stone-900 text-sm">{inq.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                              {inq.interestedCategory || 'General'}
                            </span>
                            <span className="text-[10px] font-medium text-stone-400">
                              {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mb-2">
                            <span className="flex items-center gap-1 font-semibold text-stone-800">
                              <Phone className="w-3.5 h-3.5 text-teal-600" />
                              {inq.phone}
                            </span>
                            {inq.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-stone-400" />
                                {inq.email}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-amber-500" />
                              {inq.city || 'City N/A'}
                            </span>
                            {inq.budget && (
                              <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Budget: {inq.budget}
                              </span>
                            )}
                          </div>

                          {inq.message && (
                            <p className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/80 italic">
                              "{inq.message}"
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold"
                          >
                            Call
                          </a>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Site Visits */}
              {activeTab === 'siteVisits' && (
                <div className="space-y-4">
                  {siteVisits.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 text-sm">
                      No VIP site visits booked yet.
                    </div>
                  ) : (
                    siteVisits.map((sv) => (
                      <div key={sv.id || sv._id} className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-stone-900 text-sm">{sv.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                              📅 Visit Date: {sv.preferredDate}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              {sv.status || 'Confirmed'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mb-2">
                            <span className="flex items-center gap-1 font-semibold text-stone-800">
                              <Phone className="w-3.5 h-3.5 text-teal-600" />
                              {sv.phone}
                            </span>
                            <span className="text-stone-500">
                              Guests: <strong className="text-stone-800">{sv.guestCount || 2}</strong>
                            </span>
                            <span className="text-stone-500">
                              Transport: <strong className="text-teal-700">{sv.pickupNeeded}</strong>
                            </span>
                            <span className="text-stone-500">
                              Origin: <strong className="text-stone-800">{sv.city}</strong>
                            </span>
                          </div>

                          {sv.notes && (
                            <p className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/80 italic">
                              "{sv.notes}"
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <a
                            href={`https://wa.me/${sv.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(sv.name)},%20this%20is%20Kokan%20Nirvana%20Dapoli%20team%20regarding%20your%20site%20visit%20on%20${sv.preferredDate}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold"
                          >
                            Confirm Visit on WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Firebase Status */}
              {activeTab === 'firebaseStatus' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                        <h4 className="font-bold text-stone-900 text-sm">Firebase Firestore Integration</h4>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {isFirebaseInitialized ? 'Initialized & Active' : 'Fallback Local Engine'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      Every submission is saved to Firebase Cloud Firestore in the <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800 font-mono">inquiries</code> and <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800 font-mono">siteVisits</code> collections, and mirrored in the Node.js Express backend.
                    </p>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-700 space-y-1">
                      <div><strong className="text-stone-500">Project ID:</strong> {firebaseConfig.projectId}</div>
                      <div><strong className="text-stone-500">Auth Domain:</strong> {firebaseConfig.authDomain}</div>
                      <div><strong className="text-stone-500">Storage Bucket:</strong> {firebaseConfig.storageBucket}</div>
                      <div><strong className="text-stone-500">Node API:</strong> http://localhost:5000/api</div>
                    </div>

                    <div className="text-xs text-stone-500">
                      💡 To use your own live Google Firebase credentials, simply update the <code className="bg-stone-200 px-1 rounded">client/.env</code> file with your Firebase Console keys.
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
          <span>Kokan Nirvana Sea Shore Property • Administrative Control Desk</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
