-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql
-- Thời gian đã tạo: Th1 09, 2026 lúc 03:50 PM
-- Phiên bản máy phục vụ: 8.1.0
-- Phiên bản PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `rem`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attribute_value`
--

CREATE TABLE `attribute_value` (
  `id` int NOT NULL,
  `attribute_id` int NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `attribute_value`
--

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(1, 1, 'red'),
(2, 1, 'blue'),
(3, 2, '30m'),
(4, 2, 'Không chống nước'),
(9, 5, 'Dây da'),
(10, 5, 'Dây thép'),
(11, 6, 'black'),
(12, 6, 'green'),
(13, 7, '50m'),
(14, 7, '100m'),
(15, 1001, 'S'),
(16, 1011, 'S'),
(17, 1021, 'S'),
(18, 1031, 'S'),
(19, 1041, 'S'),
(20, 1051, 'S'),
(21, 1061, 'S'),
(22, 1071, 'S'),
(23, 1081, 'S'),
(24, 1091, 'S'),
(25, 1101, 'S'),
(26, 1111, 'S'),
(27, 1121, 'S'),
(28, 1131, 'S'),
(29, 1141, 'S'),
(30, 1151, 'S'),
(31, 1161, 'S'),
(32, 1171, 'S'),
(33, 1181, 'S'),
(34, 1191, 'S'),
(35, 1201, 'S'),
(36, 1211, 'S'),
(37, 1221, 'S'),
(38, 1231, 'S'),
(39, 1241, 'S'),
(40, 1251, 'S'),
(41, 1261, 'S'),
(42, 1271, 'S'),
(43, 1281, 'S'),
(44, 1291, 'S'),
(46, 1001, 'M'),
(47, 1011, 'M'),
(48, 1021, 'M'),
(49, 1031, 'M'),
(50, 1041, 'M'),
(51, 1051, 'M'),
(52, 1061, 'M'),
(53, 1071, 'M'),
(54, 1081, 'M'),
(55, 1091, 'M'),
(56, 1101, 'M'),
(57, 1111, 'M'),
(58, 1121, 'M'),
(59, 1131, 'M'),
(60, 1141, 'M'),
(61, 1151, 'M'),
(62, 1161, 'M'),
(63, 1171, 'M'),
(64, 1181, 'M'),
(65, 1191, 'M'),
(66, 1201, 'M'),
(67, 1211, 'M'),
(68, 1221, 'M'),
(69, 1231, 'M'),
(70, 1241, 'M'),
(71, 1251, 'M'),
(72, 1261, 'M'),
(73, 1271, 'M'),
(74, 1281, 'M'),
(75, 1291, 'M'),
(77, 1001, 'L'),
(78, 1011, 'L'),
(79, 1021, 'L'),
(80, 1031, 'L'),
(81, 1041, 'L'),
(82, 1051, 'L'),
(83, 1061, 'L'),
(84, 1071, 'L'),
(85, 1081, 'L'),
(86, 1091, 'L'),
(87, 1101, 'L'),
(88, 1111, 'L'),
(89, 1121, 'L'),
(90, 1131, 'L'),
(91, 1141, 'L'),
(92, 1151, 'L'),
(93, 1161, 'L'),
(94, 1171, 'L'),
(95, 1181, 'L'),
(96, 1191, 'L'),
(97, 1201, 'L'),
(98, 1211, 'L'),
(99, 1221, 'L'),
(100, 1231, 'L'),
(101, 1241, 'L'),
(102, 1251, 'L'),
(103, 1261, 'L'),
(104, 1271, 'L'),
(105, 1281, 'L'),
(106, 1291, 'L'),
(108, 1, 'Đỏ'),
(109, 1002, 'Đỏ'),
(110, 1012, 'Đỏ'),
(111, 1022, 'Đỏ'),
(112, 1032, 'Đỏ'),
(113, 1042, 'Đỏ'),
(114, 1052, 'Đỏ'),
(115, 1062, 'Đỏ'),
(116, 1072, 'Đỏ'),
(117, 1082, 'Đỏ'),
(118, 1092, 'Đỏ'),
(119, 1102, 'Đỏ'),
(120, 1112, 'Đỏ'),
(121, 1122, 'Đỏ'),
(122, 1132, 'Đỏ'),
(123, 1142, 'Đỏ'),
(124, 1152, 'Đỏ'),
(125, 1162, 'Đỏ'),
(126, 1172, 'Đỏ'),
(127, 1182, 'Đỏ'),
(128, 1192, 'Đỏ'),
(129, 1202, 'Đỏ'),
(130, 1212, 'Đỏ'),
(131, 1222, 'Đỏ'),
(132, 1232, 'Đỏ'),
(133, 1242, 'Đỏ'),
(134, 1252, 'Đỏ'),
(135, 1262, 'Đỏ'),
(136, 1272, 'Đỏ'),
(137, 1282, 'Đỏ'),
(138, 1292, 'Đỏ'),
(139, 1, 'Đen'),
(140, 1002, 'Đen'),
(141, 1012, 'Đen'),
(142, 1022, 'Đen'),
(143, 1032, 'Đen'),
(144, 1042, 'Đen'),
(145, 1052, 'Đen'),
(146, 1062, 'Đen'),
(147, 1072, 'Đen'),
(148, 1082, 'Đen'),
(149, 1092, 'Đen'),
(150, 1102, 'Đen'),
(151, 1112, 'Đen'),
(152, 1122, 'Đen'),
(153, 1132, 'Đen'),
(154, 1142, 'Đen'),
(155, 1152, 'Đen'),
(156, 1162, 'Đen'),
(157, 1172, 'Đen'),
(158, 1182, 'Đen'),
(159, 1192, 'Đen'),
(160, 1202, 'Đen'),
(161, 1212, 'Đen'),
(162, 1222, 'Đen'),
(163, 1232, 'Đen'),
(164, 1242, 'Đen'),
(165, 1252, 'Đen'),
(166, 1262, 'Đen'),
(167, 1272, 'Đen'),
(168, 1282, 'Đen'),
(169, 1292, 'Đen');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Đồng hồ cơ', 'Các mẫu đồng hồ cơ tự động và lên cót tay, dành cho người yêu thích kỹ thuật truyền thống.'),
(2, 'Đồng hồ thông minh', 'Smartwatch theo dõi sức khỏe, thông báo cuộc gọi, kết nối điện thoại.'),
(3, 'Đồng hồ Quartz', 'Đồng hồ chạy pin, độ chính xác cao, thiết kế đa dạng cho nam và nữ.'),
(4, 'Đồng hồ thể thao', 'Đồng hồ chuyên dụng cho vận động, chống nước, bấm giờ, đo nhịp tim.'),
(5, 'Đồng hồ thời trang', 'Thiết kế hiện đại, phù hợp đi làm, đi chơi, quà tặng.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `code` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` double NOT NULL,
  `discount_amount` double DEFAULT '0',
  `final_amount` double NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_item`
--

CREATE TABLE `order_item` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `total_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_payment`
--

CREATE TABLE `order_payment` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `provider` varchar(50) NOT NULL,
  `payment_code` varchar(100) DEFAULT NULL,
  `amount` double NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `raw_response` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category_id` int NOT NULL DEFAULT '0',
  `active` int DEFAULT '1',
  `image` text,
  `thumbnail` text,
  `avg_rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `active`, `image`, `thumbnail`, `avg_rating`) VALUES
(1, 'Đồng hồ Xiaomi', 'Đồng hồ thông minh Xiaomi, pin lâu, chống nước', 1, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(2, 'Ghế công thái học chuyên nghiệp', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-1.jpg', 0),
(3, 'Đồng hồ Casio Edifice', 'Đồng hồ Casio Edifice thể thao, bền bỉ, thiết kế nam tính', 3, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(4, 'Hàng trưng bày - Giá đỡ laptop có thể điều chỉnh.', NULL, 1, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-2.jpg', 0),
(5, 'Giá đỡ laptop', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-3.1.jpg', 0),
(6, 'Bàn làm việc đứng đôi', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(7, 'Đế sạc không dây', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-5.3.jpg', 0),
(8, 'Ergonomic Headrest', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-6.jpg', 0),
(9, 'Túi đựng laptop lai', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-7.jpg', 0),
(10, 'Wireless Charging Tray', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(11, 'Ghế Softside', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-9.jpg', 0),
(12, 'Bàn làm việc đứng đôi', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-10.jpg', 0),
(13, 'Duo Standing Desk', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-11.jpg', 0),
(14, 'Đèn alumina', NULL, 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-12.1.jpg', 0),
(100, 'Áo thun basic 100', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(101, 'Áo thun basic 101', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-1.jpg', 0),
(102, 'Áo thun basic 102', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(103, 'Áo thun basic 103', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-2.jpg', 0),
(104, 'Áo thun basic 104', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-3.1.jpg', 0),
(105, 'Áo thun basic 105', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(106, 'Áo thun basic 106', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-5.3.jpg', 0),
(107, 'Áo thun basic 107', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-6.jpg', 0),
(108, 'Áo thun basic 108', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-7.jpg', 0),
(109, 'Áo thun basic 109', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(110, 'Áo thun basic 110', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-9.jpg', 0),
(111, 'Áo thun basic 111', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-10.jpg', 0),
(112, 'Áo thun basic 112', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-11.jpg', 0),
(113, 'Áo thun basic 113', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-12.1.jpg', 0),
(114, 'Áo thun basic 114', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(115, 'Áo thun basic 115', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-1.jpg', 0),
(116, 'Áo thun basic 116', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(117, 'Áo thun basic 117', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-1.jpg', 0),
(118, 'Áo thun basic 118', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(119, 'Áo thun basic 119', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-2.jpg', 0),
(120, 'Áo thun basic 120', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-3.1.jpg', 0),
(121, 'Áo thun basic 121', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(122, 'Áo thun basic 122', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-5.3.jpg', 0),
(123, 'Áo thun basic 123', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-6.jpg', 0),
(124, 'Áo thun basic 124', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-7.jpg', 0),
(125, 'Áo thun basic 125', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', 0),
(126, 'Áo thun basic 126', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-9.jpg', 0),
(127, 'Áo thun basic 127', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-10.jpg', 0),
(128, 'Áo thun basic 128', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-11.jpg', 0),
(129, 'Áo thun basic 129', 'Áo thun cotton', 0, 1, '[\"https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg\", \"https://i.pinimg.com/736x/b0/5e/68/b05e68cd49e77a6c8ceebece57e85184.jpg\", \"https://i.pinimg.com/736x/24/87/14/248714bd56c782a06550e8bc6bd676ba.jpg\", \"https://i.pinimg.com/1200x/e4/ff/6c/e4ff6c142f8940c36f09f3e4f172f7cc.jpg\"]', 'https://gearo-html.vercel.app/images/shop/product-12.1.jpg', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_attribute`
--

CREATE TABLE `product_attribute` (
  `id` int NOT NULL,
  `field_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_attribute`
--

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(1, 'color', 'Màu sắc', 1),
(2, 'water_resistance', 'Chống nước', 1),
(5, 'strap', 'Loại dây', 3),
(6, 'dial_color', 'Màu mặt', 3),
(7, 'water_resistance', 'Chống nước', 3),
(1001, 'size', 'Kích cỡ', 100),
(1002, 'color', 'Màu sắc', 100),
(1011, 'size', 'Kích cỡ', 101),
(1012, 'color', 'Màu sắc', 101),
(1021, 'size', 'Kích cỡ', 102),
(1022, 'color', 'Màu sắc', 102),
(1031, 'size', 'Kích cỡ', 103),
(1032, 'color', 'Màu sắc', 103),
(1041, 'size', 'Kích cỡ', 104),
(1042, 'color', 'Màu sắc', 104),
(1051, 'size', 'Kích cỡ', 105),
(1052, 'color', 'Màu sắc', 105),
(1061, 'size', 'Kích cỡ', 106),
(1062, 'color', 'Màu sắc', 106),
(1071, 'size', 'Kích cỡ', 107),
(1072, 'color', 'Màu sắc', 107),
(1081, 'size', 'Kích cỡ', 108),
(1082, 'color', 'Màu sắc', 108),
(1091, 'size', 'Kích cỡ', 109),
(1092, 'color', 'Màu sắc', 109),
(1101, 'size', 'Kích cỡ', 110),
(1102, 'color', 'Màu sắc', 110),
(1111, 'size', 'Kích cỡ', 111),
(1112, 'color', 'Màu sắc', 111),
(1121, 'size', 'Kích cỡ', 112),
(1122, 'color', 'Màu sắc', 112),
(1131, 'size', 'Kích cỡ', 113),
(1132, 'color', 'Màu sắc', 113),
(1141, 'size', 'Kích cỡ', 114),
(1142, 'color', 'Màu sắc', 114),
(1151, 'size', 'Kích cỡ', 115),
(1152, 'color', 'Màu sắc', 115),
(1161, 'size', 'Kích cỡ', 116),
(1162, 'color', 'Màu sắc', 116),
(1171, 'size', 'Kích cỡ', 117),
(1172, 'color', 'Màu sắc', 117),
(1181, 'size', 'Kích cỡ', 118),
(1182, 'color', 'Màu sắc', 118),
(1191, 'size', 'Kích cỡ', 119),
(1192, 'color', 'Màu sắc', 119),
(1201, 'size', 'Kích cỡ', 120),
(1202, 'color', 'Màu sắc', 120),
(1211, 'size', 'Kích cỡ', 121),
(1212, 'color', 'Màu sắc', 121),
(1221, 'size', 'Kích cỡ', 122),
(1222, 'color', 'Màu sắc', 122),
(1231, 'size', 'Kích cỡ', 123),
(1232, 'color', 'Màu sắc', 123),
(1241, 'size', 'Kích cỡ', 124),
(1242, 'color', 'Màu sắc', 124),
(1251, 'size', 'Kích cỡ', 125),
(1252, 'color', 'Màu sắc', 125),
(1261, 'size', 'Kích cỡ', 126),
(1262, 'color', 'Màu sắc', 126),
(1271, 'size', 'Kích cỡ', 127),
(1272, 'color', 'Màu sắc', 127),
(1281, 'size', 'Kích cỡ', 128),
(1282, 'color', 'Màu sắc', 128),
(1291, 'size', 'Kích cỡ', 129),
(1292, 'color', 'Màu sắc', 129);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_review`
--

CREATE TABLE `product_review` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `order_item_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `files` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variant`
--

CREATE TABLE `product_variant` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  `original_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variant`
--

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `created_at`, `image`, `original_price`) VALUES
(1, 1, 'XIAOMI-RED-30M', 999000, 5, '2026-01-02 10:05:34', 'https://i.pinimg.com/1200x/17/45/17/17451773129b00a1462e9bee5ea2f9db.jpg', 999999),
(2, 1, 'XIAOMI-BLUE-30M', 899000, 14, '2026-01-02 10:05:34', 'https://i.pinimg.com/736x/e3/d9/52/e3d952b03ff3493ac651cb17e5d41449.jpg', 999999),
(3, 1, 'XIAOMI-RED-0M', 700000, 23, '2026-01-02 10:09:51', 'https://i.pinimg.com/736x/4f/5f/e6/4f5fe615dc224019b490ac1dd030209b.jpg', 999999),
(6, 3, 'CASIO-LEATHER-BLACK-50M', 3200000, 6, '2026-01-02 10:20:28', 'https://i.pinimg.com/1200x/e4/49/9c/e4499c6d804c83df7b5cf66528c47be1.jpg', 999999),
(7, 3, 'CASIO-LEATHER-BLUE-100M', 3400000, 4, '2026-01-02 10:20:28', 'https://i.pinimg.com/736x/57/88/3a/57883a436956c1baa938b0d3d4614bfa.jpg', 999999),
(8, 3, 'CASIO-STEEL-BLACK-100M', 3600000, 5, '2026-01-02 10:20:28', 'https://i.pinimg.com/736x/ca/b8/a5/cab8a59a503ba70f1e29704f132884ce.jpg', 999999),
(9, 3, 'CASIO-STEEL-BLUE-50M', 3500000, 3, '2026-01-02 10:20:28', 'https://i.pinimg.com/1200x/c6/59/50/c6595099a510adb161c25bff9a380463.jpg', 999999),
(1001, 100, 'SKU-100-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/ff/3a/21/ff3a211daab409ca8305c987ac7e631f.jpg', 999999),
(1002, 100, 'SKU-100-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/47/31/2b/47312b46b98caf172c77676e21ab3431.jpg', 999999),
(1011, 101, 'SKU-101-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/f2/4e/06/f24e06f121e4b780073954a0575c8c51.jpg', 999999),
(1012, 101, 'SKU-101-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/82/e5/8d/82e58d00fc1e93e310761c78e3a1aa9d.jpg', 999999),
(1021, 102, 'SKU-102-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/0c/48/0c/0c480c33018843a28c624b57b634c892.jpg', 999999),
(1022, 102, 'SKU-102-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/ed/c5/ab/edc5abbae5718cf2c66bed3fbca9807a.jpg', 999999),
(1031, 103, 'SKU-103-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/30/f9/86/30f986b40f178a1fdec15d267339c07f.jpg', 999999),
(1032, 103, 'SKU-103-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/5a/99/85/5a9985c44e0ce7a8647cfc26d268d3b1.jpg', 999999),
(1041, 104, 'SKU-104-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/48/0c/64/480c6445d0461a262e303ff92a62a6e0.jpg', 999999),
(1042, 104, 'SKU-104-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg', 999999),
(1051, 105, 'SKU-105-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/4a/72/7d/4a727d9aba9cc521245877dc21e6f7db.jpg', 999999),
(1052, 105, 'SKU-105-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/7e/51/ac/7e51ac189085996a88be3ad27b933d7b.jpg', 999999),
(1061, 106, 'SKU-106-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/78/5d/bd/785dbd22523e056ec8f96870bcee0ac0.jpg', 999999),
(1062, 106, 'SKU-106-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/bc/4f/d3/bc4fd393a9de38e99c817d281ca4060c.jpg', 999999),
(1071, 107, 'SKU-107-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/df/7d/9a/df7d9ab87283d0c2b082c0817db0461e.jpg', 999999),
(1072, 107, 'SKU-107-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/17/45/17/17451773129b00a1462e9bee5ea2f9db.jpg', 999999),
(1081, 108, 'SKU-108-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/e3/d9/52/e3d952b03ff3493ac651cb17e5d41449.jpg', 999999),
(1082, 108, 'SKU-108-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/4f/5f/e6/4f5fe615dc224019b490ac1dd030209b.jpg', 999999),
(1091, 109, 'SKU-109-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/e4/49/9c/e4499c6d804c83df7b5cf66528c47be1.jpg', 999999),
(1092, 109, 'SKU-109-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/57/88/3a/57883a436956c1baa938b0d3d4614bfa.jpg', 999999),
(1101, 110, 'SKU-110-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/ca/b8/a5/cab8a59a503ba70f1e29704f132884ce.jpg', 999999),
(1102, 110, 'SKU-110-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/c6/59/50/c6595099a510adb161c25bff9a380463.jpg', 999999),
(1111, 111, 'SKU-111-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/ff/3a/21/ff3a211daab409ca8305c987ac7e631f.jpg', 999999),
(1112, 111, 'SKU-111-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/47/31/2b/47312b46b98caf172c77676e21ab3431.jpg', 999999),
(1121, 112, 'SKU-112-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/f2/4e/06/f24e06f121e4b780073954a0575c8c51.jpg', 999999),
(1122, 112, 'SKU-112-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/82/e5/8d/82e58d00fc1e93e310761c78e3a1aa9d.jpg', 999999),
(1131, 113, 'SKU-113-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/0c/48/0c/0c480c33018843a28c624b57b634c892.jpg', 999999),
(1132, 113, 'SKU-113-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/ed/c5/ab/edc5abbae5718cf2c66bed3fbca9807a.jpg', 999999),
(1141, 114, 'SKU-114-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/30/f9/86/30f986b40f178a1fdec15d267339c07f.jpg', 999999),
(1142, 114, 'SKU-114-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/5a/99/85/5a9985c44e0ce7a8647cfc26d268d3b1.jpg', 999999),
(1151, 115, 'SKU-115-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/48/0c/64/480c6445d0461a262e303ff92a62a6e0.jpg', 999999),
(1152, 115, 'SKU-115-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg', 999999),
(1161, 116, 'SKU-116-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/4a/72/7d/4a727d9aba9cc521245877dc21e6f7db.jpg', 999999),
(1162, 116, 'SKU-116-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/7e/51/ac/7e51ac189085996a88be3ad27b933d7b.jpg', 999999),
(1171, 117, 'SKU-117-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/78/5d/bd/785dbd22523e056ec8f96870bcee0ac0.jpg', 999999),
(1172, 117, 'SKU-117-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/bc/4f/d3/bc4fd393a9de38e99c817d281ca4060c.jpg', 999999),
(1181, 118, 'SKU-118-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/df/7d/9a/df7d9ab87283d0c2b082c0817db0461e.jpg', 999999),
(1182, 118, 'SKU-118-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/17/45/17/17451773129b00a1462e9bee5ea2f9db.jpg', 999999),
(1191, 119, 'SKU-119-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/e3/d9/52/e3d952b03ff3493ac651cb17e5d41449.jpg', 999999),
(1192, 119, 'SKU-119-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/4f/5f/e6/4f5fe615dc224019b490ac1dd030209b.jpg', 999999),
(1201, 120, 'SKU-120-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/e4/49/9c/e4499c6d804c83df7b5cf66528c47be1.jpg', 999999),
(1202, 120, 'SKU-120-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/57/88/3a/57883a436956c1baa938b0d3d4614bfa.jpg', 999999),
(1211, 121, 'SKU-121-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/ca/b8/a5/cab8a59a503ba70f1e29704f132884ce.jpg', 999999),
(1212, 121, 'SKU-121-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/c6/59/50/c6595099a510adb161c25bff9a380463.jpg', 999999),
(1221, 122, 'SKU-122-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/ff/3a/21/ff3a211daab409ca8305c987ac7e631f.jpg', 999999),
(1222, 122, 'SKU-122-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/47/31/2b/47312b46b98caf172c77676e21ab3431.jpg', 999999),
(1231, 123, 'SKU-123-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/f2/4e/06/f24e06f121e4b780073954a0575c8c51.jpg', 999999),
(1232, 123, 'SKU-123-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/82/e5/8d/82e58d00fc1e93e310761c78e3a1aa9d.jpg', 999999),
(1241, 124, 'SKU-124-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/0c/48/0c/0c480c33018843a28c624b57b634c892.jpg', 999999),
(1242, 124, 'SKU-124-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/ed/c5/ab/edc5abbae5718cf2c66bed3fbca9807a.jpg', 999999),
(1251, 125, 'SKU-125-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/30/f9/86/30f986b40f178a1fdec15d267339c07f.jpg', 999999),
(1252, 125, 'SKU-125-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/5a/99/85/5a9985c44e0ce7a8647cfc26d268d3b1.jpg', 999999),
(1261, 126, 'SKU-126-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/48/0c/64/480c6445d0461a262e303ff92a62a6e0.jpg', 999999),
(1262, 126, 'SKU-126-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/45/5b/f7/455bf72feab24e13f40be94764306d46.jpg', 999999),
(1271, 127, 'SKU-127-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/4a/72/7d/4a727d9aba9cc521245877dc21e6f7db.jpg', 999999),
(1272, 127, 'SKU-127-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/7e/51/ac/7e51ac189085996a88be3ad27b933d7b.jpg', 999999),
(1281, 128, 'SKU-128-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/78/5d/bd/785dbd22523e056ec8f96870bcee0ac0.jpg', 999999),
(1282, 128, 'SKU-128-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/736x/bc/4f/d3/bc4fd393a9de38e99c817d281ca4060c.jpg', 999999),
(1291, 129, 'SKU-129-RED-M', 199000, 50, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/df/7d/9a/df7d9ab87283d0c2b082c0817db0461e.jpg', 999999),
(1292, 129, 'SKU-129-BLACK-L', 219000, 30, '2026-01-07 09:50:44', 'https://i.pinimg.com/1200x/17/45/17/17451773129b00a1462e9bee5ea2f9db.jpg', 999999);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variant_attribute`
--

CREATE TABLE `product_variant_attribute` (
  `variant_id` int NOT NULL,
  `attribute_value_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variant_attribute`
--

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 3),
(3, 1),
(3, 4),
(6, 9),
(6, 11),
(6, 13),
(7, 9),
(7, 12),
(7, 14),
(8, 10),
(8, 11),
(8, 14),
(9, 10),
(9, 12),
(9, 13),
(1001, 46),
(1001, 109),
(1011, 47),
(1011, 110),
(1021, 48),
(1021, 111),
(1031, 49),
(1031, 112),
(1041, 50),
(1041, 113),
(1051, 51),
(1051, 114),
(1061, 52),
(1061, 115),
(1071, 53),
(1071, 116),
(1081, 54),
(1081, 117),
(1091, 55),
(1091, 118),
(1101, 56),
(1101, 119),
(1111, 57),
(1111, 120),
(1121, 58),
(1121, 121),
(1131, 59),
(1131, 122),
(1141, 60),
(1141, 123),
(1151, 61),
(1151, 124),
(1161, 62),
(1161, 125),
(1171, 63),
(1171, 126),
(1181, 64),
(1181, 127),
(1191, 65),
(1191, 128),
(1201, 66),
(1201, 129),
(1211, 67),
(1211, 130),
(1221, 68),
(1221, 131),
(1231, 69),
(1231, 132),
(1241, 70),
(1241, 133),
(1251, 71),
(1251, 134),
(1261, 72),
(1261, 135),
(1271, 73),
(1271, 136),
(1281, 74),
(1281, 137),
(1291, 75),
(1291, 138),
(1002, 77),
(1002, 140),
(1012, 78),
(1012, 141),
(1022, 79),
(1022, 142),
(1032, 80),
(1032, 143),
(1042, 81),
(1042, 144),
(1052, 82),
(1052, 145),
(1062, 83),
(1062, 146),
(1072, 84),
(1072, 147),
(1082, 85),
(1082, 148),
(1092, 86),
(1092, 149),
(1102, 87),
(1102, 150),
(1112, 88),
(1112, 151),
(1122, 89),
(1122, 152),
(1132, 90),
(1132, 153),
(1142, 91),
(1142, 154),
(1152, 92),
(1152, 155),
(1162, 93),
(1162, 156),
(1172, 94),
(1172, 157),
(1182, 95),
(1182, 158),
(1192, 96),
(1192, 159),
(1202, 97),
(1202, 160),
(1212, 98),
(1212, 161),
(1222, 99),
(1222, 162),
(1232, 100),
(1232, 163),
(1242, 101),
(1242, 164),
(1252, 102),
(1252, 165),
(1262, 103),
(1262, 166),
(1272, 104),
(1272, 167),
(1282, 105),
(1282, 168),
(1292, 106),
(1292, 169);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_wishlist`
--

CREATE TABLE `product_wishlist` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_wishlist`
--

INSERT INTO `product_wishlist` (`user_id`, `product_id`, `created_at`) VALUES
(2, 121, '2026-01-08 21:22:44'),
(2, 123, '2026-01-08 21:33:20'),
(2, 126, '2026-01-07 14:13:11'),
(2, 127, '2026-01-08 21:21:24'),
(2, 129, '2026-01-08 21:40:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `plain_password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `active` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `password`, `plain_password`, `email`, `role`, `created_at`, `active`) VALUES
(1, 'a', '0123123123', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, NULL, 'admin', '2026-01-02 09:29:44', b'1'),
(2, 'aaaassss', 'aaa', '$2a$10$pZuhT2fpQuJFqYnsFiAmcuOP7aGbLCjJUmt9CQnq8SfjUYoHxF.uu', NULL, 'asdasd@gmail.com', 'user', '2026-01-05 17:47:37', b'1'),
(3, NULL, NULL, '$2a$10$Q23MrQdvcBPCx24Ni4QkSeW44VvbjZCHWqEP4vo2.V1YFLnaGtKZO', NULL, 'asdasdd@gmail.com', 'user', '2026-01-05 17:48:07', b'1'),
(4, NULL, NULL, '$2a$10$xtIcLLHR6BWPNFfHs6ppYeJsNjfCxDvdL06fH2c71.aM8g9EVM27.', NULL, 'asdasdss@gmail.com', 'user', '2026-01-05 17:49:33', b'1'),
(7, NULL, '01231231234', '$2a$10$Usqg4EgltuCkCuitdunRGuTO4q9GdDw/B/cMhgzAUc.NohUXkGRU.', NULL, NULL, 'user', '2026-01-05 18:13:58', b'1'),
(8, 'Nguyen Van A', '0901234567', '$2a$10$8NSI9E45zaWbiQoZKhNYouy7E.5Xgj0063gxpNS192XJj/FwI39Y6', NULL, 'nguyenvana@example.com', 'user', '2026-01-08 19:14:31', b'1'),
(9, 'dangchithanh780', '0123456789', '$2a$10$w9QILMiJ8Ta/ZyIsjn2m0OB4VVUn3I9bg/ujX96qb0E3ky1Wy9jDq', NULL, 'john@example.com', 'user', '2026-01-08 19:54:29', b'1');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `attribute_value`
--
ALTER TABLE `attribute_value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_attribute_value_attribute` (`attribute_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_order_code` (`code`),
  ADD KEY `idx_order_user` (`user_id`),
  ADD KEY `idx_order_status` (`order_status`),
  ADD KEY `idx_order_payment_status` (`payment_status`);

--
-- Chỉ mục cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_item_order` (`order_id`),
  ADD KEY `idx_order_item_product` (`product_id`),
  ADD KEY `idx_order_item_variant` (`product_variant_id`);

--
-- Chỉ mục cho bảng `order_payment`
--
ALTER TABLE `order_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payment_order` (`order_id`),
  ADD KEY `idx_payment_status` (`payment_status`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_active` (`active`),
  ADD KEY `idx_product_category` (`category_id`);

--
-- Chỉ mục cho bảng `product_attribute`
--
ALTER TABLE `product_attribute`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_attribute_field_name` (`field_name`,`product_id`),
  ADD KEY `idx_attribute_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_review_order_item` (`order_item_id`),
  ADD KEY `idx_review_product` (`product_id`),
  ADD KEY `idx_review_user` (`user_id`),
  ADD KEY `idx_review_order` (`order_id`);

--
-- Chỉ mục cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_product_variant_product` (`product_id`);

--
-- Chỉ mục cho bảng `product_variant_attribute`
--
ALTER TABLE `product_variant_attribute`
  ADD KEY `idx_variant_attribute_variant` (`variant_id`),
  ADD KEY `idx_variant_attribute_value` (`attribute_value_id`);

--
-- Chỉ mục cho bảng `product_wishlist`
--
ALTER TABLE `product_wishlist`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `idx_whitelist_user` (`user_id`),
  ADD KEY `idx_whitelist_product` (`product_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `attribute_value`
--
ALTER TABLE `attribute_value`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_payment`
--
ALTER TABLE `order_payment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT cho bảng `product_attribute`
--
ALTER TABLE `product_attribute`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1293;

--
-- AUTO_INCREMENT cho bảng `product_review`
--
ALTER TABLE `product_review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1293;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `fk_order_item_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

--
-- Ràng buộc cho bảng `order_payment`
--
ALTER TABLE `order_payment`
  ADD CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
