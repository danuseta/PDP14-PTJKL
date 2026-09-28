import { h } from '../dom.js';
import { CONTRACT_STATUSES, FILE_FIELDS } from '../config.js';
import { loadFile } from '../files.js';
import { rupiah } from '../format.js';

const letter = (title, id, rows) =>
  h(
    'article',
    { class: 'letter' },
    h('h3', {}, `${title} ${id}`),
    h('table', {}, ...rows.map(([label, value]) => h('tr', {}, h('th', {}, label), h('td', {}, value)))),
  );

const uploaded = async ({ id, data }) => {
  const items = await Promise.all(
    FILE_FIELDS.map(async ({ name, label }) => {
      const file = await loadFile(id, name);
      const link = file && h('a', { href: URL.createObjectURL(file), target: '_blank' }, data[name]);
      return h('li', {}, `${label}: `, link || '-');
    }),
  );
  return h('section', { class: 'uploaded' }, h('h3', {}, 'Dokumen Pengajuan'), h('ul', {}, ...items));
};

const generated = ({ id, data }) => [
  letter('Kontrak Kredit', id, [
    ['Nama', data.nama],
    ['NIK', data.nik],
    ['Kendaraan', `${data.merk} ${data.model} ${data.tipe}`],
    ['Harga', rupiah(data.harga)],
    ['Down Payment', rupiah(data.dp)],
    ['Lama Kredit', `${data.tenor} bulan`],
    ['Angsuran/Bulan', rupiah(data.angsuran)],
    ['Asuransi', data.asuransi],
  ]),
  letter('Purchase Order', id, [
    ['Dealer', data.dealer],
    ['Pemesan', data.nama],
    ['Kendaraan', `${data.merk} ${data.model} ${data.tipe}`],
    ['Warna', data.warna],
    ['Harga', rupiah(data.harga)],
  ]),
];

export async function createDocuments(application, onClose) {
  const letters = CONTRACT_STATUSES.includes(application.status) ? generated(application) : [];

  return h(
    'div',
    { class: 'documents' },
    await uploaded(application),
    ...letters,
    h(
      'div',
      { class: 'actions' },
      h('button', { type: 'button', class: 'secondary', onclick: onClose }, 'Tutup'),
      letters.length ? h('button', { type: 'button', onclick: () => window.print() }, 'Cetak') : null,
    ),
  );
}
