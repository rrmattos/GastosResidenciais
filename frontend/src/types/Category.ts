export type CategoryPurpose = 'Despesa' | 'Receita' | 'Ambas';

export interface Category {
  id: number;
  description: string;
  purpose: CategoryPurpose;
}
