/**
 * WhatsApp Helper Utilities for Kokan Nirvana Sea Shore Property
 * Automatically formats phone numbers and builds direct WhatsApp confirmation URLs
 * targeting the client's registered mobile number.
 */

export function cleanPhoneNumber(rawPhone) {
  if (!rawPhone) return '919820012345';
  let digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return '91' + digits.slice(1);
  }
  if (digits.length >= 11 && digits.startsWith('91')) {
    return digits;
  }
  if (digits.length > 10) {
    return digits;
  }
  return '91' + digits;
}

export function formatDisplayPhone(rawPhone) {
  const cleaned = cleanPhoneNumber(rawPhone);
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return `+${cleaned}`;
}

/**
 * Builds direct WhatsApp confirmation link for a Plot Reservation
 * Targets the buyer's registered phone number.
 */
export function buildReservationWhatsAppUrl(booking) {
  if (!booking) return '#';
  const targetPhone = cleanPhoneNumber(booking.phone);

  const message = 
`🌴 *KOKAN NIRVANA SEA SHORE PROPERTY, DAPOLI* 🌴
*OFFICIAL BOOKING CONFIRMATION / आरक्षित*

Namaskar *${booking.fullName || 'Valued Buyer'}*,
Congratulations! Your sea-shore plot booking in Dapoli is officially *CONFIRMED & BOOKED*.

📋 *OFFICIAL BOOKING DETAILS:*
• *Booking ID:* ${booking.reservationId || 'KN-RES-CONFIRMED'}
• *Allocated Plot:* ${booking.specificPlot || 'Ocean View Sector Plot'}
• *Project Title:* ${booking.projectTitle || 'Kokan Nirvana Sea Shore'}
• *Plot Area:* ${booking.plotSize || '3.5 to 11 Guntha'}
• *Location:* Murud Beach Road Junction, Dapoli, Ratnagiri
• *Scheduled Visit:* ${booking.preferredDate || 'Upcoming Weekend'} (${booking.timeSlot || 'Morning 10:00 AM'})
• *Station Pickup:* ${booking.pickupOption || 'Khed Station Escort'}
• *Booking Plan:* ${booking.reservationType === 'token' ? 'Priority Token Hold (₹21,000)' : 'VIP Site Inspection'}

🏛️ *LEGAL & TITLE GUARANTEES:*
• Sanctioned Collector NA Class-1
• Separate 7/12 Satbara Extract
• 100% 15-Day Money-Back Token Refund Guarantee

📞 *Dapoli Operations Concierge:* Sagar Kadam (+91 98200 12345)
📍 *Site Office:* Near Murud Beach Road Junction, Dapoli, Maharashtra

_Show this WhatsApp confirmation upon arriving at the site or at Khed station pickup._`;

  return `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp confirmation link for a VIP Site Visit
 * Targets the visitor's registered phone number.
 */
export function buildSiteVisitWhatsAppUrl(visit) {
  if (!visit) return '#';
  const targetPhone = cleanPhoneNumber(visit.phone);

  const message =
`🌊 *KOKAN NIRVANA VIP SITE VISIT PASS* 🌊
*OFFICIAL BOOKING CONFIRMATION / आरक्षित*

Dear *${visit.name || 'Valued Guest'}*,
Your complimentary VIP Dapoli Coastal Site Visit is officially *CONFIRMED*.

🎟️ *VIP PASS DETAILS:*
• *Pass Reference:* ${visit.refCode || visit.id || 'VIP-CONFIRMED'}
• *Property Interested:* ${visit.propertyName || 'Kokan Nirvana Coastal Estate'}
• *Preferred Date:* ${visit.preferredDate || 'This Weekend'}
• *Travel Logistics:* ${visit.pickupNeeded || 'Private Station Pickup'}
• *Guest Count:* ${visit.guestCount || 2} Persons
• *Complimentary:* Traditional Konkani Alphonso Fresh Lunch & Chilled Tender Coconut

🚗 *Local Site Coordinator:* Sagar Kadam (+91 98200 12345)
📍 *Pickup Meeting Point:* Khed Railway Station / Dapoli Site Office

_Save this message on your WhatsApp. Our concierge will contact you before departure._`;

  return `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp link to Office Concierge as backup/secondary
 */
export function buildConciergeWhatsAppUrl(bookingId, propertyTitle) {
  const officePhone = '919820012345';
  const message = `Hello Kokan Nirvana Dapoli team, I have confirmed my booking ${bookingId || ''} for ${propertyTitle || 'Dapoli sea plots'}. Please assign my site coordinator.`;
  return `https://api.whatsapp.com/send?phone=${officePhone}&text=${encodeURIComponent(message)}`;
}
