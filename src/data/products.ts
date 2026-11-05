import type { CategoryFilter, Product } from "../types";

export const products: Product[] = [
  { id: 1, name: "Bàn phím cơ K87", category: "Bàn phím", price: 850000, emoji: "⌨️", color: "#dbe7ff", desc: "Switch tactile, 87 phím, đèn nền trắng. Gõ êm, hợp làm việc lâu." },
  { id: 2, name: "Bàn phím low-profile", category: "Bàn phím", price: 1190000, emoji: "⌨️", color: "#e4ddff", desc: "Mỏng 2 cm, kết nối Bluetooth 3 thiết bị, pin 2 tháng." },
  { id: 3, name: "Chuột không dây M3", category: "Chuột", price: 320000, emoji: "🖱️", color: "#d9f2e6", desc: "Cảm biến 4000 DPI, nặng 68 g, sạc USB-C." },
  { id: 4, name: "Chuột công thái học", category: "Chuột", price: 690000, emoji: "🖱️", color: "#fde7d6", desc: "Dáng đứng 57°, giảm mỏi cổ tay khi dùng cả ngày." },
  { id: 5, name: "Tai nghe chụp tai", category: "Âm thanh", price: 590000, emoji: "🎧", color: "#ffe0e6", desc: "Chống ồn thụ động, đệm tai êm, dây rời 3.5 mm." },
  { id: 6, name: "Loa mini Bluetooth", category: "Âm thanh", price: 450000, emoji: "🔊", color: "#fff1c9", desc: "Chống nước IPX5, nghe 10 giờ, ghép đôi 2 loa." },
  { id: 7, name: "Lót chuột cỡ lớn", category: "Phụ kiện", price: 120000, emoji: "🟫", color: "#e9e4dc", desc: "80 × 30 cm, mặt vải mịn, đế cao su chống trượt." },
  { id: 8, name: "Giá đỡ laptop", category: "Phụ kiện", price: 280000, emoji: "💻", color: "#dff3f7", desc: "Nhôm nguyên khối, gập gọn, chỉnh 6 nấc độ cao." },
];

export const categories: CategoryFilter[] = ["Tất cả", "Bàn phím", "Chuột", "Âm thanh", "Phụ kiện"];

export const formatVND = (n: number): string => n.toLocaleString("vi-VN") + " đ";
