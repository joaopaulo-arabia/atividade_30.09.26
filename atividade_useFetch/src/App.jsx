import { useEffect, useState } from "react";
import './App.css';

import DepartmentForm from './components/DepartmentForm';
import DepartmentList from './components/DepartmentList';

const API_URL = 'http://localhost:3000/departments';

function App() {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState('');

  useEffect(() => {

    async function carregarDepartamentos(params) {
      try {

        const response = await fetch(API_URL);

        if(!response.ok) {
          throw new Error('Erro ao buscar departamentos.');
        }

        const data = await response.json();
        setDepartments(data);

      }catch (error) {
        setError('Não foi possível carregar os departamentos.');

      }finally{
        setLoading(false);
      }
    }

    carregarDepartamentos();
  }, []);

  async function handleCadastrar(department) {
    const response = await fetch(API_URL, {
      method: 'Post',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(department),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar departamento.');
    }

    const novoDepartamento = await response.json();

    setDepartments((prev) => [...prev, novoDepartamento]);
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Gestão de Departamentos</h1>
        <p>Cadastro e consulta de departamentos da empresa</p>
      </header>

      <section className="department-section">
        <h2>Cadastrar Departamento</h2>

        <DepartmentForm
          onCadastrar={handleCadastrar}
          departments={departments}
        />
      </section>

      <section className="department-section">
        <h2>Departamentos cadastrados</h2>

        {loading ? (
          <p className="loading-message">
            Carregando departamentos...
          </p>

        ) : error ? (
          <p className="error-message">{error}</p>

        ) : (
          <DepartmentList departments={departments} />
        )}

      </section>

    </main>

  );

}

export default App;