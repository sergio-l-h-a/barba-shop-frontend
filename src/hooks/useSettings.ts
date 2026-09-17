import { useEffect, useState } from "react";

export interface SettingsData {
  whatsappReminder: boolean;
  autoReceipt: boolean;
  darkThemeGlow: boolean;
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/settings");
      const json = await res.json();
      setSettings(json);
      setLoading(false);
    }
    load();
  }, []);

  async function update(partial: Partial<SettingsData>) {
    if (!settings) return;

    const newSettings = { ...settings, ...partial };
    setSettings(newSettings);

    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    });
  }

  return { settings, loading, update };
}
