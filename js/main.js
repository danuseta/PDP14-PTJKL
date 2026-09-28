import { h } from './dom.js';
import { ROLES, CREATOR_ROLE, STATUS_LABEL, FORMS } from './config.js';
import { listApplications, listNotifications } from './storage.js';
import { actionsFor, createApplication, perform } from './workflow.js';
import { createForm } from './components/form.js';
import { createTable } from './components/table.js';
import { createDocuments } from './components/documents.js';
import { rupiah } from './format.js';

const roleSelect = document.querySelector('#role');
const newButton = document.querySelector('#new');
const list = document.querySelector('#list');
const notifications = document.querySelector('#notifications');
const dialog = document.querySelector('#dialog');

let role = Object.keys(ROLES)[0];

const close = () => dialog.close();

const show = (content) => {
  dialog.replaceChildren(content);
  dialog.showModal();
};

const openForm = (sections, values, submit) => {
  const onSubmit = async (result) => {
    await submit(result);
    close();
    render();
  };
  show(createForm(sections, { values, onSubmit, onCancel: close }));
};

const runAction = (application, action) =>
  action.form
    ? openForm(FORMS[action.form], application.data, (result) => perform(application, action, result))
    : perform(application, action).then(render);

const button = (label, onclick, className = 'small') => h('button', { type: 'button', class: className, onclick }, label);

const columns = [
  { header: 'No. Pengajuan', render: (item) => item.id },
  { header: 'Konsumen', render: (item) => item.data.nama },
  { header: 'Kendaraan', render: (item) => `${item.data.merk} ${item.data.model}` },
  { header: 'Angsuran/Bulan', render: (item) => rupiah(item.data.angsuran) },
  {
    header: 'Status',
    render: (item) => h('span', { class: `status-${item.status.toLowerCase()}` }, STATUS_LABEL[item.status]),
  },
  {
    header: 'Aksi',
    render: (item) =>
      h(
        'div',
        { class: 'row-actions' },
        button('Dokumen', async () => show(await createDocuments(item, close)), 'small secondary'),
        ...actionsFor(item.status, role).map((action) => button(action.label, () => runAction(item, action))),
      ),
  },
];

function render() {
  const applications = listApplications();
  const messages = listNotifications(role);

  newButton.hidden = role !== CREATOR_ROLE;
  list.replaceChildren(
    applications.length ? createTable(columns, applications) : h('p', { class: 'empty' }, 'Belum ada pengajuan.'),
  );
  notifications.replaceChildren(
    ...(messages.length ? [h('h2', {}, 'Notifikasi'), h('ul', {}, ...messages.map((item) => h('li', {}, item.message)))] : []),
  );
}

roleSelect.replaceChildren(...Object.entries(ROLES).map(([value, label]) => h('option', { value }, label)));
roleSelect.addEventListener('change', () => {
  role = roleSelect.value;
  render();
});
newButton.addEventListener('click', () => openForm(FORMS.pengajuan, null, createApplication));

render();
