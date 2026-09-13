import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Inquiry } from '../../types';
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, Reply, Archive, X } from 'lucide-react';

export const InquiryManager: React.FC = () => {
  const { data, updateInquiryStatus } = useRestaurant();
  const [filter, setFilter] = useState<string>('All');
  const [activeReplyInquiry, setActiveReplyInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = data.inquiries.filter((inq) => {
    if (filter === 'All') return true;
    return inq.status === filter;
  });

  const handleSendReply = (inq: Inquiry) => {
    if (!replyText) return;
    updateInquiryStatus(inq.id, 'Replied', replyText);
    setActiveReplyInquiry(null);
    setReplyText('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Customer Inquiries & Form Submissions
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Review guest requests for private dining, wedding rehearsals, buyouts, and feedback.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Unread', 'Replied', 'Archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === status
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Inquiries ({filtered.length})</span>
          <span>Fast response time &lt; 4 hours</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-xs">
            No inquiries under this filter.
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {filtered.map((inq) => (
              <div key={inq.id} className="p-6 space-y-4 hover:bg-stone-850/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-stone-100 text-base">
                      {inq.name}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'Unread'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : inq.status === 'Replied'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(inq.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-amber-300 mb-1">
                    {inq.subject}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-body bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
                    "{inq.message}"
                  </p>
                </div>

                {inq.replyNote && (
                  <div className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/60">
                    <strong>Recorded Staff Reply:</strong> {inq.replyNote}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-stone-400 border-t border-stone-850">
                  <div className="flex items-center gap-4">
                    <a
                      href={`mailto:${inq.email}`}
                      className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-stone-300"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>{inq.email}</span>
                    </a>
                    {inq.phone && (
                      <a
                        href={`tel:${inq.phone}`}
                        className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-stone-300"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{inq.phone}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveReplyInquiry(inq);
                        setReplyText(`Hello ${inq.name},\nThank you for considering Aryas. We would be thrilled to host your event...`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold flex items-center gap-1 border border-amber-500/30 transition-colors"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Log / Draft Reply</span>
                    </button>

                    {inq.status !== 'Archived' ? (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'Archived')}
                        className="p-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 text-xs border border-stone-800"
                        title="Archive inquiry"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'Unread')}
                        className="text-xs text-stone-400 hover:text-stone-200"
                      >
                        Unarchive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {activeReplyInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-stone-900 border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-heading font-bold text-stone-100">
                Reply to {activeReplyInquiry.name}
              </h3>
              <button
                onClick={() => setActiveReplyInquiry(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-stone-400">
              Replying to: <strong>{activeReplyInquiry.email}</strong> ({activeReplyInquiry.subject})
            </div>

            <textarea
              rows={5}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-body"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveReplyInquiry(null)}
                className="px-4 py-2 rounded-full bg-stone-800 text-stone-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendReply(activeReplyInquiry)}
                className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Replied & Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
