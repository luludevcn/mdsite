'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setEnabled(isDark);
  }, []);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-gray-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      >
        {enabled ? (
          <MoonIcon className="h-3 w-3 text-gray-600" />
        ) : (
          <SunIcon className="h-3 w-3 text-yellow-500" />
        )}
      </span>
    </Switch>
  );
}