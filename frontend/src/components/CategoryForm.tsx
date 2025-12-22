import { useState } from 'react';
import type { Category, CategoryPurpose } from '../types/Category';

//========================================================
// Formulário responsável apenas pela captura dos dados
// de uma categoria. NÃO acessa API.
//========================================================
interface CategoryFormProps {
  onSubmit: (data: Omit<Category, 'id'>) => void;
  loading?: boolean;
}

export default function CategoryForm({
  onSubmit,
  loading = false,
}: CategoryFormProps) {
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState<CategoryPurpose>('Despesa');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description) {
      setError('Descrição é obrigatória.');
      return;
    }

    onSubmit({ description, purpose });

    setDescription('');
    setPurpose('Despesa');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Categoria</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Finalidade:</label>
        <select
          value={purpose}
          onChange={e => setPurpose(e.target.value as CategoryPurpose)}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
          <option value="Ambas">Ambas</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  );
}
