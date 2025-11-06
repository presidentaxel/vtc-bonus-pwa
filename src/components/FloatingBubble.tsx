import React from 'react';
import { FiSettings, FiX } from 'react-icons/fi';

export default function FloatingBubble({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);
  return (
    <>
      <button className="fab" aria-label="Paramètres"
        onClick={() => setOpen(true)} title="Paramètres">
        <FiSettings size={22} />
      </button>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
              <b>Paramètres de la démo</b>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <FiX size={20} />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}