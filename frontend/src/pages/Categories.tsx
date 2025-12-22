import { useEffect, useState } from 'react';

import { getCategories, createCategory } from '../api/api';
import type { Category } from '../types/Category';
import CategoryForm from '../components/CategoryForm';

//===========================================================
// Página responsável pelo cadastro e listagem de categorias.
//===========================================================
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //==============================================
  // Busca todas as categorias cadastradas na API.
  //==============================================
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch {
      setError('Erro ao carregar categorias.');
    } finally {
      setLoading(false);
    }
  };

  //=========================
  // Cria uma nova categoria.
  //=========================
  const handleCreateCategory = async (data: Omit<Category, 'id'>) => {
    try {
      setError(null);
      await createCategory(data);
      await loadCategories();
    } catch {
      setError('Erro ao criar categoria.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  

  return (
    <div>
      <h1>Categorias</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Formulário */}
      <CategoryForm onSubmit={handleCreateCategory} loading={loading} />

      <hr />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Finalidade</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.description}</td>
                <td>{category.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
