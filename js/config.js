export const ROLES = {
  dealer: 'Sales Dealer',
  marketing: 'Marketing',
  atasan: 'Atasan Marketing',
  admin: 'Admin Backoffice',
  konsumen: 'Konsumen',
};

export const CREATOR_ROLES = ['dealer', 'marketing'];

export const STATUS_LABEL = {
  SUBMITTED: 'Diajukan',
  WAITING_APPROVAL: 'Menunggu Approval',
  APPROVED: 'Disetujui',
  REJECTED: 'Ditolak',
  WAITING_SIGN: 'Menunggu TTD',
  SIGNED: 'Sudah TTD',
  DISBURSED: 'Dana Cair',
};

export const TRANSITIONS = {
  SUBMITTED: [{ role: 'marketing', label: 'Verifikasi & ajukan', to: 'WAITING_APPROVAL' }],
  WAITING_APPROVAL: [
    { role: 'atasan', label: 'Setujui', to: 'APPROVED' },
    { role: 'atasan', label: 'Minta revisi', to: 'SUBMITTED' },
    { role: 'atasan', label: 'Tolak', to: 'REJECTED' },
  ],
  APPROVED: [{ role: 'admin', label: 'Kirim e-sign', to: 'WAITING_SIGN' }],
  WAITING_SIGN: [{ role: 'konsumen', label: 'Tanda tangan', to: 'SIGNED' }],
  SIGNED: [{ role: 'admin', label: 'Cairkan dana', to: 'DISBURSED' }],
};

export const FORM_SECTIONS = [
  {
    title: 'Data Konsumen',
    fields: [
      { name: 'nama', label: 'Nama' },
      { name: 'nik', label: 'NIK', pattern: '\\d{16}', title: 'NIK terdiri dari 16 digit angka' },
      { name: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },
      { name: 'statusPerkawinan', label: 'Status Perkawinan', options: ['Belum Kawin', 'Kawin', 'Cerai'] },
      { name: 'pasangan', label: 'Nama Pasangan', required: false },
    ],
  },
  {
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
  {
    title: 'Data Pinjaman',
    fields: [
      { name: 'asuransi', label: 'Asuransi' },
      { name: 'dp', label: 'Down Payment (Rp)', type: 'number' },
      { name: 'tenor', label: 'Lama Kredit (Bulan)', type: 'number' },
      { name: 'angsuran', label: 'Angsuran/Bulan (Rp)', type: 'number' },
    ],
  },
];
