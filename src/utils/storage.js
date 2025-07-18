const STORAGE_KEY = 'clippy_data';

export function getEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addEntry(entry) {
  const entries = getEntries();
  const newEntry = {
    id: crypto.randomUUID(),
    content: entry.content,
    type: entry.type, // "url" or "text"
    shortened: entry.shortened || null,
    createdAt: new Date().toISOString()
  };
  const updated = [newEntry, ...entries];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteEntry(id) {
  const entries = getEntries().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
