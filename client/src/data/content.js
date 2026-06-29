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
    image: 'https://images.pexels.com/photos/1103242/pexels-photo-1103242.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'reception',
    name: 'Reception',
    nameTa: 'வரவேற்பு',
    description: 'Stunning stage with LED lighting — modern elegance meets traditional warmth.',
    icon: 'reception',
    image: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    nameTa: 'பிறந்தநாள் விழா',
    description: 'Themed decor, custom cakes, party food, and delightful return gifts for all ages.',
    icon: 'birthday',
    image: 'https://images.pexels.com/photos/3484057/pexels-photo-3484057.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    nameTa: null,
    description: 'Conferences, product launches, team offsites — professional events done right.',
    icon: 'corporate',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'temple',
    name: 'Temple Functions',
    nameTa: 'கோவில் விழா',
    description: 'Traditional temple-style decoration with authentic cultural elements.',
    icon: 'temple',
    image: 'https://images.pexels.com/photos/3956682/pexels-photo-3956682.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dj',
    name: 'DJ & Music',
    nameTa: null,
    description: 'Premium sound systems, vibing DJ sets, and traditional chenda melam.',
    icon: 'dj',
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'makeup',
    name: 'Bridal Makeup',
    nameTa: null,
    description: 'Professional bridal makeup and styling for your special day.',
    icon: 'makeup',
    image: 'https://images.pexels.com/photos/3807523/pexels-photo-3807523.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'photo',
    name: 'Photography & Videography',
    nameTa: null,
    description: 'Candid moments and traditional coverage to preserve every memory.',
    icon: 'photo',
    image: 'https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'lighting',
    name: 'Lighting & LED Setup',
    nameTa: null,
    description: 'Stage lighting, LED dance floors, and ambient illumination.',
    icon: 'lighting',
    image: 'https://images.pexels.com/photos/2100168/pexels-photo-2100168.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const PACKAGES = [
  {
    id: 'wedding',
    name: 'Wedding Package',
    nameTa: 'திருமண பேக்கேஜ்',
    description: 'Complete Tamil-style wedding arrangements — everything you need for your grand day.',
    image: 'https://images.pexels.com/photos/1103242/pexels-photo-1103242.jpeg?auto=compress&cs=tinysrgb&w=500',
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
    image: 'https://images.pexels.com/photos/3484057/pexels-photo-3484057.jpeg?auto=compress&cs=tinysrgb&w=500',
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
  { type: 'Wedding', image: 'https://images.pexels.com/photos/1103242/pexels-photo-1103242.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Reception', image: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Birthday', image: 'https://images.pexels.com/photos/3484057/pexels-photo-3484057.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Corporate', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Temple Function', image: 'https://images.pexels.com/photos/3956682/pexels-photo-3956682.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Concert', image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Wedding', image: 'https://images.pexels.com/photos/3807523/pexels-photo-3807523.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Party', image: 'https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { type: 'Reception', image: 'https://images.pexels.com/photos/2100168/pexels-photo-2100168.jpeg?auto=compress&cs=tinysrgb&w=500' },
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
