export interface PersonTotalsById {
  personId: number;
  personName: string;
  totalReceita: number;
  totalDespesa: number;
  balance: number;
}

export interface PersonTotals {
  persons: PersonTotalsById[];
  totalReceita: number;
  totalDespesa: number;
  balance: number;
}

export interface CategoryTotals {
  categoryId: number;
  description: string;
  totalReceita: number;
  totalDespesa: number;
  balance: number;
}


// export interface CategoryTotalsById {
//   categoryId: number;
//   categoryDescription: string;
//   totalReceita: number;
//   totalDespesa: number;
//   balance: number;
// }

// export interface CategoryTotals {
//   categories: CategoryTotalsById[];
//   totalReceita: number;
//   totalDespesa: number;
//   balance: number;
// }