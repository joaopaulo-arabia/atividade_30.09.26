
import { useState } from 'react';

function DepartmentForm({ onCadastrar, departments = [] }) {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const nome = name.trim();
    const sigla = acronym.trim().toUpperCase();

    if (!nome) {
      setError('Informe o nome do departamento.');
      return;
    }

    if (!/^[A-ZÀ-ÖØ-Ý]{2,5}$/.test(sigla)) {
      setError('A sigla deve conter de 2 a 5 letras.');
      return;
    }

    const existe = departments.some(
      (department) =>
        department.acronym.toUpperCase() === sigla
    );

    if (existe) {
      setError('Esta sigla já está cadastrada.');
      return;
    }

    setSending(true);

    try {
      await onCadastrar({
        name: nome,
        acronym: sigla,
      });

      setName('');
      setAcronym('');
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar departamento.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="department-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome do Departamento</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Financeiro"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="acronym">Sigla</label>
        <input
          id="acronym"
          type="text"
          value={acronym}
          onChange={(event) => setAcronym(event.target.value)}
          placeholder="Ex.: FIN"
          maxLength={5}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={sending}>
        {sending ? 'Enviando...' : 'Cadastrar Departamento'}
      </button>
    </form>
  );
}

export default DepartmentForm;