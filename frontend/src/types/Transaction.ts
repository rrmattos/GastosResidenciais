export type TransactionType = 'Despesa' | 'Receita';

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  categoryId: number;
  personId: number;
}
