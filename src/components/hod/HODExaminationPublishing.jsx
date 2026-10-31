import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Award, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Edit3, 
  Send,
  BookOpen,
  Building2,
  X
} from 'lucide-react';

export default function HODExaminationPublishing() {
  const { currentUser, publishedTimetables = [], publishTimetable, showToast } = useAuth();

  // Requirement 2: HOD Branch strictly based on login context
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const selectedBranch = assignedBranch;
  const [selectedYear, setSelectedYear] = useState('IV Year');
  const [selectedExamType, setSelectedExamType] = useState('Regular'); // 'Regular' | 'Supplementary'

  const getSemester = (year) => {
    switch (year) {
      case 'I Year': return 'I Semester';
      case 'II Year': return 'III Semester';
      case 'III Year': return 'V Semester';
      case 'IV Year': return 'VII Semester';
      default: return 'VII Semester';
    }
  };

  const currentSemester = getSemester(selectedYear);

  // Look for currently published timetable for this combination
  const activeTimetable = useMemo(() => {
    return publishedTimetables.find(t => 
      t.branch === selectedBranch && 
      t.year === selectedYear && 
      t.examType.toLowerCase() === selectedExamType.toLowerCase()
    );
  }, [publishedTimetables, selectedBranch, selectedYear, selectedExamType]);

  // Editor form state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [scheduleSlots, setScheduleSlots] = useState([]);

  // Initialize editor with active timetable or default template
  const handleOpenEditor = () => {
    if (activeTimetable) {
      setEditTitle(activeTimetable.title);
      setEditInstructions(activeTimetable.instructions);
      setScheduleSlots([...activeTimetable.schedule]);
    } else {
      setEditTitle(`B.Tech ${selectedYear} ${currentSemester} ${selectedExamType} Examination Schedule`);
      setEditInstructions(
        selectedExamType === 'Regular'
          ? "Students must carry official JNTUK Hall Tickets and College Identity Cards. Mobile phones and programmable devices are strictly prohibited."
          : "Supplementary candidates must report 30 minutes prior to exam commencement along with original fee paid challan."
      );

      setScheduleSlots([]);
    }
    setIsEditing(true);
  };

  const handleAddSlot = () => {
    setScheduleSlots(prev => [
      ...prev,
      { code: "", subject: "", date: "", time: "10:00 AM - 01:00 PM", hall: "" }
    ]);
  };

  const handleRemoveSlot = (index) => {
    setScheduleSlots(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSlotChange = (index, field, value) => {
    setScheduleSlots(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveAndPublish = (e) => {
    e.preventDefault();

    if (scheduleSlots.length === 0) {
      showToast("Please add at least one subject to the examination schedule.", "error");
      return;
    }

    const hasEmptyFields = scheduleSlots.some(s => !s.code.trim() || !s.subject.trim() || !s.date);
    if (hasEmptyFields) {
      showToast("Please fill in Subject Code, Subject Name, and Date for all rows.", "error");
      return;
    }

    publishTimetable({
      branch: selectedBranch,
      year: selectedYear,
      semester: currentSemester,
      examType: selectedExamType,
      title: editTitle,
      instructions: editInstructions,
      schedule: scheduleSlots
    });

    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Banner */}
      <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #f59e0b', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            HOD Examination Office
          </span>
          <h2 style={{ fontSize: '1.35rem', color: '#0e2154', margin: 0 }}>
            Examination Timetable Publishing & Control
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
            Publish official Regular and Supplementary examination timetables. Published timetables sync immediately with student dashboards.
          </p>
        </div>

        <button 
          onClick={handleOpenEditor}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem' }}
        >
          <Edit3 size={16} /> {activeTimetable ? 'Edit & Re-publish Timetable' : 'Create & Publish New Timetable'}
        </button>
      </div>

      {/* Cohort & Examination Type Selectors */}
      <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
            
            {/* Branch - Requirement 2: Strictly the HOD's assigned branch based on login */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Assigned Branch:</span>
              <span style={{ 
                background: '#0e2154', 
                color: '#ffffff', 
                padding: '0.35rem 0.85rem', 
                borderRadius: '6px', 
                fontSize: '0.82rem', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <Building2 size={14} style={{ color: '#f59e0b' }} />
                {assignedBranch}
              </span>
            </div>

            {/* Academic Year */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Year:</span>
              <div style={{ display: 'flex', background: '#f8fafc', padding: '0.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {['I Year', 'II Year', 'III Year', 'IV Year'].map(yr => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: selectedYear === yr ? '#0e2154' : 'transparent',
                      color: selectedYear === yr ? '#ffffff' : '#475569'
                    }}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Exam Type Tabs: Regular vs Supplementary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Category:</span>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <button
                onClick={() => setSelectedExamType('Regular')}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedExamType === 'Regular' ? '#1d4ed8' : 'transparent',
                  color: selectedExamType === 'Regular' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                Regular Exams
              </button>
              <button
                onClick={() => setSelectedExamType('Supplementary')}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedExamType === 'Supplementary' ? '#d97706' : 'transparent',
                  color: selectedExamType === 'Supplementary' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                Supplementary Exams
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Active Timetable Display */}
      {activeTimetable ? (
        <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 0, overflow: 'hidden' }}>
          
          <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className={`badge ${selectedExamType === 'Regular' ? 'badge-primary' : 'badge-warning'}`}>
                  {activeTimetable.examType} Examination
                </span>
                <span className="badge badge-success">
                  <CheckCircle2 size={12} /> {activeTimetable.status}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#0e2154', margin: 0 }}>
                {activeTimetable.title}
              </h3>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem' }}>
                Published on <strong>{activeTimetable.publishedDate}</strong> by <strong>{activeTimetable.publishedBy}</strong>
              </div>
            </div>

            <button 
              onClick={handleOpenEditor}
              className="btn btn-sm btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Edit3 size={14} /> Edit Timetable
            </button>
          </div>

          {/* Official Instructions Callout */}
          <div style={{ padding: '1rem 1.5rem', background: '#f0fdf4', borderBottom: '1px solid #dcfce7', fontSize: '0.82rem', color: '#166534', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <FileText size={18} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Official Instructions:</strong> {activeTimetable.instructions}
            </div>
          </div>

          {/* Schedule Table */}
          <div className="table-responsive">
            <table className="data-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Assigned Examination Hall</th>
                </tr>
              </thead>
              <tbody>
                {activeTimetable.schedule.map((slot, index) => (
                  <tr key={index}>
                    <td><strong>{slot.date}</strong></td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#475569', fontSize: '0.82rem' }}>
                        <Clock size={13} style={{ color: '#94a3b8' }} /> {slot.time}
                      </span>
                    </td>
                    <td><strong style={{ color: '#1d4ed8' }}>{slot.code}</strong></td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{slot.subject}</td>
                    <td><span className="badge badge-primary">{slot.hall}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <Calendar size={44} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.15rem', color: '#0e2154', marginBottom: '0.4rem' }}>
            No {selectedExamType} Timetable Published for {selectedBranch} {selectedYear}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Create and publish the examination schedule so students in {selectedBranch} {selectedYear} ({currentSemester}) can view their examination dates and hall tickets in the Student Portal.
          </p>
          <button 
            onClick={handleOpenEditor} 
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <Plus size={16} /> Create {selectedExamType} Timetable
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TIMETABLE EDITOR MODAL                                                    */}
      {/* ========================================================================= */}
      {isEditing && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large" style={{ maxWidth: '840px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Publish {selectedExamType} Timetable — {selectedBranch} {selectedYear} ({currentSemester})
                </h3>
              </div>
              <button 
                onClick={() => setIsEditing(false)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAndPublish}>
              <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Title */}
                <div className="form-group">
                  <label className="form-label">Examination Notification Title *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>

                {/* Instructions */}
                <div className="form-group">
                  <label className="form-label">General Examination Guidelines & Circular Instructions *</label>
                  <textarea 
                    className="form-input" 
                    rows={2}
                    required
                    value={editInstructions}
                    onChange={(e) => setEditInstructions(e.target.value)}
                  />
                </div>

                {/* Subjects & Slots */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Examination Schedule Slots ({scheduleSlots.length} subjects)</label>
                    <button 
                      type="button" 
                      onClick={handleAddSlot} 
                      className="btn btn-sm btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}
                    >
                      <Plus size={14} /> Add Subject Slot
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {scheduleSlots.map((slot, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1.5fr 2.5fr 1.5fr 1.8fr 1.5fr 40px', 
                          gap: '0.5rem', 
                          alignItems: 'center',
                          padding: '0.65rem 0.75rem',
                          background: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Code (e.g. CS701PC)"
                          value={slot.code}
                          onChange={(e) => handleSlotChange(idx, 'code', e.target.value.toUpperCase())}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
                          required
                        />
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Subject Name"
                          value={slot.subject}
                          onChange={(e) => handleSlotChange(idx, 'subject', e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
                          required
                        />
                        <input 
                          type="date" 
                          className="form-input" 
                          value={slot.date}
                          onChange={(e) => handleSlotChange(idx, 'date', e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
                          required
                        />
                        <select 
                          className="form-select"
                          value={slot.time}
                          onChange={(e) => handleSlotChange(idx, 'time', e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
                        >
                          <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Forenoon)</option>
                          <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                        </select>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Hall (e.g. Block-B 204)"
                          value={slot.hall}
                          onChange={(e) => handleSlotChange(idx, 'hall', e.target.value)}
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSlot(idx)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem', display: 'flex', justifyContent: 'center' }}
                          title="Remove subject"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <Send size={16} /> Publish Timetable to Student Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
