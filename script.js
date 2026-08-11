document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Ambil elemen-elemen untuk fungsionalitas menu hamburger
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navLinks = document.getElementById("navLinks");

    hamburgerMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // 2. Ambil elemen-elemen untuk fungsionalitas Pop-up Keranjang Belanja
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartModal = document.getElementById("cartModal");
    const cartItemsList = document.getElementById("cartItemsList");
    
    const badgeKeranjang = document.querySelector(".cart-badge");
    const elemenTotalHarga = document.getElementById("totalHarga");
    const modalTotalHarga = document.getElementById("modalTotalHarga");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const tombolBeli = document.querySelectorAll(".btn-buy");
    
    // Array wadah penampung data barang yang dibeli secara dinamis
    let keranjangBelanjaan = [];
    let totalBelanja = 0;

    // Fungsi membuka tampilan pop-up keranjang pesanan
    openCartBtn.addEventListener("click", function () {
        cartModal.classList.add("show");
        navLinks.classList.remove("active"); // Otomatis lipat menu setelah ditekan
    });

    // Fungsi menutup tampilan pop-up keranjang pesanan
    closeCartBtn.addEventListener("click", function () {
        cartModal.classList.remove("show");
    });

    // 3. Logika Memasukkan Barang ke Keranjang pesanan
    tombolBeli.forEach((tombol) => {
        tombol.addEventListener("click", function (event) {
            event.preventDefault();
            
            const container = this.closest(".product-container");
            const namaProduk = container.querySelector(".product-title").innerText;
            const hargaAsli = parseInt(container.querySelector(".product-price").getAttribute("data-price"));
            const teksHarga = container.querySelector(".product-price").innerText;

            // Masukkan data barang berupa object ke dalam list keranjang
            keranjangBelanjaan.push({ nama: namaProduk, harga: hargaAsli, teksHarga: teksHarga });
            
            // Hitung akumulasi total harga keseluruhan belanja
            totalBelanja += hargaAsli;

            // Perbarui tampilan interface di halaman utama
            badgeKeranjang.innerText = keranjangBelanjaan.length;
            elemenTotalHarga.innerText = "Rp " + totalBelanja.toLocaleString("id-ID");
            modalTotalHarga.innerText = "Rp " + totalBelanja.toLocaleString("id-ID");

            // Perbarui susunan daftar teks pesanan di dalam pop-up modal
            updateDaftarKeranjang();

            alert(`🛒 Berhasil menambahkan ${namaProduk} ke keranjang!`);
        });
    });

    // Fungsi untuk me-render daftar teks pesanan di dalam modal secara berkala
    function updateDaftarKeranjang() {
        if (keranjangBelanjaan.length === 0) {
            cartItemsList.innerHTML = `<p class="empty-cart-text">Keranjang kamu masih kosong nih...</p>`;
            return;
        }

        // Reset list struktur lama agar tidak menumpuk ganda
        cartItemsList.innerHTML = "";

        // Looping data array untuk dieksekusi menjadi teks html list pesanan
        keranjangBelanjaan.forEach((barang) => {
            const barisBarang = document.createElement("div");
            barisBarang.classList.add("cart-item");
            barisBarang.innerHTML = `
                <span>📦 ${barang.nama}</span>
                <strong>${barang.teksHarga}</strong>
            `;
            cartItemsList.appendChild(barisBarang);
        });
    }

    // 4. Fungsi tombol checkout untuk mengirim daftar semua pesanan sekaligus ke WhatsApp
    checkoutBtn.addEventListener("click", function () {
        if (keranjangBelanjaan.length === 0) {
            alert("Keranjang kamu masih kosong, pilih produk dulu ya!");
            return;
        }

        const nomorWA = "6281234567890"; // Ganti dengan nomor WhatsApp tokomu asli
        
        // Menyusun baris list barang pesanan menjadi string rapi untuk teks chat
        let teksDaftarBarang = "";
        keranjangBelanjaan.forEach((item, index) => {
            teksDaftarBarang += `${index + 1}. *${item.nama}* (${item.teksHarga})\n`;
        });

        const templatePesan = `Halo TokoOnlineku, saya ingin memesan barang-barang berikut:\n\n${teksDaftarBarang}\n*Total Pembayaran:* *Rp ${totalBelanja.toLocaleString("id-ID")}*\n\nMohon informasi petunjuk transaksi selanjutnya. Terima kasih!`;
        
        window.open(`https://wa.me{nomorWA}?text=${encodeURIComponent(templatePesan)}`, "_blank");
    });
});