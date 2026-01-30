export interface WebPage {
  id: number;
  category: string;
  categoryIcon: string;
  description: string;
  date: string;
  status: 'Imágenes' | 'Documento' | 'Videos';
}
