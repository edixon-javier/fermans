export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // Corresponds to Category id
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  featured?: boolean;
  technicalSheetUrl?: string;
  specs?: { [key: string]: string };
}

export interface Category {
  id: string;
  label: string;
}

export interface Brand {
  name: string;
  logo: string;
}