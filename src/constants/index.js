/**
 * Application constants
 */

export const FEATURES = [
  {
    title: "Upload Video dari Perangkat",
    description: "Unggah video berdurasi hingga 4 menit langsung dari perangkat Anda. Sistem akan mengekstrak audionya, mengubah menjadi teks, lalu menerjemahkannya ke dalam bahasa isyarat secara otomatis.",
    icon: "illustrasi_upload_video.svg"
  },
  {
    title: "Masukkan Link Video YouTube",
    description: "Masukkan tautan video YouTube berbahasa Indonesia. Isyara akan mengunduh dan memproses audio dari video tersebut, kemudian menerjemahkannya ke dalam gesture BISINDO yang sesuai.",
    icon: "illustrasi_link_youtube.svg"
  },
  {
    title: "Suara / Teks ke Bahasa Isyarat",
    description: "Masukkan suara atau teks, dan Isyara akan menerjemahkannya menjadi video gesture BISINDO satu kata satu video untuk memudahkan pemahaman.",
    icon: "illustrasi_text_to_gesture.svg"
  }
];

export const WHY_CHOOSE_REASONS = [
  "Akurasi terjemahan tinggi",
  "Antarmuka ramah pengguna",
  "Bisa diakses langsung dari browser",
  "Gratis untuk digunakan dalam pendidikan dan pembelajaran mandiri"
];

export const FAQ_ITEMS = [
  {
    question: "Siapa yang Bisa Menggunakan?",
    answer: "Siapa saja! Mulai dari teman dengar, teman tuli, hingga masyarakat umum."
  },
  {
    question: "Bagaimana cara kerja?",
    answer: "Masukkan teks, audio, atau video. Isyara akan menerjemahkannya ke BISINDO secara otomatis."
  },
  {
    question: "Apa saja input yang bisa diterjemahkan?",
    answer: (
      <ul>
        <li>Upload video dari perangkat</li>
        <li>Masukkan link YouTube</li>
        <li>Input suara langsung</li>
        <li>Ketik teks manual</li>
      </ul>
    )
  },
  {
    question: "Apakah hanya mendukung Bahasa Indonesia?",
    answer: "Ya, saat ini hanya Bahasa Indonesia."
  }
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const GESTURE_VIDEO_WIDTH = 200;
export const GESTURE_VIDEO_HEIGHT = 150;
export const GESTURES_PER_ROW = 5;

