import { h } from '../dom.js';

export const createTable = (columns, rows) =>
  h(
    'table',
    {},
    h('thead', {}, h('tr', {}, ...columns.map((column) => h('th', {}, column.header)))),
    h('tbody', {}, ...rows.map((row) => h('tr', {}, ...columns.map((column) => h('td', {}, column.render(row)))))),
  );
