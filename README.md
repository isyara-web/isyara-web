# Isyara Web

Aplikasi web inovatif yang menerjemahkan suara, video, dan teks secara otomatis ke dalam bahasa isyarat Indonesia (BISINDO). Dibangun dengan Next.js 15 dan React 19 menggunakan arsitektur komponen reusable.

## 📋 Daftar Isi

- [Demo](#-demo)
- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Paper & Referensi](#-paper--referensi)
- [Persyaratan](#-persyaratan)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [Komponen Reusable](#-komponen-reusable)
- [Custom Hooks](#-custom-hooks)
- [Utils & Constants](#-utils--constants)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Arsitektur](#-arsitektur)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## 🎬 Demo

Berikut adalah video demo aplikasi Isyara:

[![Preview Video](https://img.shields.io/badge/▶%20Play-Video-green?style=for-the-badge)](https://drive.google.com/open?id=1O9qmfNvw-VEldx0IpW8flFzALTBh-dQD)

[![Preview Video](https://img.shields.io/badge/▶%20Play-Video-blue?style=for-the-badge)](https://drive.google.com/open?id=10JJWPEwGhFs7OGMNpkjdo3TMQS-Uae5y)

## ✨ Fitur

- **Upload Video dari Perangkat** - Unggah video berdurasi hingga 4 menit langsung dari perangkat Anda
- **Masukkan Link Video YouTube** - Masukkan tautan video YouTube berbahasa Indonesia
- **Suara / Teks ke Bahasa Isyarat** - Masukkan suara atau teks, dan Isyara akan menerjemahkannya menjadi video gesture BISINDO
- **Input Suara Langsung** - Gunakan speech recognition untuk input suara
- **Preview Video** - Preview video gesture yang sedang diputar
- **Kontrol Video** - Play, Pause, Resume, dan Reset untuk video gesture

## 🛠 Teknologi

- **Next.js 15.1.3** - Framework React dengan App Router
- **React 19.0.0** - Library UI terbaru
- **React Bootstrap 2.10.10** - Komponen UI berbasis Bootstrap
- **Bootstrap 5.3.7** - Framework CSS
- **Next.js Image** - Optimasi gambar otomatis
- **Web Speech API** - Speech recognition untuk input suara

## 📚 Paper & Referensi

### Research Paper

Aplikasi Isyara didasarkan pada penelitian yang telah dipublikasikan di IEEE. Jika Anda menggunakan atau mengutip aplikasi Isyara dalam penelitian, silakan merujuk pada paper berikut:

**Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition**

- **IEEE Xplore:** [https://ieeexplore.ieee.org/document/11161638](https://ieeexplore.ieee.org/document/11161638)
- **DOI:** 10.1109/ICEEIE58664.2023.10386000
- **Conference:** International Electronics Symposium 2025
- **Date:** August 5-7, 2025
- **Location:** Hybrid at DoubleTree by Hilton, Surabaya, Indonesia
- **Theme:** "Intelligent Connectivity: Enabling Green ICT in Emerging Technology Services for Sustainable Living"

### Abstract

Multimodal technology integrates inputs such as audio, video, and text to enhance natural language-based communication accessibility for individuals with disabilities. In Indonesia, people with hearing impairments continue to face challenges in accessing information due to limited sign language interpreter availability and the lack of contextual and interactive learning platforms. This research aims to develop a web-based translation platform that converts Indonesian audio, text, and video into BISINDO gestures to support inclusive communication. The proposed system uses speech recognition, NLP-based text preprocessing using tokenization, normalization, and stemming (via Sastrawi), and audio extraction using MoviePy, transcription with Speech Recognition, and gesture mapping using Supabase-based dataset with synonym handling and fallback to fingerspelling and all integrated into React-Flask architecture. Experimental results demonstrate strong performance: speech transcription achieved 95.1 % accuracy with a 3.68 % WER, text-to-gesture translation reached a 77.27 % F1-score on first-time inputs (71 seconds) and 100 % on repeated tests (1 second), while video translation improved from 13-20 % to 100 % accuracy, with processing time reduced from 14-19 minutes to just 2-4 minutes through gesture caching confirming the system's efficiency, adaptability, and potential for accessibility and learning.

Paper ini membahas implementasi sistem penerjemahan otomatis bahasa isyarat Indonesia menggunakan teknologi multimodal yang menggabungkan:
- **Speech Recognition** - Pengenalan suara untuk input audio
- **Text Processing** - Pemrosesan teks untuk input teks
- **Video Processing** - Pemrosesan video untuk ekstraksi audio dan transkripsi
- **Sign Language Generation** - Generasi video bahasa isyarat BISINDO

### Citation

**IEEE Format:**
```
[Author Names], "Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition," 
International Electronics Symposium 2025, August 5-7, 2025, Surabaya, Indonesia, 
doi: 10.1109/ICEEIE58664.2023.10386000.
```

**BibTeX Format:**
```bibtex
@inproceedings{isyara2025,
  title={Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition},
  author={[Author Names]},
  booktitle={International Electronics Symposium 2025},
  year={2025},
  month={August},
  pages={[Page Numbers]},
  address={Surabaya, Indonesia},
  doi={10.1109/ICEEIE58664.2023.10386000},
  url={https://ieeexplore.ieee.org/document/11161638}
}
```

**APA Format:**
```
[Author Names]. (2025, August). Automatic Translation of Indonesian Sign Language Based on Multimodal Technology Recognition. 
In International Electronics Symposium 2025: Intelligent Connectivity: Enabling Green ICT in Emerging Technology Services for Sustainable Living 
(pp. [Page Numbers]). IEEE. https://doi.org/10.1109/ICEEIE58664.2023.10386000
```

### Konferensi

Paper ini dipresentasikan di **International Electronics Symposium 2025**, sebuah konferensi internasional yang membahas perkembangan teknologi di bidang electronics dan emerging technology services. Konferensi ini diselenggarakan secara hybrid di DoubleTree by Hilton, Surabaya, Indonesia pada tanggal 5-7 Agustus 2025.

**Tema Konferensi:** "Intelligent Connectivity: Enabling Green ICT in Emerging Technology Services for Sustainable Living"

**Topik Penelitian:**
- Multimodal Translation Systems
- Sign Language Recognition and Translation
- Natural Language Processing (NLP)
- Accessibility Technology
- Human-Computer Interaction
- Machine Learning for Sign Language
- Green ICT and Sustainable Technology

### Akses Paper

Untuk mengakses paper lengkap, silakan kunjungi:
- **IEEE Xplore Digital Library:** [https://ieeexplore.ieee.org/document/11161638](https://ieeexplore.ieee.org/document/11161638)

> **Catatan:** Akses penuh ke paper mungkin memerlukan subscription IEEE Xplore atau pembelian artikel.

## 📦 Persyaratan

- Node.js 18.x atau lebih tinggi
- npm atau yarn
- Backend API server (untuk API endpoints)

## 🚀 Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd isyara-web
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env.local` di root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser.

## ⚙️ Konfigurasi

### Environment Variables

Buat file `.env.local` dengan konfigurasi berikut:

```env
# API URL untuk backend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Next.js Configuration

File `next.config.js` sudah dikonfigurasi dengan:
- React Strict Mode
- Image optimization
- API rewrites untuk proxy ke backend

## 🏃 Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Struktur Proyek

```
isyara-web/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout dengan Header & Footer
│   ├── page.js                   # Halaman utama (/)
│   ├── home/
│   │   └── page.js               # Halaman home (/home)
│   ├── text-to-gesture/
│   │   └── page.js               # Halaman text to gesture
│   └── upload-video/
│       └── page.js                # Halaman upload video
├── public/                        # File statis
│   ├── images/                    # Gambar dan ilustrasi
│   └── icons/                     # Icons
├── src/
│   ├── components/                # Komponen React
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── InfoBox.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── VideoControls.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── GestureGrid.jsx
│   │   │   ├── FloatingVideoPlayer.jsx
│   │   │   ├── VoiceInputButton.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── LinkInput.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── PageTitle.jsx
│   │   │   ├── PageSubtitle.jsx
│   │   │   ├── FormGroup.jsx
│   │   │   ├── TextInput.jsx
│   │   │   ├── FooterLink.jsx
│   │   │   ├── CardGrid.jsx
│   │   │   └── index.js           # Export semua UI components
│   │   ├── Header.js              # Header component
│   │   ├── Footer.js              # Footer component
│   │   ├── Hero.js                # Hero section
│   │   ├── Features.js            # Features section
│   │   ├── WhyChoose.js           # Why choose section
│   │   ├── About.js               # About section
│   │   ├── FAQ.js                 # FAQ section
│   │   ├── CallToAction.js       # CTA section
│   │   ├── HomePage.js            # Home page component
│   │   ├── TextToGesture.js       # Text to gesture component
│   │   └── uploadVideo.js         # Upload video component
│   ├── hooks/                     # Custom React hooks
│   │   ├── useApi.js              # Hook untuk API calls
│   │   ├── useVideoPlayer.js      # Hook untuk video player controls
│   │   ├── useSpeechRecognition.js # Hook untuk speech recognition
│   │   └── index.js               # Export semua hooks
│   ├── utils/                     # Utility functions
│   │   └── helpers.js             # Helper functions
│   ├── constants/                 # Constants
│   │   └── index.js               # Application constants
│   ├── App.css                    # Global styles
│   └── index.css                  # Base styles
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
└── README.md                      # Dokumentasi
```

## 🧩 Komponen Reusable

Proyek ini menggunakan arsitektur komponen reusable untuk memastikan konsistensi dan maintainability.

### UI Components

Semua komponen reusable berada di `src/components/ui/`:

#### Button
Komponen button dengan loading state dan berbagai variant.
```jsx
import { Button } from '@/components/ui';

<Button variant="primary" isLoading={loading} onClick={handleClick}>
  Submit
</Button>
```

#### Card
Komponen card dengan sub-components (Title, Text, Body, Header).
```jsx
import { Card } from '@/components/ui';

<Card>
  <Card.Title>Title</Card.Title>
  <Card.Text>Content</Card.Text>
</Card>
```

#### Section
Komponen section dengan Container sub-component.
```jsx
import { Section } from '@/components/ui';

<Section id="features" bg="bg-light">
  <Section.Container>
    Content
  </Section.Container>
</Section>
```

#### InfoBox
Komponen info box dengan berbagai variant (info, warning, success, error).
```jsx
import { InfoBox } from '@/components/ui';

<InfoBox title="Informasi" variant="info">
  Konten informasi
</InfoBox>
```

#### VideoControls
Komponen kontrol video (Play, Pause, Resume, Reset).
```jsx
import { VideoControls } from '@/components/ui';

<VideoControls
  onPlayAll={playAll}
  onPause={pauseAll}
  onResume={resumeAll}
  onReset={resetAll}
/>
```

#### GestureGrid
Komponen grid untuk menampilkan gesture videos.
```jsx
import { GestureGrid } from '@/components/ui';

<GestureGrid
  gestures={gestures}
  videoRefs={videoRefs}
  onVideoPlay={handleVideoPlay}
/>
```

#### Dan banyak lagi...
Lihat `src/components/ui/index.js` untuk daftar lengkap komponen reusable.

## 🎣 Custom Hooks

### useApi
Hook untuk melakukan API calls dengan loading dan error handling.
```jsx
import { useApi } from '@/hooks';

const { loading, error, callApi } = useApi();

const { data, error } = await callApi('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify({ data })
});
```

### useVideoPlayer
Hook untuk mengontrol video player (play, pause, resume, reset).
```jsx
import { useVideoPlayer } from '@/hooks';

const {
  videoRefs,
  currentVideoPath,
  currentGesture,
  playAll,
  pauseAll,
  resumeAll,
  resetAll
} = useVideoPlayer(gestures);
```

### useSpeechRecognition
Hook untuk speech recognition.
```jsx
import { useSpeechRecognition } from '@/hooks';

const { isListening, startListening } = useSpeechRecognition();

startListening((transcript) => {
  console.log(transcript);
}, 'id-ID');
```

## 🔧 Utils & Constants

### Utils (`src/utils/helpers.js`)

- `chunkArray(array, size)` - Chunk array menjadi array yang lebih kecil
- `isValidYouTubeURL(url)` - Validasi URL YouTube
- `isSupportedVideo(url)` - Cek apakah format video didukung
- `extractGestureName(path)` - Ekstrak nama gesture dari path
- `formatFileSize(bytes)` - Format ukuran file

### Constants (`src/constants/index.js`)

- `FEATURES` - Data fitur aplikasi
- `WHY_CHOOSE_REASONS` - Alasan memilih Isyara
- `FAQ_ITEMS` - Data FAQ
- `MAX_FILE_SIZE` - Ukuran file maksimal (50MB)
- `GESTURE_VIDEO_WIDTH` - Lebar video gesture
- `GESTURE_VIDEO_HEIGHT` - Tinggi video gesture
- `GESTURES_PER_ROW` - Jumlah gesture per baris

## 📜 Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL backend API | `http://localhost:5000` |

## 🏗 Arsitektur

### App Router (Next.js 15)
Proyek menggunakan Next.js App Router dengan struktur:
- `app/layout.js` - Root layout dengan Header dan Footer
- `app/page.js` - Halaman utama
- `app/[route]/page.js` - Halaman dinamis

### Component Architecture
- **Page Components** - Komponen untuk halaman spesifik
- **UI Components** - Komponen reusable di `src/components/ui/`
- **Layout Components** - Header, Footer, Section
- **Feature Components** - TextToGesture, UploadVideo, dll

### State Management
- React Hooks (useState, useRef, useCallback)
- Custom Hooks untuk logic reuse
- Local state untuk component-specific data

### Styling
- Bootstrap 5 untuk layout dan utilities
- React Bootstrap untuk komponen
- CSS Modules untuk custom styles
- Inline styles untuk dynamic styling

## 🎨 Best Practices

1. **Component Reusability** - Gunakan komponen reusable dari `src/components/ui/`
2. **Custom Hooks** - Gunakan custom hooks untuk logic yang bisa di-reuse
3. **Constants** - Simpan data statis di `src/constants/`
4. **Utils** - Gunakan utility functions dari `src/utils/`
5. **Error Handling** - Gunakan ErrorMessage component untuk error display
6. **Loading States** - Gunakan LoadingSpinner component
7. **Type Safety** - Gunakan JSDoc comments untuk dokumentasi

## 🐛 Troubleshooting

### Error: Module not found
Pastikan semua path import menggunakan path yang benar:
- Komponen: `../src/components/ComponentName`
- UI Components: `./ui` atau `../components/ui`
- Hooks: `../hooks`
- Utils: `../utils/helpers`

### Error: API connection failed
Pastikan:
1. Backend server berjalan
2. `NEXT_PUBLIC_API_URL` di `.env.local` benar
3. CORS sudah dikonfigurasi di backend

### Error: Speech recognition not working
Speech recognition hanya bekerja di browser yang mendukung:
- Chrome/Edge (WebKit Speech Recognition)
- Pastikan menggunakan HTTPS atau localhost

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

© 2025 Isyara. All rights reserved.

## 👥 Tim

Dikembangkan dengan ❤️ untuk mendukung aksesibilitas informasi bagi penyandang disabilitas pendengaran di Indonesia.

---

**Isyara** - Solusi Inklusif untuk Komunikasi Tunarungu
