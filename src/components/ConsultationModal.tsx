import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ConsultationBooking } from '../types';
import { X, Calendar, Video, MapPin, MessageCircle, Check, Download } from 'lucide-react';
import { BRAND, whatsappDisplay } from '../config/brand';

const SERVICES = [
  { key: 'signature', title: 'Everyday Scent', minutes: 30 },
  { key: 'bridal', title: 'Bridal & Wedding', minutes: 45 },
  { key: 'gifting', title: 'Gifting', minutes: 20 }
] as const;

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-CA');
};

export const ConsultationModal: React.FC = () => {
  const { isConsultationOpen, setIsConsultationOpen, addConsultation, userProfile } = useStore();

  const [type, setType] = useState<'boutique' | 'video' | 'whatsapp'>('video');
  const [service, setService] = useState<'signature' | 'bridal' | 'gifting'>('signature');
  const [location, setLocation] = useState(BRAND.studios[0] ?? '');
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState('16:00');
  const [timezone, setTimezone] = useState('Asia/Karachi (PKT +05:00)');
  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [customerEmail, setCustomerEmail] = useState(userProfile.email || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone || '');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  if (!isConsultationOpen) return null;

  const hasStudios = BRAND.studios.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: ConsultationBooking = {
      id: `MF-C${Date.now().toString().slice(-6)}`,
      type,
      service,
      location: type === 'boutique' ? location : type === 'video' ? 'Video call' : 'WhatsApp call',
      date,
      time,
      timezone,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    addConsultation(newBooking);
    setConfirmedBooking(newBooking);
  };

  const downloadICS = () => {
    if (!confirmedBooking) return;
    const pad = (n: number) => String(n).padStart(2, '0');
    const stamp = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const start = new Date(`${confirmedBooking.date}T${confirmedBooking.time}:00`);
    const minutes = SERVICES.find(s => s.key === confirmedBooking.service)?.minutes ?? 30;
    const end = new Date(start.getTime() + minutes * 60000);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${BRAND.name}//Consultation//EN`,
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@mahafragrances`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${BRAND.name} consultation`,
      `LOCATION:${confirmedBooking.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `maha-fragrances-consultation-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#140F11] border border-[#2A1621] shadow-2xl p-6 sm:p-8 text-[#F7F2EA] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2A1621]">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F2EA] font-light">
            Book a Consultation
          </h2>

          <button
            onClick={() => setIsConsultationOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmedBooking ? (
          <form onSubmit={handleSubmit} className="py-6 space-y-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-2 font-medium">
                1. How would you like to talk?
              </label>
              <div className={`grid gap-3 ${hasStudios ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {hasStudios && (
                  <button
                    type="button"
                    onClick={() => setType('boutique')}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      type === 'boutique'
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#C9A66B] mb-1" />
                    <span className="text-xs font-medium block">In Person</span>
                    <span className="text-[10px] text-[#E9E0D2]/50 block">At our studio</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setType('video')}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    type === 'video'
                      ? 'border-[#C9A66B] bg-[#2A1621]/60'
                      : 'border-[#2A1621] bg-[#0E0B0C]'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#C9A66B] mb-1" />
                  <span className="text-xs font-medium block">Video Call</span>
                  <span className="text-[10px] text-[#E9E0D2]/50 block">From anywhere</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('whatsapp')}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    type === 'whatsapp'
                      ? 'border-[#C9A66B] bg-[#2A1621]/60'
                      : 'border-[#2A1621] bg-[#0E0B0C]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A66B] mb-1" />
                  <span className="text-xs font-medium block">WhatsApp Call</span>
                  <span className="text-[10px] text-[#E9E0D2]/50 block">{whatsappDisplay || 'We call you'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-2 font-medium">
                2. What do you need help with?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SERVICES.map(s => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setService(s.key)}
                    className={`p-3 text-center border transition-all cursor-pointer ${
                      service === s.key
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <span className="text-xs font-medium block">{s.title}</span>
                    <span className="text-[10px] text-[#C9A66B] block">{s.minutes} mins</span>
                  </button>
                ))}
              </div>
            </div>

            {type === 'boutique' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Studio
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                >
                  {BRAND.studios.map(studio => (
                    <option key={studio} value={studio}>{studio}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={tomorrow()}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                >
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                >
                  <option value="Asia/Karachi (PKT +05:00)">Karachi (PKT +05:00)</option>
                  <option value="Europe/London (GMT +00:00)">London (GMT)</option>
                  <option value="Asia/Dubai (GST +04:00)">Dubai (GST +04:00)</option>
                  <option value="America/New_York (EST -05:00)">New York (EST)</option>
                  <option value="America/Toronto (EST -05:00)">Toronto (EST)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  required
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                Anything we should know? (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. shopping for a December wedding, I like woody scents"
                rows={2}
                className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Appointment</span>
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#2A1621] border border-[#C9A66B] flex items-center justify-center text-[#C9A66B]">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-3xl text-[#F7F2EA] font-light">
                Thanks, {confirmedBooking.customerName}
              </h3>
              <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 max-w-md mx-auto">
                Your booking reference is <strong className="text-[#C9A66B]">{confirmedBooking.id}</strong>.
                We'll contact you on {confirmedBooking.customerPhone} to confirm the time.
              </p>
            </div>

            <div className="p-4 bg-[#0E0B0C] border border-[#2A1621] max-w-md mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#E9E0D2]/50">Format:</span>
                <span className="text-[#F7F2EA] font-medium">{confirmedBooking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E9E0D2]/50">Date & Time:</span>
                <span className="text-[#C9A66B] font-medium">{confirmedBooking.date} at {confirmedBooking.time} ({confirmedBooking.timezone})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={downloadICS}
                className="px-6 py-2.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setIsConsultationOpen(false);
                }}
                className="px-6 py-2.5 border border-[#2A1621] text-xs uppercase tracking-wider text-[#E9E0D2]/80 hover:text-[#C9A66B] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
