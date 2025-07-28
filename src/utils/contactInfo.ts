export const CONTACT_INFO = {
  phone: '(248) 555-0123', // Replace with your actual phone number
  phoneRaw: '2485550123', // For tel: links
  email: 'info@bhamhouses.com',
  address: 'Birmingham, MI 48009',
  businessHours: 'Monday - Sunday: 8:00 AM - 8:00 PM',
  companyName: 'BHAM Houses',
  tagline: 'Birmingham, MI Cash Home Buyers',
} as const;

export const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}; 