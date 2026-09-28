export const ROLES = {
  dealer: 'Sales Dealer',
  marketing: 'Marketing',
  atasan: 'Atasan Marketing',
  admin: 'Admin Backoffice',
  konsumen: 'Konsumen',
};

export const CREATOR_ROLE = 'dealer';

export const STATUS_LABEL = {
  SUBMITTED: 'Diajukan',
  INCOMPLETE: 'Tidak Lengkap',
  WAITING_APPROVAL: 'Menunggu Approval',
  REVISION: 'Perlu Revisi',
  APPROVED: 'Disetujui',
  REJECTED: 'Ditolak',
  WAITING_SIGN: 'Menunggu TTD',
  SIGNED: 'Sudah TTD',
  DISBURSED: 'Dana Cair',
};

export const CONTRACT_STATUSES = ['APPROVED', 'WAITING_SIGN', 'SIGNED', 'DISBURSED'];

const FILE = { type: 'file', accept: '.pdf,.jpg,.jpeg,.png' };

export const SECTIONS = {
  konsumen: {
    title: 'Data Konsumen',
    fields: [
      { name: 'nama', label: 'Nama' },
      { name: 'nik', label: 'NIK', pattern: '\\d{16}', title: 'NIK terdiri dari 16 digit angka' },
      { name: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },
      { name: 'statusPerkawinan', label: 'Status Perkawinan', options: ['Belum Kawin', 'Kawin', 'Cerai'] },
      { name: 'pasangan', label: 'Nama Pasangan', required: false },
    ],
  },
  kendaraan: {
    title: 'Data Kendaraan',
    fields: [
      { name: 'dealer', label: 'Dealer' },
      { name: 'merk', label: 'Merk' },
      { name: 'model', label: 'Model' },
      { name: 'tipe', label: 'Tipe' },
      { name: 'warna', label: 'Warna' },
      { name: 'harga', label: 'Harga (Rp)', type: 'number' },
    ],
  },
  dokumen: {
    title: 'Dokumen',
    fields: [
      { name: 'ktp', label: 'KTP', ...FILE },
      { name: 'spk', label: 'SPK', ...FILE },
      { name: 'buktiTandaJadi', label: 'Bukti Bayar Tanda Jadi', ...FILE },
      { name: 'kk', label: 'Kartu Keluarga', ...FILE },
    ],
  },
  pinjaman: {
    title: 'Data Pinjaman',
    fields: [
      { name: 'asuransi', label: 'Asuransi' },
      { name: 'dp', label: 'Down Payment (Rp)', type: 'number' },
      { name: 'tenor', label: 'Lama Kredit (Bulan)', type: 'number' },
      { name: 'angsuran', label: 'Angsuran/Bulan (Rp)', type: 'number' },
    ],
  },
};

export const FILE_FIELDS = SECTIONS.dokumen.fields;

export const FORMS = {
  pengajuan: [SECTIONS.konsumen, SECTIONS.kendaraan, SECTIONS.dokumen],
  pinjaman: [SECTIONS.pinjaman],
};

export const TRANSITIONS = {
  SUBMITTED: [
    { role: 'marketing', label: 'Tidak lengkap', to: 'INCOMPLETE', notify: ['dealer'] },
    { role: 'marketing', label: 'Lengkap, input pinjaman', to: 'WAITING_APPROVAL', form: 'pinjaman', notify: ['atasan'] },
  ],
  INCOMPLETE: [{ role: 'dealer', label: 'Lengkapi data', to: 'SUBMITTED', form: 'pengajuan', notify: ['marketing'] }],
  WAITING_APPROVAL: [
    { role: 'atasan', label: 'Setujui', to: 'APPROVED', notify: ['admin'] },
    { role: 'atasan', label: 'Minta revisi', to: 'REVISION', notify: ['marketing'] },
    { role: 'atasan', label: 'Tolak', to: 'REJECTED', notify: ['dealer', 'marketing'] },
  ],
  REVISION: [{ role: 'marketing', label: 'Revisi data pinjaman', to: 'WAITING_APPROVAL', form: 'pinjaman', notify: ['atasan'] }],
  APPROVED: [{ role: 'admin', label: 'Kirim e-sign & PO', to: 'WAITING_SIGN', notify: ['konsumen', 'dealer'] }],
  WAITING_SIGN: [{ role: 'konsumen', label: 'Tanda tangan', to: 'SIGNED', notify: ['admin'] }],
  SIGNED: [{ role: 'admin', label: 'Cairkan dana', to: 'DISBURSED', notify: ['dealer', 'marketing'] }],
};
