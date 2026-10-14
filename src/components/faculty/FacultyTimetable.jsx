import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FACULTY_TIMETABLE } from '../../data/mockData';
import { Calendar, Clock, MapPin, BookOpen, Printer, Download, Filter } from 'lucide-react';

export default function FacultyTimetable() {
  const { currentUser } = useAuth();
  const [selectedDay, setSelectedDay] = useState('All');

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredSlots = selectedDay === 'All' 
    ? FACULTY_TIMETABLE 
    : FACULTY_TIMETABLE.filter(s => s.day === selectedDay);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            ODD Semester 2026-2027 Academic Schedule
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Faculty Master Teaching Timetable
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Faculty: <strong>{currentUser.profile?.name}</strong> • Department of Computer Science & Engineering
          </p>
        </div>

        <button onClick={() => window.print()} className="btn btn-outline">
          <Printer size={15} /> Print Timetable
        </button>
      </div>

      {/* Day Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`btn btn-sm ${selectedDay === d ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '9999px', padding: '0.4rem 1rem' }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Timetable Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Day of Week</th>
              <th>Time Slot</th>
              <th>Subject / Course Title</th>
              <th>Target Class & Section</th>
              <th>Room / Laboratory</th>
              <th>Session Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredSlots.map((slot, idx) => (
              <tr key={idx}>
                <td><strong>{slot.day}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1d4ed8', fontWeight: 600 }}>
                    <Clock size={14} />
                    <span>{slot.time}</span>
                  </div>
                </td>
                <td><strong>{slot.subject}</strong></td>
                <td><span className="badge badge-primary">{slot.class}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} style={{ color: '#d97706' }} />
                    <span>{slot.room}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${slot.subject.includes('Lab') ? 'badge-accent' : 'badge-success'}`}>
                    {slot.subject.includes('Lab') ? 'Practical Lab' : 'Theory Lecture'}
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
