export interface Category {
  id: number;
  documentId?: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  imagen?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
