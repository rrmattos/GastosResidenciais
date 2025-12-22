import { useEffect, useState } from 'react';

import {
  getTotalsByPerson,
  getTotalsByCategory,
} from '../api/api';

import type {
  PersonTotals,
  CategoryTotals,
} from '../types/Reports';

//===========================================================
// Dashboard de relatórios financeiros
// - Totais por pessoa (obrigatório)
// - Totais por categoria (opcional, mas implementado)
//===========================================================
export default function Reports() {
  const [personTotals, setPersonTotals] = useState<PersonTotals | null>(null);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotals[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //==============================================
  // Carrega relatórios
  //==============================================
  const loadReports = async () => {
    try {
      setLoading(true);

      const [persons, categories] = await Promise.all([
        getTotalsByPerson(),
        getTotalsByCategory(),
      ]);

      setPersonTotals(persons);
      setCategoryTotals(categories);
    } catch {
      setError('Erro ao carregar relatórios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return <p>Carregando relatórios...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ===============================
           TOTAIS POR PESSOA
         =============================== */}
      <h2>Totais por Pessoa</h2>

      {personTotals && (
        <>
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Total Receitas</th>
                <th>Total Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {personTotals.persons.map(p => (
                <tr key={p.personId}>
                  <td>{p.personName}</td>
                  <td>{p.totalReceita.toFixed(2)}</td>
                  <td>{p.totalDespesa.toFixed(2)}</td>
                  <td>
                    {(p.totalReceita - p.totalDespesa).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total Geral</h3>
          <ul>
            <li>
              <strong>Total Receitas:</strong>{' '}
              {personTotals.totalReceita.toFixed(2)}
            </li>
            <li>
              <strong>Total Despesas:</strong>{' '}
              {personTotals.totalDespesa.toFixed(2)}
            </li>
            <li>
              <strong>Saldo Geral:</strong>{' '}
              {(personTotals.balance).toFixed(2)}
            </li>
          </ul>
        </>
      )}

      {/* ===============================
           TOTAIS POR CATEGORIA (OPCIONAL)
         =============================== */}
      <h2>Totais por Categoria</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {categoryTotals.map(c => (
            <tr key={c.categoryId}>
              <td>{c.description}</td>
              <td>{c.totalReceita.toFixed(2)}</td>
              <td>{c.totalDespesa.toFixed(2)}</td>
              <td>
                {(c.totalReceita - c.totalDespesa).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
