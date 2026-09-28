import { TRANSITIONS, STATUS_LABEL } from './config.js';
import { addApplication, updateApplication, addNotification } from './storage.js';
import { saveFiles } from './files.js';

export const actionsFor = (status, role) =>
  (TRANSITIONS[status] ?? []).filter((transition) => transition.role === role);

const notify = (roles, { id, data }, status) =>
  roles.forEach((role) => addNotification(role, `${id} - ${data.nama}: ${STATUS_LABEL[status]}`));

export async function createApplication({ data, files }) {
  const id = addApplication(data);
  await saveFiles(id, files);
  notify(['marketing'], { id, data }, 'SUBMITTED');
}

export async function perform(application, action, { data = {}, files = [] } = {}) {
  await saveFiles(application.id, files);
  updateApplication(application.id, { status: action.to, data });
  notify(action.notify, application, action.to);
}
