export interface Product {
  id: number;
  documentId?: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  tags?: string[];
  slug: string;
  fotos?: {
    id: number;
    url: string;
    alternativeText?: string;
  }[];
  sizes?: {
    id: number;
    size: string;
  }[];
  category?: {
    id: number;
    nombre: string;
    slug: string;
    descripcion?: string;
  };
  drop?: {
    id: number;
    nombre: string;
    slug: string;
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
