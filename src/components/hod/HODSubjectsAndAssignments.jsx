import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, User, CheckCircle2, Plus } from 'lucide-react';

export default function HODSubjectsAndAssignments() {
  const { showToast } = useAuth();

  const [allocations, setAllocations] = useState([
    { code: "CS701PC", name: "Cloud Computing & Distributed Architecture", faculty: "Prof. K. Vijaya Lakshmi", class: "IV B.Tech CSE-A", credits: 3, type: "Theory" },
    { code: "CS702PC", name: "Cryptography & Network Security", faculty: "Dr. K. Srinivasa Rao (HOD)", class: "IV B.Tech CSE-A", credits: 3, type: "Theory" },
    { code: "CS711PE", name: "Full Stack Web Development", faculty: "Sri Ch. Mahesh Babu", class: "IV B.Tech CSE-A", credits: 3, type: "Theory" },
    { code: "CS721PE", name: "Machine Learning Foundations", faculty: "Smt. T. Anupama", class: "IV B.Tech CSE-A", credits: 3, type: "Theory" },
    { code: "CS703PC", name: "Cloud & Security Laboratory", faculty: "Prof. K. Vijaya Lakshmi & Lab Asst.", class: "IV B.Tech CSE-A", credits: 1.5, type: "Lab" },
    { code: "CS501PC", name: "Operating Systems", faculty: "Sri N. Ravi Teja", class: "III B.Tech CSE-B", credits: 3, type: "Theory" },
    { code: "CS503PC", name: "Web Technologies Laboratory", faculty: "Sri Ch. Mahesh Babu", class: "III B.Tech CSE-B", credits: 1.5, type: "Lab" },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #10b981' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            Academic Curriculum Mapping
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            CSE Subjects & Faculty Allocation Matrix
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Authorizes which faculty members manage and submit attendance for specific classes.
          </p>
        </div>

        <button 
          onClick={() => showToast("Subject allocation saved to master database.", "success")}
          className="btn btn-primary"
        >
          <Plus size={15} /> Add Curriculum Course
        </button>
      </div>

      {/* Allocation Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Designated Faculty</th>
              <th>Class & Section</th>
              <th>JNTUK Credits</th>
              <th>Course Type</th>
              <th>Authorization Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((item, idx) => (
              <tr key={idx}>
                <td><strong style={{ color: '#1d4ed8' }}>{item.code}</strong></td>
                <td><strong>{item.name}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} style={{ color: '#64748b' }} />
                    <span>{item.faculty}</span>
                  </div>
                </td>
                <td><span className="badge badge-primary">{item.class}</span></td>
                <td>{item.credits}</td>
                <td>
                  <span className={`badge ${item.type === 'Lab' ? 'badge-accent' : 'badge-success'}`}>
                    {item.type}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success">
                    <CheckCircle2 size={12} /> Authorized to Upload
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
