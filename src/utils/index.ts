export * from './crypto';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateId = () => crypto.randomUUID();

export const withProvenance = <T>(data: T, provenance: string) => {
  return { ...data, _provenance: provenance };
};
