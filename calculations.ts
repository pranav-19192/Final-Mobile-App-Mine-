
export const calculateTotalPrice = (basePrice: number, seatCount: number): number => {
  if (seatCount < 0) return 0;
  return basePrice * seatCount;
};

export const formatCardNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ').substring(0, 19) : '';
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getDurationMinutes = (durationStr: string): number => {
  const hours = parseInt(durationStr.match(/(\d+)h/)?.[1] || '0');
  const minutes = parseInt(durationStr.match(/(\d+)m/)?.[1] || '0');
  return (hours * 60) + minutes;
};
