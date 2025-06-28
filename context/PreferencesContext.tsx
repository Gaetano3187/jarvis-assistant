import { createContext, useContext, useEffect, useState } from 'react';

type Preferenze = {
  lingua: 'it' | 'en';
  voce: boolean;
};

const defaultVal: Preferenze = { lingua: 'it', voce: true };

const PreferencesContext = createContext<{
  preferenze: Preferenze;
  setPreferenze: (p: Preferenze) => void;
}>({
  preferenze: defaultVal,
  setPreferenze: () => {},
});

export const usePreferences = () => useContext(PreferencesContext);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferenze, setPreferenze] = useState<Preferenze>(defaultVal);

  useEffect(() => {
    const saved = localStorage.getItem('jarvis_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferenze(parsed.preferenze || defaultVal);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('jarvis_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.preferenze = preferenze;
        localStorage.setItem('jarvis_user', JSON.stringify(parsed));
      } catch {}
    }
  }, [preferenze]);

  return (
    <PreferencesContext.Provider value={{ preferenze, setPreferenze }}>
      {children}
    </PreferencesContext.Provider>
  );
}
