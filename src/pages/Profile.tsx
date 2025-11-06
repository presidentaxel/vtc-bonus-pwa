// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { loadUser, saveUser, clearUser, User } from '../lib/storage';

export default function Profile() {
  const initial = loadUser();
  const [firstName, setFirstName] = useState<string>(initial.firstName || '');
  const [lastName, setLastName] = useState<string>(initial.lastName || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 1800);
      return () => clearTimeout(t);
    }
  }, [saved]);

  function onSave(e?: React.FormEvent) {
    e?.preventDefault();
    const u: User = { firstName: firstName.trim(), lastName: lastName.trim() };
    saveUser(u);
    setSaved(true);
  }

  function onClear() {
    if (!confirm('Supprimer le profil local ? Cela effacera uniquement les données stockées sur cet appareil.')) return;
    clearUser();
    setFirstName('');
    setLastName('');
    setSaved(true);
  }

  return (
    <div className="grid">
      <div className="card">
        <h2>Profil local (démo)</h2>
        <form onSubmit={onSave} className="grid" style={{ gap: 8 }}>
          <div>
            <div className="label">Prénom</div>
            <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ton prénom" />
          </div>
          <div>
            <div className="label">Nom</div>
            <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ton nom" />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn">Enregistrer</button>
            <button type="button" onClick={onClear} style={{ background: '#ef4444', color: '#fff', borderRadius: 10, padding: '12px 14px', border: 'none' }}>
              Supprimer
            </button>
          </div>

          {saved && <div className="sub">Profil enregistré ✔️</div>}
        </form>

        <div style={{ marginTop: 12 }} className="sub">
          Note : Le profil est stocké uniquement sur ton appareil (localStorage).
        </div>
      </div>
    </div>
  );
}