'use client';

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 gradient-text">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-body)' }}>Welcome back!</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Ready to crush your study goals today?
          </p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Tasks Due Today</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>4</p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Focus Time</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>2h 15m</p>
        </div>
      </div>
    </div>
  );
}
