import axios from 'axios';

import type { Person } from '../types/Person';
import type { Category } from '../types/Category';
import type { Transaction } from '../types/Transaction';
import type {
  PersonTotals,
  CategoryTotals,
} from '../types/Reports';

const api = axios.create({
  baseURL: 'https://localhost:7050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// =======================================================
// PERSONS
// =======================================================

/** Lista todas as pessoas */
export const getPersons = async (): Promise<Person[]> => {
  const response = await api.get<Person[]>('/person');
  return response.data;
};

/** Busca pessoa por ID */
export const getPersonById = async (id: number): Promise<Person> => {
  const response = await api.get<Person>(`/person/${id}`);
  return response.data;
};

/** Cria nova pessoa */
export const createPerson = async (
  data: Omit<Person, 'id'>
): Promise<Person> => {
  const response = await api.post<Person>('/person', data);
  return response.data;
};

/** Remove pessoa (e transações associadas) */
export const deletePerson = async (id: number): Promise<void> => {
  await api.delete(`/person/${id}`);
};

// =======================================================
// CATEGORIES
// =======================================================

/** Lista todas as categorias */
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/category');
  return response.data;
};

/** Busca categoria por ID */
export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await api.get<Category>(`/category/${id}`);
  return response.data;
};

/** Cria nova categoria */
export const createCategory = async (
  data: Omit<Category, 'id'>
): Promise<Category> => {
  const response = await api.post<Category>('/category', data);
  return response.data;
};

// =======================================================
// TRANSACTIONS
// =======================================================

/** Lista todas as transações */
export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/transaction');
  return response.data;
};

/** Busca transação por ID */
export const getTransactionById = async (
  id: number
): Promise<Transaction> => {
  const response = await api.get<Transaction>(`/transaction/${id}`);
  return response.data;
};

/** Cria nova transação */
export const createTransaction = async (
  data: Omit<Transaction, 'id'>
): Promise<Transaction> => {
  const response = await api.post<Transaction>('/transaction', data);
  return response.data;
};

// =======================================================
// REPORTS
// =======================================================

/**
 * Totais financeiros agrupados por pessoa
 * GET /api/reports/totals-by-person
 */
export const getTotalsByPerson = async (): Promise<PersonTotals> => {
  const response = await api.get<PersonTotals>(
    '/report/totals-by-person'
  );
  return response.data;
};

/**
 * Totais financeiros agrupados por categoria
 * GET /api/reports/totals-by-category
 */
export const getTotalsByCategory = async (): Promise<CategoryTotals[]> => {
  const response = await api.get<CategoryTotals[]>(
    '/report/totals-by-category'
  );
  return response.data;
};

export default api;
