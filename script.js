// Simulasi data menu (bisa di-fetch dari backend PHP+MySQL)
const menuData = [
    {
        id: 1,
        nama: "Miso Royal",
        deskripsi: "Miso spesial dengan topping lengkap",
        harga: 25000,
        kategori: "miso",
        gambar: "images/miso_royal.jpg"
    },
    {
        id: 2,
        nama: "Miso Daging",
        deskripsi: "Miso dengan irisan daging sapi",
        harga: 20000,
        kategori: "miso",
        gambar: "images/miso_daging.jpg"
    },
    {
        id: 3,
        nama: "Miso Babat",
        deskripsi: "Miso dengan babat sapi",
        harga: 20000,
        kategori: "miso",
        gambar: "images/miso_babat.jpg"
    },
    {
        id: 4,
        nama: "Miso Cincang",
        deskripsi: "Miso dengan daging cincang",
        harga: 20000,
        kategori: "miso",
        gambar: "images/miso_cincang.jpg"
    },
    {
        id: 5,
        nama: "Miso Ceker",
        deskripsi: "Miso dengan ceker ayam",
        harga: 20000,
        kategori: "miso",
        gambar: "images/miso_ceker.jpg"
    },
    {
        id: 6,
        nama: "Miso Hati",
        deskripsi: "Miso dengan hati ayam",
        harga: 20000,
        kategori: "miso",
        gambar: "images/miso_hati.jpg"
    },
    {
        id: 7,
        nama: "Miso Original",
        deskripsi: "Miso original tanpa topping",
        harga: 17000,
        kategori: "miso",
        gambar: "images/miso_original.jpg"
    },
    {
        id: 8,
        nama: "Mie Ayam Original",
        deskripsi: "Mie ayam klasik",
        harga: 18000,
        kategori: "mie ayam",
        gambar: "images/mie_ayam_original.jpg"
    },
    {
        id: 9,
        nama: "Mie Ayam Bakso",
        deskripsi: "Mie ayam dengan bakso",
        harga: 22000,
        kategori: "mie ayam",
        gambar: "images/mie_ayam_bakso.jpg"
    }
];

// Render menu ke halaman
function renderMenu() {
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";
    menuData.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}" class="menu-img">
            <div class="menu-content">
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <div class="price">Rp${item.harga.toLocaleString()}</div>
                <button onclick="addToOrder(${item.id})">Tambah</button>
            </div>
        `;
        menuList.appendChild(card);
    });
}

// Order logic
let orderItems = {};

function addToOrder(menuId) {
    if (!orderItems[menuId]) {
        orderItems[menuId] = 1;
    } else {
        orderItems[menuId]++;
    }
    renderOrderItems();
}

function renderOrderItems() {
    const container = document.getElementById("order-items");
    container.innerHTML = "";
    Object.keys(orderItems).forEach(menuId => {
        const item = menuData.find(m => m.id == menuId);
        const row = document.createElement("div");
        row.className = "order-item-row";
        row.innerHTML = `
            <span>${item.nama} (Rp${item.harga.toLocaleString()})</span>
            <input type="number" value="${orderItems[menuId]}" min="1" onchange="updateOrderItem(${menuId}, this.value)">
            <button onclick="removeOrderItem(${menuId})">Hapus</button>
        `;
        container.appendChild(row);
    });
    renderSummary();
}

function updateOrderItem(menuId, qty) {
    if (qty < 1) qty = 1;
    orderItems[menuId] = parseInt(qty);
    renderOrderItems();
}

function removeOrderItem(menuId) {
    delete orderItems[menuId];
    renderOrderItems();
}

function renderSummary() {
    const summary = document.getElementById("order-summary");
    let total = 0;
    Object.keys(orderItems).forEach(menuId => {
        const item = menuData.find(m => m.id == menuId);
        total += item.harga * orderItems[menuId];
    });
    summary.innerHTML = "Total Pemesanan: Rp" + total.toLocaleString();
}

// Form submit
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const nama = document.getElementById("namaPelanggan").value.trim();
    if (!nama) {
        alert("Nama pelanggan harus diisi!");
        return;
    }
    if (Object.keys(orderItems).length === 0) {
        alert("Silakan pilih menu terlebih dahulu.");
        return;
    }
    let detail = "";
    Object.keys(orderItems).forEach(menuId => {
        const item = menuData.find(m => m.id == menuId);
        detail += `${item.nama} x${orderItems[menuId]}, `;
    });
    alert(`Terima kasih, ${nama}! Pesanan Anda: ${detail}`);
    orderItems = {};
    renderOrderItems();
    document.getElementById("order-form").reset();
});

// Scroll ke menu
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({behavior: "smooth"});
}

// Inisialisasi
renderMenu();