import { useState } from 'react';
import type { Person } from '../types/Person';

//========================================================
// Formulário responsável apenas pela captura dos dados
// de uma pessoa. NÃO acessa API.
//========================================================
interface PersonFormProps {
  onSubmit: (data: Omit<Person, 'id'>) => void;
  loading?: boolean;
}

export default function PersonForm({
  onSubmit,
  loading = false,
}: PersonFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || age <= 0) {
      setError('Nome e idade válida são obrigatórios.');
      return;
    }

    onSubmit({ name, age });

    setName('');
    setAge(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Pessoa</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Idade:</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  );
}
