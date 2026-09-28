# PDP 14 Technology - PT. JKL

## Cara Menjalankan

Project memakai ES modules, jadi `index.html` perlu dibuka lewat server lokal (tidak bisa langsung di-double-click). Pilih salah satu:

**VS Code**
1. Install ekstensi **Live Server**.
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.

**Node.js**
```bash
npx serve
```

**Python**
```bash
python -m http.server 8000
```

Setelah itu buka alamat yang muncul di terminal, misalnya `http://localhost:8000`.

## Cara Pakai

Pilih peran di pojok kanan atas, lalu ikuti alurnya:

| Status | Peran yang bisa bertindak | Aksi |
|---|---|---|
| Diajukan | Marketing | Verifikasi & ajukan |
| Menunggu Approval | Atasan Marketing | Setujui, minta revisi, atau tolak |
| Disetujui | Admin Backoffice | Kirim e-sign |
| Menunggu TTD | Konsumen | Tanda tangan |
| Sudah TTD | Admin Backoffice | Cairkan dana |

Pengajuan baru dibuat oleh **Sales Dealer** atau **Marketing** lewat tombol *Pengajuan Baru*.

## Penyimpanan Data

Data disimpan di `localStorage` browser (key `jkl.applications`), jadi tetap ada setelah halaman di-refresh. Data hanya berlaku di browser dan alamat yang sama, dan akan hilang kalau data situs dihapus.

## Struktur Folder

```
kredit-jkl/
├── index.html
├── css/style.css
└── js/
    ├── main.js          entry point dan render halaman
    ├── config.js        peran, status, alur, dan field form
    ├── dom.js           helper pembuat elemen
    ├── storage.js       baca dan tulis localStorage
    ├── workflow.js      aksi yang tersedia per status dan peran
    └── components/
        ├── form.js      form generik dari config
        └── table.js     tabel generik
```

# Alur Digitalisasi 
<img width="1502" height="1001" alt="image" src="https://github.com/user-attachments/assets/5389a0e5-152e-4fdd-ab9c-3c36a3e3535b" />
