const collection = (key) => ({
  read: () => JSON.parse(localStorage.getItem(key) ?? '[]'),
  write: (items) => localStorage.setItem(key, JSON.stringify(items)),
});

const applications = collection('jkl.applications');
const notifications = collection('jkl.notifications');

export const listApplications = applications.read;

export function addApplication(data) {
  const items = applications.read();
  const id = `APP-${String(items.length + 1).padStart(4, '0')}`;
  applications.write([...items, { id, status: 'SUBMITTED', data }]);
  return id;
}

export function updateApplication(id, { status, data }) {
  applications.write(
    applications.read().map((item) => (item.id === id ? { ...item, status, data: { ...item.data, ...data } } : item)),
  );
}

export const addNotification = (role, message) => notifications.write([...notifications.read(), { role, message }]);

export const listNotifications = (role) =>
  notifications.read().filter((item) => item.role === role).reverse().slice(0, 5);
