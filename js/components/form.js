import { h } from '../dom.js';

const control = ({ name, type = 'text', options, required = true, pattern, title }) =>
  options
    ? h('select', { name, required }, ...options.map((option) => h('option', { value: option }, option)))
    : h('input', { name, type, required, pattern, title, min: type === 'number' ? 0 : null });

const field = (definition) =>
  h('label', { class: 'field' }, h('span', {}, definition.label), control(definition));

const section = ({ title, fields }) =>
  h('fieldset', {}, h('legend', {}, title), h('div', { class: 'grid' }, ...fields.map(field)));

export function createForm(sections, { onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.target)));
  };

  return h(
    'form',
    { onsubmit: handleSubmit },
    ...sections.map(section),
    h(
      'div',
      { class: 'actions' },
      h('button', { type: 'button', class: 'secondary', onclick: onCancel }, 'Batal'),
      h('button', { type: 'submit' }, 'Simpan'),
    ),
  );
}
