import { h } from '../dom.js';

const control = ({ name, type = 'text', options, required = true, pattern, title, accept }, values) =>
  options
    ? h(
        'select',
        { name, required },
        ...options.map((option) => h('option', { value: option, selected: values?.[name] === option }, option)),
      )
    : h('input', {
        name,
        type,
        required: required && !(type === 'file' && values),
        pattern,
        title,
        accept,
        min: type === 'number' ? 0 : null,
        value: type === 'file' ? null : values?.[name],
      });

const field = (definition, values) => {
  const current = definition.type === 'file' ? values?.[definition.name] : null;
  const label = current ? `${definition.label} (saat ini: ${current})` : definition.label;
  return h('label', { class: 'field' }, h('span', {}, label), control(definition, values));
};

const section = ({ title, fields }, values) =>
  h('fieldset', {}, h('legend', {}, title), h('div', { class: 'grid' }, ...fields.map((item) => field(item, values))));

export function splitValues(values) {
  const data = {};
  const files = [];

  for (const [name, value] of Object.entries(values)) {
    if (!(value instanceof File)) data[name] = value;
    else if (value.size) {
      data[name] = value.name;
      files.push([name, value]);
    }
  }

  return { data, files };
}

export function createForm(sections, { values, onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(splitValues(Object.fromEntries(new FormData(event.target))));
  };

  return h(
    'form',
    { onsubmit: handleSubmit },
    ...sections.map((item) => section(item, values)),
    h(
      'div',
      { class: 'actions' },
      h('button', { type: 'button', class: 'secondary', onclick: onCancel }, 'Batal'),
      h('button', { type: 'submit' }, 'Simpan'),
    ),
  );
}
