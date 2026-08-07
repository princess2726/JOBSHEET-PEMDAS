// // Membuat fungsi penilai dengan percabangan logika
// function evaluasiSkor(nama, skor) {
//     const batasMinimal = 75;
//     let status = "";
    
//     // Logika percabangan mengecek kelulusan
//     if (skor >= batasMinimal) {
//         status = "Selamat " + nama + ", Anda dinyatakan LULUS mata pelajaran Pemrograman!";
//     } else {
//         status = "Maaf " + nama + ", Anda Belum Lulus KKM. Silakan mengikuti program Remedial.";
//     }
    
//     return status;
// }

// // Uji coba memanggil fungsi lewat console log
// let hasilUji = evaluasiSkor("Rian", 80);
// console.log("Hasil Fungsi Test:", hasilUji);



// Menguji coba koneksi file skrip
console.log("Berkas script.js berhasil terhubung dengan HTML!");

// Eksplorasi Variabel dan Operator Aritmatika
const kkmNilai = 75;
let nilaiUjian = 82;
let selisihSkor = nilaiUjian - kkmNilai;

console.log("Nilai Ujian Masuk:", nilaiUjian);
console.log("Batas Kelulusan (KKM):", kkmNilai);
console.log("Selisih Nilai Ke KKM:", selisihSkor);