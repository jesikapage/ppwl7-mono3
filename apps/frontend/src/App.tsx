import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const [users, setUsers] = useState<any[]>([]);

  // Fungsi buat ngetes apakah Frontend bisa narik data dari Backend
  const loadUsers = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const res = await fetch(`${baseUrl}/users?key=${apiKey}`);
      const result = await res.json();
      setUsers(result.data || []);
    } catch (err) {
      console.error("Gagal load:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen p-10">
      <h1 className="text-xl font-bold mb-4">Deployment Test - App2</h1>

      {/* --- BAGIAN TOMBOL BAWAAN BANG LEO --- */}
      <div className="flex flex-wrap gap-2 justify-center border-b pb-6 mb-6">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* --- BAGIAN WAJIB BUAT TES PHASE 4 --- */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {/* Tombol buat ngetes Login Google */}
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/login`}
        >
          Login with Google (Classroom)
        </Button>

        {/* Tabel User List buat ngetes koneksi Backend & Turso */}
        <div className="w-full border rounded-lg p-4 bg-white shadow-sm">
          <p className="font-semibold mb-2 text-center">Backend Connection Test:</p>
          <ul className="text-sm">
            {users.length > 0 ? (
              users.map((u) => (
                <li key={u.id} className="border-b last:border-0 py-1">
                  {u.name} - <span className="text-gray-500">{u.email}</span>
                </li>
              ))
            ) : (
              <p className="text-center text-red-500">No Data / Check API Key</p>
            )}
          </ul>
          <Button variant="outline" className="w-full mt-2 text-xs" onClick={loadUsers}>
            Refresh User List
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;