SET SQL_SAFE_UPDATES = 0;

-- Tạo bảng category nếu chưa có
CREATE TABLE IF NOT EXISTS `category` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(200) DEFAULT NULL,
    `description` text,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
INSERT INTO `user` (`name`, `phone`, `password`, `email`, `role`, `created_at`, `active`) VALUES
('Nguyễn Văn An', '0912345678', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'seller1@watchstore.com', 'seller', '2026-01-01 08:00:00', b'1'),
('Trần Thị Bình', '0923456789', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'customer1@watchstore.com', 'customer', '2026-01-01 09:00:00', b'1'),
('Lê Văn Cường', '0934567890', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'admin@watchstore.com', 'admin', '2026-01-01 10:00:00', b'1'),
('Phạm Thị Dung', '0945678901', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'seller2@watchstore.com', 'seller', '2026-01-02 08:00:00', b'1'),
('Hoàng Văn Em', '0956789012', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'customer2@watchstore.com', 'customer', '2026-01-02 09:00:00', b'1'),
('Vũ Thị Phương', '0967890123', '$2a$10$K/4XOPSt1cpo4a1SNiXTS.YMQEZtm79WImFwWjIPkYyAw6zWkfMVy', 'customer3@watchstore.com', 'customer', '2026-01-02 10:00:00', b'1');

-- Thêm danh mục
INSERT INTO `category` (`name`, `description`) VALUES
('Đồng hồ cơ tự động', 'Đồng hồ sử dụng bộ máy cơ tự động, không cần pin, vận hành bằng chuyển động cổ tay'),
('Đồng hồ thông minh', 'Smartwatch kết nối với điện thoại, theo dõi sức khỏe, thông báo thông minh'),
('Đồng hồ Quartz', 'Đồng hồ chạy pin quartz, độ chính xác cao, giá cả phải chăng'),
('Đồng hồ thể thao', 'Đồng hồ chuyên dụng cho thể thao, chống nước, chống sốc, đa chức năng'),
('Đồng hồ cao cấp', 'Đồng hồ sang trọng, đẳng cấp, chất liệu cao cấp, giá trị cao'),
('Đồng hồ thời trang', 'Đồng hồ thiết kế thời trang, hợp mốt, dành cho giới trẻ'),
('Đồng hồ đôi', 'Bộ đồng hồ cặp đôi, thiết kế đồng bộ cho nam và nữ'),
('Đồng hồ trẻ em', 'Đồng hồ thiết kế ngộ nghĩnh, an toàn cho trẻ em');

-- Sử dụng các URL ảnh được cung cấp
SET @image1 = 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image2 = 'https://images.unsplash.com/photo-1691865179028-1729b766a5cd?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image3 = 'https://images.unsplash.com/photo-1745305023239-b476a0faa159?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image4 = 'https://images.unsplash.com/photo-1638872726444-0579101a60e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image5 = 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image6 = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image7 = 'https://images.unsplash.com/photo-1466684921455-ee202d43c1aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image8 = 'https://images.unsplash.com/photo-1696430257997-470acf236b1b?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image9 = 'https://images.unsplash.com/photo-1618151444381-4ee6c3b2205a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image10 = 'https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image11 = 'https://images.unsplash.com/photo-1661030418924-52142661241d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image12 = 'https://images.unsplash.com/photo-1611353229530-f17036b8479a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image13 = 'https://images.unsplash.com/photo-1587466412525-87497b34fc88?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image14 = 'https://images.unsplash.com/photo-1670404160620-a3a86428560e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
SET @image15 = 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

-- Thumbnail mẫu
SET @thumbnail = null;

-- Sản phẩm 1: Đồng hồ cơ Seiko Presage (2 màu: Xanh dương và Đen)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Seiko Presage Cocktail Time', 'Đồng hồ cơ tự động Seiko với mặt số sơn mài độc đáo, lấy cảm hứng từ cocktail, thiết kế thanh lịch', 1, 4.7, 1, CONCAT('["', @image1, '","', @image2, '","', @image3, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('dial_color', 'Màu mặt số', 1),
('strap_material', 'Chất liệu dây', 1),
('case_diameter', 'Đường kính vỏ', 1);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(1, 'Xanh dương'),
(1, 'Đen'),
(2, 'Da cá sấu'),
(2, 'Da bò Ý'),
(3, '40.5mm'),
(3, '38.5mm');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(1, 'SEIKO-PRESAGE-BLUE-CROCODILE-40.5', 12500000, 13500000, 8, @image1),
(1, 'SEIKO-PRESAGE-BLACK-LEATHER-38.5', 11800000, 12800000, 12, @image2),
(1, 'SEIKO-PRESAGE-BLUE-LEATHER-40.5', 12000000, 13000000, 10, @image3),
(1, 'SEIKO-PRESAGE-BLACK-CROCODILE-38.5', 11500000, 12500000, 6, @image4);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(1, 1), (1, 3), (1, 5),
(2, 2), (2, 4), (2, 6),
(3, 1), (3, 4), (3, 5),
(4, 2), (4, 3), (4, 6);

-- Sản phẩm 2: Apple Watch Series 9 (2 màu: Midnight và Starlight)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Apple Watch Series 9', 'Apple Watch thế hệ mới nhất với chip S9, màn hình Retina siêu sáng, theo dõi sức khỏe chuyên sâu', 2, 4.8, 1, CONCAT('["', @image5, '","', @image6, '","', @image7, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('case_color', 'Màu vỏ', 2),
('case_size', 'Kích thước', 2),
('band_type', 'Loại dây', 2);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(4, 'Midnight (Nửa đêm)'),
(4, 'Starlight (Ánh sao)'),
(5, '41mm'),
(5, '45mm'),
(6, 'Dây thể thao'),
(6, 'Dây Milanese Loop');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(2, 'APPLE-WATCH-9-MIDNIGHT-41-SPORT', 12990000, 13990000, 15, @image5),
(2, 'APPLE-WATCH-9-STARLIGHT-45-MILANESE', 17990000, 18990000, 8, @image6),
(2, 'APPLE-WATCH-9-MIDNIGHT-45-SPORT', 13990000, 14990000, 12, @image7),
(2, 'APPLE-WATCH-9-STARLIGHT-41-MILANESE', 16990000, 17990000, 10, @image8);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(5, 7), (5, 9), (5, 11),
(6, 8), (6, 10), (6, 12),
(7, 7), (7, 10), (7, 11),
(8, 8), (8, 9), (8, 12);

-- Sản phẩm 3: Casio G-Shock GA-2100 (2 màu: Đen và Xám)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Casio G-Shock GA-2100', 'Đồng hồ thể thao chống sốc với thiết kế 8 cạnh độc đáo, chống nước 200m, vỏ nhựa Carbon', 4, 4.6, 1, CONCAT('["', @image9, '","', @image10, '","', @image11, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('color', 'Màu sắc', 3),
('water_resistance', 'Chống nước', 3),
('shock_resistance', 'Chống sốc', 3);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(7, 'Đen'),
(7, 'Xám khói'),
(8, '200m'),
(8, '100m'),
(9, 'Chống sốc G-Shock');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(3, 'GSHOCK-GA2100-1A-BLACK-200M', 3200000, 3800000, 20, @image9),
(3, 'GSHOCK-GA2100-1A1-GRAY-200M', 3400000, 4000000, 15, @image10),
(3, 'GSHOCK-GA2100-1A-BLACK-100M', 3000000, 3600000, 18, @image11),
(3, 'GSHOCK-GA2100-1A1-GRAY-100M', 3100000, 3700000, 12, @image12);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(9, 13), (9, 15), (9, 17),
(10, 14), (10, 15), (10, 17),
(11, 13), (11, 16), (11, 17),
(12, 14), (12, 16), (12, 17);

-- Sản phẩm 4: Rolex Submariner (2 màu: Xanh dương và Đen)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Rolex Submariner Date', 'Đồng hồ lặn huyền thoại của Rolex, vỏ thép Oystersteel, chống nước 300m, bezel Cerachrom', 5, 4.9, 1, CONCAT('["', @image13, '","', @image14, '","', @image15, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('bezel_color', 'Màu bezel', 4),
('dial_color', 'Màu mặt số', 4),
('material', 'Chất liệu', 4);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(10, 'Xanh dương Cerachrom'),
(10, 'Đen Cerachrom'),
(11, 'Đen'),
(11, 'Xanh dương'),
(12, 'Thép Oystersteel'),
(12, 'Vàng vàng');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(4, 'ROLEX-SUBMARINER-BLUE-STEEL', 285000000, 295000000, 3, @image13),
(4, 'ROLEX-SUBMARINER-BLACK-STEEL', 275000000, 285000000, 5, @image14),
(4, 'ROLEX-SUBMARINER-BLUE-GOLD', 420000000, 440000000, 2, @image15),
(4, 'ROLEX-SUBMARINER-BLACK-GOLD', 400000000, 420000000, 4, @image1);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(13, 18), (13, 21), (13, 23),
(14, 19), (14, 20), (14, 23),
(15, 18), (15, 21), (15, 24),
(16, 19), (16, 20), (16, 24);

-- Sản phẩm 5: Fossil Gen 6 Smartwatch (2 màu: Đen và Bạc)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Fossil Gen 6 Smartwatch', 'Đồng hồ thông minh chạy Wear OS, chip Snapdragon 4100+, theo dõi sức khỏe, thiết kế thời trang', 2, 4.3, 1, CONCAT('["', @image2, '","', @image3, '","', @image4, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('case_color', 'Màu vỏ', 5),
('strap_material', 'Chất liệu dây', 5),
('size', 'Kích thước', 5);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(13, 'Đen bóng'),
(13, 'Bạc'),
(14, 'Da silicone'),
(14, 'Da thật'),
(15, '42mm'),
(15, '44mm');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(5, 'FOSSIL-GEN6-BLACK-SILICONE-42', 6500000, 7500000, 15, @image2),
(5, 'FOSSIL-GEN6-SILVER-LEATHER-44', 7200000, 8200000, 10, @image3),
(5, 'FOSSIL-GEN6-BLACK-LEATHER-42', 6800000, 7800000, 12, @image4),
(5, 'FOSSIL-GEN6-SILVER-SILICONE-44', 7000000, 8000000, 8, @image5);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(17, 25), (17, 27), (17, 29),
(18, 26), (18, 28), (18, 30),
(19, 25), (19, 28), (19, 29),
(20, 26), (20, 27), (20, 30);

-- Sản phẩm 6: Daniel Wellington Classic (2 màu: Trắng và Đen)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Daniel Wellington Classic', 'Đồng hồ thời trang với thiết kế tối giản, mặt số mỏng, dây da cao cấp, phong cách thanh lịch', 6, 4.5, 1, CONCAT('["', @image6, '","', @image7, '","', @image8, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('dial_color', 'Màu mặt số', 6),
('strap_color', 'Màu dây', 6),
('case_size', 'Kích thước', 6);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(16, 'Trắng'),
(16, 'Đen'),
(17, 'Nâu'),
(17, 'Đen'),
(18, '36mm'),
(18, '40mm');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(6, 'DW-CLASSIC-WHITE-BROWN-36', 2900000, 3500000, 20, @image6),
(6, 'DW-CLASSIC-BLACK-BLACK-40', 3100000, 3700000, 15, @image7),
(6, 'DW-CLASSIC-WHITE-BLACK-36', 2700000, 3300000, 18, @image8),
(6, 'DW-CLASSIC-BLACK-BROWN-40', 3000000, 3600000, 12, @image9);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(21, 31), (21, 33), (21, 35),
(22, 32), (22, 34), (22, 36),
(23, 31), (23, 34), (23, 35),
(24, 32), (24, 33), (24, 36);

-- Sản phẩm 7: Đồng hồ cơ Orient Bambino (2 màu: Trắng và Đen)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Đồng hồ cơ Orient Bambino', 'Đồng hồ cơ tự động Orient với thiết kế cổ điển, mặt số trắng, kim xanh, vỏ thép mạ vàng', 1, 4.4, 1, CONCAT('["', @image10, '","', @image11, '","', @image12, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('dial_color', 'Màu mặt số', 7),
('strap_type', 'Loại dây', 7),
('case_diameter', 'Đường kính vỏ', 7);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(19, 'Trắng'),
(19, 'Đen'),
(20, 'Da bò'),
(20, 'Dây thép'),
(21, '40mm'),
(21, '42mm');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(7, 'ORIENT-BAMBINO-WHITE-LEATHER-40', 4500000, 5200000, 15, @image10),
(7, 'ORIENT-BAMBINO-BLACK-STEEL-42', 4800000, 5500000, 10, @image11),
(7, 'ORIENT-BAMBINO-WHITE-STEEL-40', 4600000, 5300000, 8, @image12),
(7, 'ORIENT-BAMBINO-BLACK-LEATHER-42', 4700000, 5400000, 12, @image13);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(25, 37), (25, 39), (25, 41),
(26, 38), (26, 40), (26, 42),
(27, 37), (27, 40), (27, 41),
(28, 38), (28, 39), (28, 42);

-- Sản phẩm 8: Samsung Galaxy Watch 6 (2 màu: Đen và Bạc)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Samsung Galaxy Watch 6', 'Smartwatch Samsung mới nhất với màn hình Super AMOLED, theo dõi sức khỏe toàn diện', 2, 4.6, 1, CONCAT('["', @image14, '","', @image15, '","', @image1, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('case_color', 'Màu vỏ', 8),
('band_color', 'Màu dây', 8),
('size', 'Kích thước', 8);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(22, 'Đen'),
(22, 'Bạc'),
(23, 'Nâu'),
(23, 'Đen'),
(24, '40mm'),
(24, '44mm');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(8, 'SAMSUNG-WATCH6-BLACK-BLACK-40', 7990000, 8990000, 20, @image14),
(8, 'SAMSUNG-WATCH6-SILVER-BROWN-44', 8490000, 9490000, 15, @image15),
(8, 'SAMSUNG-WATCH6-BLACK-BROWN-40', 8190000, 9190000, 18, @image1),
(8, 'SAMSUNG-WATCH6-SILVER-BLACK-44', 8290000, 9290000, 12, @image2);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(29, 43), (29, 45), (29, 47),
(30, 44), (30, 46), (30, 48),
(31, 43), (31, 46), (31, 47),
(32, 44), (32, 45), (32, 48);

-- Sản phẩm 9: Đồng hồ thể thao Tissot T-Sport (2 màu: Đen và Xanh)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Đồng hồ thể thao Tissot T-Sport', 'Đồng hồ thể thao Tissot với khả năng chống nước 100m, chống sốc, thiết kế năng động', 4, 4.5, 1, CONCAT('["', @image3, '","', @image4, '","', @image5, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('color', 'Màu sắc', 9),
('water_resistance', 'Chống nước', 9),
('case_material', 'Chất liệu vỏ', 9);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(25, 'Đen'),
(25, 'Xanh dương'),
(26, '100m'),
(26, '200m'),
(27, 'Thép không gỉ'),
(27, 'Nhựa cao cấp');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(9, 'TISSOT-TSPORT-BLACK-100M-STEEL', 7500000, 8500000, 12, @image3),
(9, 'TISSOT-TSPORT-BLUE-200M-PLASTIC', 6800000, 7800000, 18, @image4),
(9, 'TISSOT-TSPORT-BLACK-200M-STEEL', 7800000, 8800000, 10, @image5),
(9, 'TISSOT-TSPORT-BLUE-100M-PLASTIC', 6500000, 7500000, 15, @image6);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(33, 49), (33, 51), (33, 53),
(34, 50), (34, 52), (34, 54),
(35, 49), (35, 52), (35, 53),
(36, 50), (36, 51), (36, 54);

-- Sản phẩm 10: Đồng hồ thời trang Michael Kors (2 màu: Đen và Hồng)
INSERT INTO `product` (`name`, `description`, `category_id`, `avg_rating`, `active`, `image`, `thumbnail`) VALUES
('Đồng hồ thời trang Michael Kors', 'Đồng hồ thời trang Michael Kors với mặt số lớn, kim dát vàng, dây da cao cấp', 6, 4.3, 1, CONCAT('["', @image7, '","', @image8, '","', @image9, '"]'), @thumbnail);

INSERT INTO `product_attribute` (`field_name`, `name`, `product_id`) VALUES
('dial_style', 'Kiểu mặt số', 10),
('gem_stones', 'Đá quý', 10),
('strap_color', 'Màu dây', 10);

INSERT INTO `attribute_value` (`attribute_id`, `value`) VALUES
(28, 'Đơn giản'),
(28, 'Chronograph'),
(29, 'Có kim cương'),
(29, 'Không có đá quý'),
(30, 'Đen'),
(30, 'Hồng');

INSERT INTO `product_variant` (`product_id`, `sku`, `price`, `original_price`, `stock`, `image`) VALUES
(10, 'MICHAEL-KORS-SIMPLE-NOGEM-BLACK', 3200000, 3900000, 25, @image7),
(10, 'MICHAEL-KORS-CHRONO-DIAMOND-PINK', 5500000, 6500000, 8, @image8),
(10, 'MICHAEL-KORS-SIMPLE-DIAMOND-BLACK', 4500000, 5500000, 12, @image9),
(10, 'MICHAEL-KORS-CHRONO-NOGEM-PINK', 3800000, 4800000, 18, @image10);

INSERT INTO `product_variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(37, 55), (37, 57), (37, 59),
(38, 56), (38, 58), (38, 60),
(39, 55), (39, 58), (39, 59),
(40, 56), (40, 57), (40, 60);

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

-- Tạo indexes
CREATE INDEX `idx_product_name` ON `product` (`name`);
CREATE INDEX `idx_product_price` ON `product_variant` (`price`);
CREATE INDEX `idx_product_stock` ON `product_variant` (`stock`);
CREATE INDEX `idx_user_role` ON `user` (`role`);
CREATE INDEX `idx_category_name` ON `category` (`name`);

SET SQL_SAFE_UPDATES = 1;