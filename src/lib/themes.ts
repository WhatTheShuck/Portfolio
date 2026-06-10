export type ThemeMode = 'dark' | 'light';

export interface Theme {
  slug: string;
  name: string;
  mode: ThemeMode;
}

export const DARK_THEMES: Theme[] = [
  { slug: 'catppuccin-mocha', name: 'Catppuccin Mocha', mode: 'dark' },
  { slug: 'nord-dark',        name: 'Nord Dark',        mode: 'dark' },
  { slug: 'dracula',          name: 'Dracula',          mode: 'dark' },
  { slug: 'gruvbox-dark',     name: 'Gruvbox Dark',     mode: 'dark' },
  { slug: 'solarized-dark',   name: 'Solarized Dark',   mode: 'dark' },
  { slug: 'tokyo-night',      name: 'Tokyo Night',      mode: 'dark' },
  { slug: 'one-dark',         name: 'One Dark',         mode: 'dark' },
  { slug: 'rose-pine',        name: 'Rosé Pine',        mode: 'dark' },
  { slug: 'ayu-mirage',       name: 'Ayu Mirage',       mode: 'dark' },
  { slug: 'monokai',          name: 'Monokai',          mode: 'dark' },
];

export const LIGHT_THEMES: Theme[] = [
  { slug: 'catppuccin-latte', name: 'Catppuccin Latte', mode: 'light' },
  { slug: 'nord-light',       name: 'Nord Light',       mode: 'light' },
  { slug: 'github-light',     name: 'GitHub Light',     mode: 'light' },
  { slug: 'gruvbox-light',    name: 'Gruvbox Light',    mode: 'light' },
  { slug: 'solarized-light',  name: 'Solarized Light',  mode: 'light' },
  { slug: 'ayu-light',        name: 'Ayu Light',        mode: 'light' },
  { slug: 'one-light',        name: 'One Light',        mode: 'light' },
  { slug: 'rose-pine-dawn',   name: 'Rosé Pine Dawn',   mode: 'light' },
  { slug: 'tomorrow',         name: 'Tomorrow',         mode: 'light' },
  { slug: 'everforest-light', name: 'Everforest Light', mode: 'light' },
];

export const THEMES: Theme[] = [...DARK_THEMES, ...LIGHT_THEMES];

export const THEME_SLUGS: string[] = THEMES.map(t => t.slug);
export const DARK_THEME_SLUGS: string[] = DARK_THEMES.map(t => t.slug);
export const LIGHT_THEME_SLUGS: string[] = LIGHT_THEMES.map(t => t.slug);
