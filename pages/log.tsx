import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function LogPage() {
  const [logs, setLogs] = useState([]);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase.from('voice_logs').select('*').order('created_at', { ascending: false });
      setLogs(data || []);
    };
    fetchLogs();
  }, []);

  const exportCSV = () => {
    const rows = [['ID', 'Transcript', 'Data']];
    logs.forEach(log => {
      rows.push([log.id, log.transcript, log.created_at]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcripts.csv';
    a.click();
  };

  return (
    <div>
      <h1>📄 Transcript vocali</h1>
      <button onClick={exportCSV}>📤 Esporta CSV</button>
      <ul>
        {logs.map((log: any) => (
          <li key={log.id}>{log.transcript} ({log.created_at})</li>
        ))}
      </ul>
    </div>
  );
}