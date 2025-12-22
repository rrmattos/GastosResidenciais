import { useEffect, useState } from 'react';

import type { Transaction, TransactionType } from '../types/Transaction';
import type { Person } from '../types/Person';
import type { Category } from '../types/Category';

//========================================================
// Formulário responsável apenas pela captura dos dados
// de uma transação. NÃO acessa API.
//========================================================
interface TransactionFormProps {
  persons: Person[];
  categories: Category[];
  onSubmit: (data: Omit<Transaction, 'id'>) => void;
  loading?: boolean;
}

export default function TransactionForm({
  persons,
  categories,
  onSubmit,
  loading = false,
}: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<TransactionType>('Despesa');
  const [personId, setPersonId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  //==============================================
  // Filtra categorias conforme tipo da transação
  //==============================================
  const filteredCategories = categories.filter(c =>
    c.purpose === 'Ambas' || c.purpose === type
  );

  //==============================================
  // Reseta categoria se ficar inválida
  //==============================================
  useEffect(() => {
    if (
      categoryId &&
      !filteredCategories.find(c => c.id === categoryId)
    ) {
      setCategoryId(null);
    }
  }, [type, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description || value <= 0 || !personId || !categoryId) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const person = persons.find(p => p.id === personId);
    if (!person) {
      setError('Pessoa inválida.');
      return;
    }

    // Regra de negócio: menor de idade não pode ter receita
    if (person.age < 18 && type === 'Receita') {
      setError('Menores de idade só podem ter despesas.');
      return;
    }

    onSubmit({
      description,
      value,
      type,
      personId,
      categoryId,
    });

    setDescription('');
    setValue(0);
    setType('Despesa');
    setPersonId(null);
    setCategoryId(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Transação</h3>

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
        <label>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Tipo:</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as TransactionType)}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>
      </div>

      <div>
        <label>Pessoa:</label>
        <select
          value={personId ?? ''}
          onChange={e => setPersonId(Number(e.target.value))}
        >
          <option value="">Selecione</option>
          {persons.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.age})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Categoria:</label>
        <select
          value={categoryId ?? ''}
          onChange={e => setCategoryId(Number(e.target.value))}
        >
          <option value="">Selecione</option>
          {filteredCategories.map(c => (
            <option key={c.id} value={c.id}>
              {c.description}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  );
}
