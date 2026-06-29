export const BUSINESS = {
  name: 'SS Event Management',
  taglineEn: 'Where Every Event Becomes a Grand Experience',
  taglineTa: 'உங்கள் விழா... எங்கள் பொறுப்பு!',
  taglineTaSub: 'Your event... our responsibility!',
  philosophyTa: 'நாங்கள் நிகழ்ச்சிகளை மட்டும் நடத்துவதில்லை... உங்கள் கனவுகளை நிஜமாக மாற்றுகிறோம்',
  philosophyEn: "We don't just conduct events... we turn your dreams into reality.",
  phone: '+91 90802 04174',
  phoneLink: 'tel:+919080204174',
  instagram: '@SS_EVENT_MANAGEMENT_01',
  instagramLink: 'https://instagram.com/SS_EVENT_MANAGEMENT_01',
};

export const SERVICES = [
  {
    id: 'wedding',
    name: 'Wedding',
    nameTa: 'திருமணம்',
    description: 'Full Tamil-style wedding planning — from mandapam decoration to send-off arrangements.',
    icon: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
  },
  {
    id: 'reception',
    name: 'Reception',
    nameTa: 'வரவேற்பு',
    description: 'Stunning stage with LED lighting — modern elegance meets traditional warmth.',
    icon: 'reception',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    nameTa: 'பிறந்தநாள் விழா',
    description: 'Themed decor, custom cakes, party food, and delightful return gifts for all ages.',
    icon: 'birthday',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    nameTa: null,
    description: 'Conferences, product launches, team offsites — professional events done right.',
    icon: 'corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  },
  {
    id: 'temple',
    name: 'Temple Functions',
    nameTa: 'கோவில் விழா',
    description: 'Traditional temple-style decoration with authentic cultural elements.',
    icon: 'temple',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
  },
  {
    id: 'dj',
    name: 'DJ & Music',
    nameTa: null,
    description: 'Premium sound systems, vibing DJ sets, and traditional chenda melam.',
    icon: 'dj',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=400&fit=crop',
  },
  {
    id: 'makeup',
    name: 'Bridal Makeup',
    nameTa: null,
    description: 'Professional bridal makeup and styling for your special day.',
    icon: 'makeup',
    image: 'https://images.unsplash.com/photo-1487412946677-5d558763f5f0?w=600&h=400&fit=crop',
  },
  {
    id: 'photo',
    name: 'Photography & Videography',
    nameTa: null,
    description: 'Candid moments and traditional coverage to preserve every memory.',
    icon: 'photo',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  },
  {
    id: 'lighting',
    name: 'Lighting & LED Setup',
    nameTa: null,
    description: 'Stage lighting, LED dance floors, and ambient illumination.',
    icon: 'lighting',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  },
];

export const PACKAGES = [
  {
    id: 'wedding',
    name: 'Wedding Package',
    nameTa: 'திருமண பேக்கேஜ்',
    description: 'Complete Tamil-style wedding arrangements — everything you need for your grand day.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
    items: [
      'Decoration',
      'Photography',
      'Bridal Makeup',
      'Garland',
      'Veg Food',
      'Non-Veg Food',
      'Welcome Drinks',
      'Popcorn',
      'Vibing DJ',
      'Ice Creams',
      'Chenda Melam',
      'Panthal',
    ],
    highlight: true,
  },
  {
    id: 'birthday',
    name: 'Birthday Package',
    nameTa: 'பிறந்தநாள் பேக்கேஜ்',
    description: 'Everything for a memorable birthday celebration — stress-free and fun.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop',
    items: ['Decoration', 'Cakes', 'Party Food', 'Return Gifts'],
    highlight: false,
  },
];

export const EVENT_TYPES = SERVICES.map((s) => ({
  value: s.name,
  label: s.nameTa ? `${s.name} (${s.nameTa})` : s.name,
}));

export const BUDGET_RANGES = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000+',
];

export const GALLERY_ITEMS = [
  { type: 'Wedding', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop' },
  { type: 'Reception', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500&h=400&fit=crop' },
  { type: 'Birthday', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop' },
  { type: 'Corporate', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46666?w=500&h=400&fit=crop' },
  { type: 'Temple Function', image: 'https://images.unsplash.com/photo-1604608672516-f071affa589c?w=500&h=400&fit=crop' },
  { type: 'Concert', image: 'https://images.unsplash.com/photo-1459749411175-04bf929298e0?w=500&h=400&fit=crop' },
  { type: 'Wedding', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&h=400&fit=crop' },
  { type: 'Party', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=400&fit=crop' },
  { type: 'Reception', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&h=400&fit=crop' },
];

export const TESTIMONIALS = [
  {
    name: 'Priya & Karthik',
    event: 'Tamil Wedding',
    text: 'SS Event Management made our wedding absolutely magical. Every detail was perfect — from the mandapam to the chenda melam. Our families are still talking about it!',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    event: 'Corporate Launch',
    text: 'Professional, punctual, and creative. They handled our product launch flawlessly. Highly recommend for corporate events.',
    rating: 5,
  },
  {
    name: 'Lakshmi Devi',
    event: 'Temple Function',
    text: 'Traditional decoration was authentic and beautiful. They understood our cultural requirements perfectly.',
    rating: 5,
  },
];

export const STATS = [
  { value: '250+', label: 'Events Delivered' },
  { value: '24h', label: 'Callback Guarantee' },
  { value: '9', label: 'Service Categories' },
  { value: '100%', label: 'Client Satisfaction' },
];
