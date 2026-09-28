const KEY = 'jkl.applications';

const read = () => JSON.parse(localStorage.getItem(KEY) ?? '[]');
const write = (items) => localStorage.setItem(KEY, JSON.stringify(items));

export const listApplications = read;

export function addApplication(data) {
  const items = read();
  const id = `APP-${String(items.length + 1).padStart(4, '0')}`;
  write([...items, { id, status: 'SUBMITTED', data }]);
}

export function updateStatus(id, status) {
  write(read().map((item) => (item.id === id ? { ...item, status } : item)));
}
