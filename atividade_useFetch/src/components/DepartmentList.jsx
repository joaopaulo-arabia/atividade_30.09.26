
function DepartmentList({ departments = [] }) {
  if (departments.length === 0) {
    return <p>Nenhum departamento cadastrado.</p>;
  }

  return (
    <ul className="department-list">
      {departments.map((department) => (
        <li key={department.id} className="department-item">
          <span className="department-name">
            {department.name}
          </span>

          <span className="department-acronym">
            {department.acronym}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default DepartmentList;