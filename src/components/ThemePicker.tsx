import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Dices, Lock, LockOpen, Palette } from 'lucide-react';
import { DARK_THEMES, LIGHT_THEMES, DARK_THEME_SLUGS, LIGHT_THEME_SLUGS, THEME_SLUGS } from '../lib/themes';

function randomFrom(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ThemePicker() {
  const [current, setCurrent] = useState('catppuccin-mocha');
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const [locked, setLocked] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') ?? 'catppuccin-mocha';
    setCurrent(t);

    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    } else {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    setLocked(!!localStorage.getItem('theme-locked'));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyTheme = (slug: string) => {
    document.documentElement.setAttribute('data-theme', slug);
    setCurrent(slug);
  };

  const switchMode = (newMode: 'dark' | 'light') => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
    if (!locked) {
      applyTheme(randomFrom(newMode === 'dark' ? DARK_THEME_SLUGS : LIGHT_THEME_SLUGS));
    }
  };

  const rollRandom = () => {
    const pool = mode === 'dark' ? DARK_THEME_SLUGS : LIGHT_THEME_SLUGS;
    applyTheme(randomFrom(pool));
    localStorage.removeItem('theme-locked');
    setLocked(false);
  };

  const lockTheme = () => {
    localStorage.setItem('theme-locked', current);
    setLocked(true);
  };

  const unlockTheme = () => {
    localStorage.removeItem('theme-locked');
    setLocked(false);
    applyTheme(randomFrom(mode === 'dark' ? DARK_THEME_SLUGS : LIGHT_THEME_SLUGS));
  };

  const themes = mode === 'dark' ? DARK_THEMES : LIGHT_THEMES;

  return (
    <div ref={ref} className="relative flex items-center gap-1">

      {/* Sun / Moon mode toggle */}
      <button
        onClick={() => switchMode(mode === 'dark' ? 'light' : 'dark')}
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="p-1 rounded hover:bg-surface transition-colors text-fg-muted hover:text-fg"
      >
        {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Dice — random theme */}
      <button
        onClick={rollRandom}
        aria-label="Random theme"
        className="p-1 rounded hover:bg-surface transition-colors text-fg-muted hover:text-fg"
      >
        <Dices size={20} />
      </button>

      {/* Palette — open dropdown */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Choose theme"
        className="p-1 rounded hover:bg-surface transition-colors text-fg-muted hover:text-fg"
      >
        <Palette size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-9 w-56 bg-bg-subtle border border-border rounded-lg shadow-lg z-50 p-3">

          {/* Theme list */}
          <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-2">
            {mode === 'dark' ? 'Dark themes' : 'Light themes'}
          </p>
          <div className="max-h-52 overflow-y-auto space-y-0.5 mb-3">
            {themes.map(t => (
              <button
                key={t.slug}
                onClick={() => applyTheme(t.slug)}
                className={`w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                  current === t.slug
                    ? 'text-accent font-medium bg-surface'
                    : 'text-fg hover:bg-surface'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Lock / unlock */}
          <div className="border-t border-border pt-2">
            {locked ? (
              <button
                onClick={unlockTheme}
                className="w-full flex items-center justify-center gap-2 text-xs py-1.5 px-2 rounded bg-accent text-accent-fg hover:opacity-90 transition-opacity"
              >
                <Lock size={12} />
                Locked — click to unlock
              </button>
            ) : (
              <button
                onClick={lockTheme}
                className="w-full flex items-center justify-center gap-2 text-xs py-1.5 px-2 rounded border border-border text-fg-muted hover:text-fg hover:bg-surface transition-colors"
              >
                <LockOpen size={12} />
                Keep this theme
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
