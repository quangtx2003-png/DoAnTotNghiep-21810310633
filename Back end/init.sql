-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 04, 2026 at 05:48 PM
-- Server version: 8.1.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rem`
--

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

CREATE TABLE `attribute_value` (
                                   `id` int NOT NULL,
                                   `attribute_id` int NOT NULL,
                                   `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attribute_value`
--

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
                                                                  (1, 1, 'Đỏ'),
                                                                  (2, 1, 'Xanh'),
                                                                  (3, 2, '30m'),
                                                                  (4, 2, 'Không chống nước'),
                                                                  (9, 5, 'Dây da'),
                                                                  (10, 5, 'Dây thép'),
                                                                  (11, 6, 'Đen'),
                                                                  (12, 6, 'Xanh'),
                                                                  (13, 7, '50m'),
                                                                  (14, 7, '100m');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
                            `id` int NOT NULL,
                            `name` varchar(200) DEFAULT NULL,
                            `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
                                                         (1, 'Đồng hồ cơ', 'Các mẫu đồng hồ cơ tự động và lên cót tay, dành cho người yêu thích kỹ thuật truyền thống.'),
                                                         (2, 'Đồng hồ thông minh', 'Smartwatch theo dõi sức khỏe, thông báo cuộc gọi, kết nối điện thoại.'),
                                                         (3, 'Đồng hồ Quartz', 'Đồng hồ chạy pin, độ chính xác cao, thiết kế đa dạng cho nam và nữ.'),
                                                         (4, 'Đồng hồ thể thao', 'Đồng hồ chuyên dụng cho vận động, chống nước, bấm giờ, đo nhịp tim.'),
                                                         (5, 'Đồng hồ thời trang', 'Thiết kế hiện đại, phù hợp đi làm, đi chơi, quà tặng.');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
                           `id` int NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `description` text,
                           `category_id` int NOT NULL DEFAULT '0',
                           `active` int DEFAULT '1',
                           `image` text,
                           `thumbnail` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `active`, `image`, `thumbnail`) VALUES
                                                                                                       (1, 'Đồng hồ Xiaomi', 'Đồng hồ thông minh Xiaomi, pin lâu, chống nước', 1, 1, NULL, NULL),
                                                                                                       (2, 'Ghế công thái học chuyên nghiệp', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-1.jpg', NULL),
                                                                                                       (3, 'Đồng hồ Casio Edifice', 'Đồng hồ Casio Edifice thể thao, bền bỉ, thiết kế nam tính', 3, 1, NULL, NULL),
                                                                                                       (4, 'Hàng trưng bày - Giá đỡ laptop có thể điều chỉnh.', NULL, 1, 1, 'https://gearo-html.vercel.app/images/shop/product-2.jpg', NULL),
                                                                                                       (5, 'Giá đỡ laptop', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-3.1.jpg', NULL),
                                                                                                       (6, 'Bàn làm việc đứng đôi', NULL, 0, 1, NULL, NULL),
                                                                                                       (7, 'Đế sạc không dây', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-5.3.jpg', NULL),
                                                                                                       (8, 'Ergonomic Headrest', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-6.jpg', NULL),
                                                                                                       (9, 'Túi đựng laptop lai', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-7.jpg', NULL),
                                                                                                       (10, 'Wireless Charging Tray', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-8.1.jpg', NULL),
                                                                                                       (11, 'Ghế Softside', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-9.jpg', NULL),
                                                                                                       (12, 'Bàn làm việc đứng đôi', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-10.jpg', NULL),
                                                                                                       (13, 'Duo Standing Desk', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-11.jpg', NULL),
                                                                                                       (14, 'Đèn alumina', NULL, 0, 1, 'https://gearo-html.vercel.app/images/shop/product-12.1.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute`
--

CREATE TABLE `product_attribute` (
                                     `id` int NOT NULL,
                                     `field_name` varchar(100) NOT NULL,
                                     `name` varchar(100) NOT NULL,
                                     `product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_attribute`
--

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
                                                                               (1, 'color', 'Màu sắc', 1),
                                                                               (2, 'water_resistance', 'Chống nước', 1),
                                                                               (5, 'strap', 'Loại dây', 3),
                                                                               (6, 'dial_color', 'Màu mặt', 3),
                                                                               (7, 'water_resistance', 'Chống nước', 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_variant`
--

CREATE TABLE `product_variant` (
                                   `id` int NOT NULL,
                                   `product_id` int NOT NULL,
                                   `sku` varchar(100) DEFAULT NULL,
                                   `price` double DEFAULT NULL,
                                   `stock` int DEFAULT '0',
                                   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_variant`
--

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `created_at`) VALUES
                                                                                              (1, 1, 'XIAOMI-RED-30M', 999000, 5, '2026-01-02 10:05:34'),
                                                                                              (2, 1, 'XIAOMI-BLUE-30M', 899000, 14, '2026-01-02 10:05:34'),
                                                                                              (3, 1, 'XIAOMI-RED-0M', 700000, 23, '2026-01-02 10:09:51'),
                                                                                              (6, 3, 'CASIO-LEATHER-BLACK-50M', 3200000, 6, '2026-01-02 10:20:28'),
                                                                                              (7, 3, 'CASIO-LEATHER-BLUE-100M', 3400000, 4, '2026-01-02 10:20:28'),
                                                                                              (8, 3, 'CASIO-STEEL-BLACK-100M', 3600000, 5, '2026-01-02 10:20:28'),
                                                                                              (9, 3, 'CASIO-STEEL-BLUE-50M', 3500000, 3, '2026-01-02 10:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_attribute`
--

CREATE TABLE `product_variant_attribute` (
                                             `variant_id` int NOT NULL,
                                             `attribute_value_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_variant_attribute`
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
                                                                                 (9, 13);

-- --------------------------------------------------------

--
-- Table structure for table `product_wishlist`
--

CREATE TABLE `product_wishlist` (
                                     `user_id` int NOT NULL,
                                     `product_id` int NOT NULL,
                                     `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
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
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `password`, `plain_password`, `email`, `role`, `created_at`, `active`) VALUES
    (1, 'a', '0123123123', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, NULL, 'seller', '2026-01-02 09:29:44', b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attribute_value`
--
ALTER TABLE `attribute_value`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_attribute_value_attribute` (`attribute_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_active` (`active`),
  ADD KEY `idx_product_category` (`category_id`);

--
-- Indexes for table `product_attribute`
--
ALTER TABLE `product_attribute`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_attribute_field_name` (`field_name`,`product_id`),
  ADD KEY `idx_attribute_product_id` (`product_id`);

--
-- Indexes for table `product_variant`
--
ALTER TABLE `product_variant`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_product_variant_product` (`product_id`);

--
-- Indexes for table `product_variant_attribute`
--
ALTER TABLE `product_variant_attribute`
    ADD KEY `idx_variant_attribute_variant` (`variant_id`),
  ADD KEY `idx_variant_attribute_value` (`attribute_value_id`);

--
-- Indexes for table `product_wishlist`
--
ALTER TABLE `product_wishlist`
    ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `idx_wishlist_user` (`user_id`),
  ADD KEY `idx_wishlist_product` (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attribute_value`
--
ALTER TABLE `attribute_value`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product_attribute`
--
ALTER TABLE `product_attribute`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_variant`
--
ALTER TABLE `product_variant`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
