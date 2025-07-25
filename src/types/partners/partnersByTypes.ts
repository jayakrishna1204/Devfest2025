import Partners from '../../../data/partners.json'

export type Partner = {
  id: string;
  title: string;
  image: string;// typeof import('*.jpg') | typeof import('*.png') | typeof import('*.webp');
  website: string;
  hidden?: boolean;
}

export type PartnerType =  'PXL' | 'Platinium' | 'Gold' | 'Virtual' | 'Velotypie';

export const partnersByTypes: Record<PartnerType, Partner[]> = Partners

