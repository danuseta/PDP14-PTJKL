import { h } from './dom.js';
import { ROLES, CREATOR_ROLES, STATUS_LABEL, FORM_SECTIONS } from './config.js';
import { listApplications, addApplication, updateStatus } from './storage.js';
import { actionsFor } from './workflow.js';
import { createForm } from './components/form.js';
import { createTable } from './components/table.js';

const roleSelect = document.querySelector('#role');
const newButton = document.querySelector('#new');
const list = document.querySelector('#list');
const dialog = document.querySelector('#dialog');

const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

let role = Object.keys(ROLES)[0];

const actionButton = (application, action) =>
  h(
    'button',
    {
      type: 'button',
      class: 'small',
      onclick: () => {
        updateStatus(application.id, action.to);
        render();
      },
    },
    action.label,
  );

const columns = [
  { header: 'No. Pengajuan', render: (item) => item.id },
  { header: 'Konsumen', render: (item) => item.data.nama },
  { header: 'Kendaraan', render: (item) => `${item.data.merk} ${item.data.model}` },
  { header: 'Angsuran/Bulan', render: (item) => rupiah.format(item.data.angsuran) },
  {
    header: 'Status',
    render: (item) => h('span', { class: `status-${item.status.toLowerCase()}` }, STATUS_LABEL[item.status]),
  },
  {
    header: 'Aksi',
    render: (item) =>
      h('div', { class: 'row-actions' }, ...actionsFor(item.status, role).map((action) => actionButton(item, action))),
  },
];

function render() {
  const applications = listApplications();
  newButton.hidden = !CREATOR_ROLES.includes(role);
  list.replaceChildren(
    applications.length ? createTable(columns, applications) : h('p', { class: 'empty' }, 'Belum ada pengajuan.'),
  );
}

function openForm() {
  const onSubmit = (data) => {
    addApplication(data);
    dialog.close();
    render();
  };

  dialog.replaceChildren(createForm(FORM_SECTIONS, { onSubmit, onCancel: () => dialog.close() }));
  dialog.showModal();
}

roleSelect.replaceChildren(...Object.entries(ROLES).map(([value, label]) => h('option', { value }, label)));
roleSelect.addEventListener('change', () => {
  role = roleSelect.value;
  render();
});
newButton.addEventListener('click', openForm);

render();
