-- Tạo bảng category nếu chưa có
CREATE TABLE IF NOT EXISTS `category` (
    `id` int NOT NULL,
    `name` varchar(200) DEFAULT NULL,
    `description` text,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Thêm các ràng buộc khóa ngoại
ALTER TABLE `product`
    ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `product_attribute`
    ADD CONSTRAINT `fk_product_attribute_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `attribute_value`
    ADD CONSTRAINT `fk_attribute_value_attribute` FOREIGN KEY (`attribute_id`) REFERENCES `product_attribute` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_variant`
    ADD CONSTRAINT `fk_product_variant_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_variant_attribute`
    ADD CONSTRAINT `fk_variant_attribute_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_variant_attribute_value` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_value` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_wishlist`
    ADD CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Reset tất cả AUTO_INCREMENT
ALTER TABLE `attribute_value` AUTO_INCREMENT = 1;
ALTER TABLE `product_attribute` AUTO_INCREMENT = 1;
ALTER TABLE `product_variant` AUTO_INCREMENT = 1;
ALTER TABLE `product` AUTO_INCREMENT = 1;
ALTER TABLE `category` AUTO_INCREMENT = 1;
ALTER TABLE `user` AUTO_INCREMENT = 2;

-- Xóa dữ liệu cũ nếu có
DELETE FROM `product_variant_attribute`;
DELETE FROM `product_variant`;
DELETE FROM `attribute_value`;
DELETE FROM `product_attribute`;
DELETE FROM `product_wishlist`;
DELETE FROM `product`;
DELETE FROM `category`;
DELETE FROM `user`;

-- Thêm users
INSERT INTO `user` (`id`, `name`, `phone`, `password`, `plain_password`, `email`, `role`, `created_at`, `active`) VALUES
(0, 'Nguyễn Văn An', '0912345678', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'seller1@watchstore.com', 'seller', '2026-01-01 08:00:00', b'1'),
(2, 'Trần Thị Bình', '0923456789', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'customer1@watchstore.com', 'customer', '2026-01-01 09:00:00', b'1'),
(3, 'Lê Văn Cường', '0934567890', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'admin@watchstore.com', 'admin', '2026-01-01 10:00:00', b'1'),
(4, 'Phạm Thị Dung', '0945678901', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'seller2@watchstore.com', 'seller', '2026-01-02 08:00:00', b'1'),
(5, 'Hoàng Văn Em', '0956789012', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'customer2@watchstore.com', 'customer', '2026-01-02 09:00:00', b'1'),
(6, 'Vũ Thị Phương', '0967890123', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', NULL, 'customer3@watchstore.com', 'customer', '2026-01-02 10:00:00', b'1');

-- Thêm danh mục
INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Đồng hồ cơ tự động', 'Đồng hồ sử dụng bộ máy cơ tự động, không cần pin, vận hành bằng chuyển động cổ tay'),
(2, 'Đồng hồ thông minh', 'Smartwatch kết nối với điện thoại, theo dõi sức khỏe, thông báo thông minh'),
(3, 'Đồng hồ Quartz', 'Đồng hồ chạy pin quartz, độ chính xác cao, giá cả phải chăng'),
(4, 'Đồng hồ thể thao', 'Đồng hồ chuyên dụng cho thể thao, chống nước, chống sốc, đa chức năng'),
(5, 'Đồng hồ cao cấp', 'Đồng hồ sang trọng, đẳng cấp, chất liệu cao cấp, giá trị cao'),
(6, 'Đồng hồ thời trang', 'Đồng hồ thiết kế thời trang, hợp mốt, dành cho giới trẻ'),
(7, 'Đồng hồ đôi', 'Bộ đồng hồ cặp đôi, thiết kế đồng bộ cho nam và nữ'),
(8, 'Đồng hồ trẻ em', 'Đồng hồ thiết kế ngộ nghĩnh, an toàn cho trẻ em');

-- Sản phẩm 1: Đồng hồ cơ Seiko Presage
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(1, 'Seiko Presage Cocktail Time', 'Đồng hồ cơ tự động Seiko với mặt số sơn mài độc đáo, lấy cảm hứng từ cocktail, thiết kế thanh lịch', 1, 4.7, 1, '["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(1, 'dial_color', 'Màu mặt số', 1),
(2, 'strap_material', 'Chất liệu dây', 1),
(3, 'case_diameter', 'Đường kính vỏ', 1),
(4, 'movement', 'Bộ máy', 1);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(1, 1, 'Xanh dương'),
(2, 1, 'Đen'),
(3, 1, 'Trắng'),
(4, 1, 'Xám'),
(5, 2, 'Da cá sấu'),
(6, 2, 'Da bò Ý'),
(7, 2, 'Dây thép'),
(8, 3, '40.5mm'),
(9, 3, '38.5mm'),
(10, 4, '4R35 - Tự động'),
(11, 4, '6R15 - Tự động');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(1, 1, 'SEIKO-PRESAGE-BLUE-CROCODILE-40.5-4R35', 12500000, 8, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 10:00:00'),
(2, 1, 'SEIKO-PRESAGE-BLACK-LEATHER-38.5-4R35', 11800000, 12, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 10:00:00'),
(3, 1, 'SEIKO-PRESAGE-WHITE-STEEL-40.5-6R15', 13500000, 6, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 10:00:00'),
(4, 1, 'SEIKO-PRESAGE-GRAY-LEATHER-38.5-4R35', 12000000, 10, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 10:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(1, 1), (1, 5), (1, 8), (1, 10),
(2, 2), (2, 6), (2, 9), (2, 10),
(3, 3), (3, 7), (3, 8), (3, 11),
(4, 4), (4, 6), (4, 9), (4, 10);

-- Sản phẩm 2: Apple Watch Series 9
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(2, 'Apple Watch Series 9', 'Apple Watch thế hệ mới nhất với chip S9, màn hình Retina siêu sáng, theo dõi sức khỏe chuyên sâu', 2, 4.8, 1, '["https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1434493650001-5d43a6fea0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(5, 'case_color', 'Màu vỏ', 2),
(6, 'case_size', 'Kích thước', 2),
(7, 'band_type', 'Loại dây', 2),
(8, 'connectivity', 'Kết nối', 2);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(12, 5, 'Midnight (Nửa đêm)'),
(13, 5, 'Starlight (Ánh sao)'),
(14, 5, 'Silver (Bạc)'),
(15, 5, 'Product Red (Đỏ)'),
(16, 6, '41mm'),
(17, 6, '45mm'),
(18, 7, 'Dây thể thao'),
(19, 7, 'Dây Milanese Loop'),
(20, 7, 'Dây Leather Link'),
(21, 8, 'GPS'),
(22, 8, 'GPS + Cellular');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(5, 2, 'APPLE-WATCH-9-MIDNIGHT-41-SPORT-GPS', 12990000, 15, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 11:00:00'),
(6, 2, 'APPLE-WATCH-9-STARLIGHT-45-MILANESE-CELL', 17990000, 8, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 11:00:00'),
(7, 2, 'APPLE-WATCH-9-SILVER-41-LEATHER-GPS', 14990000, 10, 'https://images.unsplash.com/photo-1434493650001-5d43a6fea0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 11:00:00'),
(8, 2, 'APPLE-WATCH-9-RED-45-SPORT-CELL', 16990000, 12, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 11:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(5, 12), (5, 16), (5, 18), (5, 21),
(6, 13), (6, 17), (6, 19), (6, 22),
(7, 14), (7, 16), (7, 20), (7, 21),
(8, 15), (8, 17), (8, 18), (8, 22);

-- Sản phẩm 3: Casio G-Shock GA-2100
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(3, 'Casio G-Shock GA-2100', 'Đồng hồ thể thao chống sốc với thiết kế 8 cạnh độc đáo, chống nước 200m, vỏ nhựa Carbon', 4, 4.6, 1, '["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(9, 'color', 'Màu sắc', 3),
(10, 'water_resistance', 'Chống nước', 3),
(11, 'shock_resistance', 'Chống sốc', 3),
(12, 'backlight', 'Đèn nền', 3);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(23, 9, 'Đen'),
(24, 9, 'Xám khói'),
(25, 9, 'Xanh dương'),
(26, 9, 'Đỏ'),
(27, 10, '200m'),
(28, 10, '100m'),
(29, 11, 'Chống sốc G-Shock'),
(30, 12, 'LED (Super Illuminator)'),
(31, 12, 'EL (Electroluminescent)');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(9, 3, 'GSHOCK-GA2100-1A-BLACK-200M-LED', 3200000, 20, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 12:00:00'),
(10, 3, 'GSHOCK-GA2100-1A1-GRAY-200M-EL', 3400000, 15, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 12:00:00'),
(11, 3, 'GSHOCK-GA2100-2A-BLUE-100M-LED', 3000000, 18, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 12:00:00'),
(12, 3, 'GSHOCK-GA2100-4A-RED-200M-LED', 3500000, 10, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 12:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(9, 23), (9, 27), (9, 29), (9, 30),
(10, 24), (10, 27), (10, 29), (10, 31),
(11, 25), (11, 28), (11, 29), (11, 30),
(12, 26), (12, 27), (12, 29), (12, 30);

-- Sản phẩm 4: Rolex Submariner
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(4, 'Rolex Submariner Date', 'Đồng hồ lặn huyền thoại của Rolex, vỏ thép Oystersteel, chống nước 300m, bezel Cerachrom', 5, 4.9, 1, '["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(13, 'bezel_color', 'Màu bezel', 4),
(14, 'dial_color', 'Màu mặt số', 4),
(15, 'material', 'Chất liệu', 4),
(16, 'water_resistance', 'Chống nước', 4);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(32, 13, 'Xanh dương Cerachrom'),
(33, 13, 'Đen Cerachrom'),
(34, 13, 'Xanh lá Cerachrom'),
(35, 14, 'Đen'),
(36, 14, 'Xanh dương'),
(37, 14, 'Xanh lá'),
(38, 15, 'Thép Oystersteel'),
(39, 15, 'Vàng vàng'),
(40, 15, 'Vàng trắng'),
(41, 16, '300m'),
(42, 16, '100m');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(13, 4, 'ROLEX-SUBMARINER-126610-BLUE-STEEL-300', 285000000, 3, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 13:00:00'),
(14, 4, 'ROLEX-SUBMARINER-126610LN-BLACK-STEEL-300', 275000000, 5, 'https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 13:00:00'),
(15, 4, 'ROLEX-SUBMARINER-126613-GREEN-GOLD-100', 420000000, 2, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 13:00:00'),
(16, 4, 'ROLEX-SUBMARINER-126619LB-BLUE-WHITEGOLD-300', 550000000, 1, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 13:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(13, 32), (13, 36), (13, 38), (13, 41),
(14, 33), (14, 35), (14, 38), (14, 41),
(15, 34), (15, 37), (15, 39), (15, 42),
(16, 32), (16, 36), (16, 40), (16, 41);

-- Sản phẩm 5: Fossil Gen 6
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(5, 'Fossil Gen 6 Smartwatch', 'Đồng hồ thông minh chạy Wear OS, chip Snapdragon 4100+, theo dõi sức khỏe, thiết kế thời trang', 2, 4.3, 1, '["https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1434493650001-5d43a6fea0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(17, 'case_color', 'Màu vỏ', 5),
(18, 'strap_material', 'Chất liệu dây', 5),
(19, 'size', 'Kích thước', 5),
(20, 'operating_system', 'Hệ điều hành', 5);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(43, 17, 'Đen bóng'),
(44, 17, 'Bạc'),
(45, 17, 'Hồng hồng'),
(46, 18, 'Da silicone'),
(47, 18, 'Da thật'),
(48, 18, 'Dây thép'),
(49, 19, '42mm'),
(50, 19, '44mm'),
(51, 20, 'Wear OS'),
(52, 20, 'Fitbit OS');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(17, 5, 'FOSSIL-GEN6-BLACK-SILICONE-42-WEAROS', 6500000, 15, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 14:00:00'),
(18, 5, 'FOSSIL-GEN6-SILVER-LEATHER-44-WEAROS', 7200000, 10, 'https://images.unsplash.com/photo-1434493650001-5d43a6fea0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 14:00:00'),
(19, 5, 'FOSSIL-GEN6-PINK-STEEL-42-FITBIT', 6800000, 12, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 14:00:00'),
(20, 5, 'FOSSIL-GEN6-BLACK-LEATHER-44-WEAROS', 7000000, 8, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 14:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(17, 43), (17, 46), (17, 49), (17, 51),
(18, 44), (18, 47), (18, 50), (18, 51),
(19, 45), (19, 48), (19, 49), (19, 52),
(20, 43), (20, 47), (20, 50), (20, 51);

-- Sản phẩm 6: Daniel Wellington
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(6, 'Daniel Wellington Classic', 'Đồng hồ thời trang với thiết kế tối giản, mặt số mỏng, dây da cao cấp, phong cách thanh lịch', 6, 4.5, 1, '["https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(21, 'dial_color', 'Màu mặt số', 6),
(22, 'strap_color', 'Màu dây', 6),
(23, 'case_size', 'Kích thước', 6),
(24, 'case_material', 'Chất liệu vỏ', 6);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(53, 21, 'Trắng'),
(54, 21, 'Đen'),
(55, 21, 'Xanh dương'),
(56, 22, 'Nâu'),
(57, 22, 'Đen'),
(58, 22, 'Hồng'),
(59, 23, '36mm'),
(60, 23, '40mm'),
(61, 24, 'Thép mạ vàng hồng'),
(62, 24, 'Thép mạ vàng'),
(63, 24, 'Thép không gỉ');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(21, 6, 'DW-CLASSIC-WHITE-BROWN-36-ROSEGOLD', 2900000, 20, 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 15:00:00'),
(22, 6, 'DW-CLASSIC-BLACK-BLACK-40-GOLD', 3100000, 15, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 15:00:00'),
(23, 6, 'DW-CLASSIC-BLUE-PINK-36-STAINLESS', 2700000, 18, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 15:00:00'),
(24, 6, 'DW-CLASSIC-WHITE-BLACK-40-ROSEGOLD', 3000000, 12, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 15:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(21, 53), (21, 56), (21, 59), (21, 61),
(22, 54), (22, 57), (22, 60), (22, 62),
(23, 55), (23, 58), (23, 59), (23, 63),
(24, 53), (24, 57), (24, 60), (24, 61);

-- Sản phẩm 7: Đồng hồ đôi Michael Kors
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(7, 'Michael Kors Couple Set', 'Bộ đồng hồ cặp đôi Michael Kors, thiết kế đồng bộ cho nam và nữ, sang trọng, lịch lãm', 7, 4.4, 1, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(25, 'set_type', 'Loại bộ', 7),
(26, 'main_color', 'Màu chủ đạo', 7),
(27, 'dial_style', 'Kiểu mặt số', 7),
(28, 'includes', 'Bao gồm', 7);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(64, 25, 'Bộ nam nữ'),
(65, 25, 'Bộ nữ'),
(66, 25, 'Bộ nam'),
(67, 26, 'Đen và vàng'),
(68, 26, 'Bạc và trắng'),
(69, 26, 'Hồng và vàng hồng'),
(70, 27, 'Mặt số kim cương'),
(71, 27, 'Mặt số đơn giản'),
(72, 27, 'Mặt số chronograph'),
(73, 28, '2 đồng hồ + hộp quà'),
(74, 28, '1 đồng hồ + hộp quà');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(25, 7, 'MK-COUPLE-BLACKGOLD-DIAMOND-2SET', 11500000, 8, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 16:00:00'),
(26, 7, 'MK-COUPLE-SILVER-SIMPLE-2SET', 9800000, 10, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 16:00:00'),
(27, 7, 'MK-LADIES-PINKROSE-CHRONO-1SET', 6500000, 15, 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 16:00:00'),
(28, 7, 'MK-MENS-BLACKGOLD-SIMPLE-1SET', 6200000, 12, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 16:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(25, 64), (25, 67), (25, 70), (25, 73),
(26, 64), (26, 68), (26, 71), (26, 73),
(27, 65), (27, 69), (27, 72), (27, 74),
(28, 66), (28, 67), (28, 71), (28, 74);

-- Sản phẩm 8: Đồng hồ trẻ em Disney
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(8, 'Disney Kids Watch', 'Đồng hồ trẻ em với hình ảnh nhân vật Disney, dây silicone an toàn, chống nước cơ bản', 8, 4.2, 1, '["https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(29, 'character', 'Nhân vật', 8),
(30, 'strap_color', 'Màu dây', 8),
(31, 'size', 'Kích thước', 8),
(32, 'water_resistance', 'Chống nước', 8);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(75, 29, 'Mickey Mouse'),
(76, 29, 'Minnie Mouse'),
(77, 29, 'Elsa (Frozen)'),
(78, 29, 'Spider-Man'),
(79, 30, 'Đỏ'),
(80, 30, 'Hồng'),
(81, 30, 'Xanh dương'),
(82, 30, 'Đen'),
(83, 31, 'Nhỏ (5-8 tuổi)'),
(84, 31, 'Vừa (8-12 tuổi)'),
(85, 32, '30m (3ATM)'),
(86, 32, '50m (5ATM)');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(29, 8, 'DISNEY-MICKEY-RED-SMALL-30M', 850000, 25, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 17:00:00'),
(30, 8, 'DISNEY-MINNIE-PINK-MEDIUM-50M', 950000, 20, 'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 17:00:00'),
(31, 8, 'DISNEY-ELSA-BLUE-SMALL-30M', 900000, 18, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 17:00:00'),
(32, 8, 'DISNEY-SPIDERMAN-BLACK-MEDIUM-50M', 1000000, 15, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 17:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(29, 75), (29, 79), (29, 83), (29, 85),
(30, 76), (30, 80), (30, 84), (30, 86),
(31, 77), (31, 81), (31, 83), (31, 85),
(32, 78), (32, 82), (32, 84), (32, 86);

-- Sản phẩm 9: Omega Speedmaster
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(9, 'Omega Speedmaster Moonwatch', 'Đồng hồ chronograph huyền thoại, đã lên mặt trăng, máy cơ Co-Axial Master Chronometer', 5, 4.8, 1, '["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(33, 'dial_color', 'Màu mặt số', 9),
(34, 'strap_type', 'Loại dây', 9),
(35, 'movement', 'Bộ máy', 9),
(36, 'limited_edition', 'Phiên bản giới hạn', 9);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(87, 33, 'Đen'),
(88, 33, 'Trắng'),
(89, 33, 'Xanh dương'),
(90, 34, 'Dây da NATO'),
(91, 34, 'Dây thép'),
(92, 34, 'Dây da cá sấu'),
(93, 35, '3861 - Co-Axial'),
(94, 35, '1861 - Manual'),
(95, 36, 'Có'),
(96, 36, 'Không');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(33, 9, 'OMEGA-SPEEDY-BLACK-NATO-3861-LIMITED', 185000000, 4, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 18:00:00'),
(34, 9, 'OMEGA-SPEEDY-WHITE-STEEL-3861-REGULAR', 175000000, 6, 'https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 18:00:00'),
(35, 9, 'OMEGA-SPEEDY-BLUE-CROCODILE-1861-LIMITED', 195000000, 3, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 18:00:00'),
(36, 9, 'OMEGA-SPEEDY-BLACK-STEEL-3861-REGULAR', 170000000, 8, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 18:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(33, 87), (33, 90), (33, 93), (33, 95),
(34, 88), (34, 91), (34, 93), (34, 96),
(35, 89), (35, 92), (35, 94), (35, 95),
(36, 87), (36, 91), (36, 93), (36, 96);

-- Sản phẩm 10: Citizen Eco-Drive
INSERT INTO `product` (`id`, `name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
(10, 'Citizen Eco-Drive Promaster', 'Đồng hồ sử dụng công nghệ Eco-Drive, sạc bằng ánh sáng, không cần thay pin, chống nước 200m', 3, 4.6, 1, '["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80');

INSERT INTO `product_attribute` (`id`, `field_name`, `name`, `product_id`) VALUES
(37, 'dial_color', 'Màu mặt số', 10),
(38, 'strap_type', 'Loại dây', 10),
(39, 'water_resistance', 'Chống nước', 10),
(40, 'power_source', 'Nguồn năng lượng', 10);

INSERT INTO `attribute_value` (`id`, `attribute_id`, `value`) VALUES
(97, 37, 'Đen'),
(98, 37, 'Xanh dương'),
(99, 37, 'Xanh lá'),
(100, 38, 'Dây thép'),
(101, 38, 'Dây nylon'),
(102, 38, 'Dây silicone'),
(103, 39, '100m'),
(104, 39, '200m'),
(105, 39, '300m'),
(106, 40, 'Eco-Drive (Ánh sáng)'),
(107, 40, 'Pin thường');

INSERT INTO `product_variant` (`id`, `product_id`, `sku`, `price`, `stock`, `image`, `created_at`) VALUES
(37, 10, 'CITIZEN-ECODRIVE-BLACK-STEEL-200M-ECO', 8500000, 12, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 19:00:00'),
(38, 10, 'CITIZEN-ECODRIVE-BLUE-NYLON-100M-ECO', 7800000, 15, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 19:00:00'),
(39, 10, 'CITIZEN-ECODRIVE-GREEN-SILICONE-300M-ECO', 9200000, 8, 'https://images.unsplash.com/photo-1547996160-81bc6daa4b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 19:00:00'),
(40, 10, 'CITIZEN-ECODRIVE-BLACK-STEEL-100M-BATTERY', 6500000, 10, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', '2026-01-03 19:00:00');

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(37, 97), (37, 100), (37, 104), (37, 106),
(38, 98), (38, 101), (38, 103), (38, 106),
(39, 99), (39, 102), (39, 105), (39, 106),
(40, 97), (40, 100), (40, 103), (40, 107);

-- Thêm wishlist cho users
INSERT INTO `product_wishlist` (`user_id`, `product_id`, `created_at`) VALUES
(2, 1, '2026-01-04 09:00:00'),
(2, 3, '2026-01-04 09:15:00'),
(2, 5, '2026-01-04 09:30:00'),
(5, 2, '2026-01-04 10:00:00'),
(5, 6, '2026-01-04 10:15:00'),
(5, 9, '2026-01-04 10:30:00'),
(6, 4, '2026-01-04 11:00:00'),
(6, 7, '2026-01-04 11:15:00'),
(6, 8, '2026-01-04 11:30:00'),
(3, 1, '2026-01-04 12:00:00'),
(3, 9, '2026-01-04 12:15:00'),
(3, 10, '2026-01-04 12:30:00');

-- Cập nhật AUTO_INCREMENT cho lần insert tiếp theo
ALTER TABLE `attribute_value` AUTO_INCREMENT = 108;
ALTER TABLE `product_attribute` AUTO_INCREMENT = 41;
ALTER TABLE `product_variant` AUTO_INCREMENT = 41;
ALTER TABLE `product` AUTO_INCREMENT = 11;
ALTER TABLE `category` AUTO_INCREMENT = 9;
ALTER TABLE `user` AUTO_INCREMENT = 7;

CREATE INDEX `idx_product_name` ON `product` (`name`);
CREATE INDEX `idx_product_price` ON `product_variant` (`price`);
CREATE INDEX `idx_product_stock` ON `product_variant` (`stock`);
CREATE INDEX `idx_user_role` ON `user` (`role`);
CREATE INDEX `idx_category_name` ON `category` (`name`);