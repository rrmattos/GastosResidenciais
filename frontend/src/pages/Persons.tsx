import { useEffect, useState } from 'react';

import { getPersons, createPerson, deletePerson } from '../api/api';
import type { Person } from '../types/Person';
import PersonForm from '../components/PersonForm';

//========================================================
// Página responsável por listar e gerenciar pessoas.
//========================================================
export default function Persons() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //===========================================
  // Busca todas as pessoas cadastradas na API.
  //===========================================
  const loadPersons = async () => {
    try {
      setLoading(true);
      const data = await getPersons();
      setPersons(data);
    } catch {
      setError('Erro ao carregar pessoas.');
    } finally {
      setLoading(false);
    }
  };

  //======================
  // Cria uma nova pessoa.
  //======================
  const handleCreatePerson = async (data: Omit<Person, 'id'>) => {
    try {
      setError(null);
      await createPerson(data);
      await loadPersons();
    } catch {
      setError('Erro ao criar pessoa.');
    }
  };

  //=============================================================================
  // Remove uma pessoa pelo id.
  // Ao remover, as transações associadas também são apagadas (regra do backend).
  //=============================================================================
  const handleDeletePerson = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta pessoa?')) return;

    try {
      await deletePerson(id);
      await loadPersons();
    } catch {
      setError('Erro ao remover pessoa.');
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  return (
    <div>
      <h1>Pessoas</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulário */}
      <PersonForm onSubmit={handleCreatePerson} loading={loading} />

      <hr />

      {/* Listagem */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(person => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>
                  <button onClick={() => handleDeletePerson(person.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
