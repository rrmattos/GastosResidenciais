import { useEffect, useState } from 'react';

import {
  getTransactions,
  createTransaction,
  getPersons,
  getCategories,
} from '../api/api';

import type { Transaction } from '../types/Transaction';
import type { Person } from '../types/Person';
import type { Category } from '../types/Category';

import TransactionForm from '../components/TransactionForm';

//===========================================================
// Página responsável pelo cadastro e listagem de transações.
//===========================================================
export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //==============================================
  // Carrega dados iniciais (transações, pessoas, categorias)
  //==============================================
  const loadData = async () => {
    try {
      setLoading(true);
      const [t, p, c] = await Promise.all([
        getTransactions(),
        getPersons(),
        getCategories(),
      ]);

      setTransactions(t);
      setPersons(p);
      setCategories(c);
    } catch {
      setError('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  //=========================
  // Cria nova transação
  //=========================
  const handleCreateTransaction = async (
    data: Omit<Transaction, 'id'>
  ) => {
    try {
      setError(null);
      await createTransaction(data);
      await loadData();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Erro ao criar transação.'
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Transações</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulário */}
      <TransactionForm
        persons={persons}
        categories={categories}
        onSubmit={handleCreateTransaction}
        loading={loading}
      />

      <hr />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Pessoa</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.description}</td>
                <td>{t.value.toFixed(2)}</td>
                <td>{t.type}</td>
                <td>
                  {persons.find(p => p.id === t.personId)?.name}
                </td>
                <td>
                  {
                    categories.find(c => c.id === t.categoryId)
                      ?.description
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
