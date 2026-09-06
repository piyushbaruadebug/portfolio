import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Send } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const emailAddress = 'piyushbarua9@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGmail = () => {
    const subject = senderName ? `Contact from ${senderName}` : 'Portfolio Message';
    const body = `Name: ${senderName || 'Not provided'}\nEmail: ${
      senderEmail || 'Not provided'
    }\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      emailAddress
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      handleOpenGmail();
      setTimeout(() => {
        setSent(false);
      }, 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Minimal Modal Box */}
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-neutral-900/40">
          <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-medium">
            <Mail className="w-4 h-4 text-red-500" />
            <span>SEND DISPATCH</span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick email row */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <span className="font-mono text-xs text-neutral-300 font-medium select-all">
              {emailAddress}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-neutral-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenGmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-[11px] font-mono text-red-300 hover:text-white transition-all cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open Gmail</span>
              </button>

              <a
                href="https://wa.me/916289840736"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-500 text-[11px] font-mono text-emerald-300 hover:text-white transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Minimal Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] text-neutral-400 block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-neutral-400 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] text-neutral-400 block mb-1">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            {sent && (
              <p className="text-green-400 font-mono text-xs animate-fadeIn">
                Opening Gmail to send your message...
              </p>
            )}

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
