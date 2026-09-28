import { TRANSITIONS } from './config.js';

export const actionsFor = (status, role) =>
  (TRANSITIONS[status] ?? []).filter((transition) => transition.role === role);
