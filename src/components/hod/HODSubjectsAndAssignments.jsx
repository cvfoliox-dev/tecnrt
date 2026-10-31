import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, User, CheckCircle2, Plus, X } from 'lucide-react';

export default function HODSubjectsAndAssignments() {
  const { currentUser, showToast } = useAuth();
  const assignedBranch = currentUser?.profile?.department || 'CSE';

  const [allocations, setAllocations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    faculty: '',
    year: 'III B.Tech',
    section: 'A',
    credits: 3,
    type: 'Theory'
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.faculty) {
      showToast('Please fill in Course Code, Course Name, and Faculty Name', 'error');
      return;
    }
    const newEntry = {
      code: formData.code.toUpperCase(),
      name: formData.name,
      faculty: formData.faculty,
      class: `${formData.year} ${assignedBranch}-${formData.section}`,
      credits: Number(formData.credits) || 3,
      type: formData.type
    };
    setAllocations(prev => [newEntry, ...prev]);
    setShowAddModal(false);
    setFormData({ code: '', name: '', faculty: '', year: 'III B.Tech', section: 'A', credits: 3, type: 'Theory' });
    showToast(`Course ${newEntry.code} added to ${assignedBranch} curriculum matrix.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #10b981' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            Academic Curriculum Mapping
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            {assignedBranch} Subjects & Faculty Allocation Matrix
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Authorizes which faculty members manage and submit attendance for specific classes in {assignedBranch}.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
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
              <th>Credits</th>
              <th>Course Type</th>
              <th>Authorization Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#64748b' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: '#f1f5f9', color: '#64748b', marginBottom: '0.75rem' }}>
                    <BookOpen size={20} />
                  </div>
                  <p style={{ fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                    No curriculum courses configured yet
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '440px', margin: '0 auto 1rem auto' }}>
                    There are no faculty subject allocations for {assignedBranch}. Click &quot;Add Curriculum Course&quot; to configure your department matrix.
                  </p>
                  <button onClick={() => setShowAddModal(true)} className="btn btn-outline-primary btn-sm">
                    <Plus size={13} /> Add First Course
                  </button>
                </td>
              </tr>
            ) : (
              allocations.map((item, idx) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '1.75rem', background: '#fff', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} style={{ color: '#10b981' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#0e2154', margin: 0 }}>Add Curriculum Course</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Course Code *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. CS701PC" 
                  value={formData.code} 
                  onChange={e => setFormData({ ...formData, code: e.target.value })} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Course Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Cloud Computing & Distributed Systems" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Designated Faculty *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Dr. K. Srinivasa Rao" 
                  value={formData.faculty} 
                  onChange={e => setFormData({ ...formData, faculty: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Academic Year</label>
                  <select 
                    className="form-control"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option value="I B.Tech">I B.Tech</option>
                    <option value="II B.Tech">II B.Tech</option>
                    <option value="III B.Tech">III B.Tech</option>
                    <option value="IV B.Tech">IV B.Tech</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Section</label>
                  <select 
                    className="form-control"
                    value={formData.section}
                    onChange={e => setFormData({ ...formData, section: e.target.value })}
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Credits</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    className="form-control" 
                    value={formData.credits} 
                    onChange={e => setFormData({ ...formData, credits: e.target.value })} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Course Type</label>
                  <select 
                    className="form-control"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Laboratory</option>
                    <option value="Project">Project / Seminar</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Course Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
