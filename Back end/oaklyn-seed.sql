USE oaklyn;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE product_variant_attribute;
TRUNCATE TABLE product_variant;
TRUNCATE TABLE attribute_value;
TRUNCATE TABLE product_attribute;
TRUNCATE TABLE product;
TRUNCATE TABLE category;
SET FOREIGN_KEY_CHECKS = 1;

START TRANSACTION;

-- 1. DANH MỤC (Premium Categories)
INSERT INTO category (id, name, description) VALUES
                                                 (1, 'Bàn', 'Bàn làm việc cao cấp, bàn ăn mặt đá, bàn trà tinh tế'),
                                                 (2, 'Ghế', 'Ghế sofa da thật, ghế công thái học, ghế lounge'),
                                                 (3, 'Giường', 'Giường ngủ bọc nệm, giường gỗ óc chó cao cấp'),
                                                 (4, 'Tủ', 'Tủ quần áo thông minh, kệ tivi trang trí');

-- 2. DANH SÁCH 50 SẢN PHẨM SANG TRỌNG
INSERT INTO product (id, name, description, category_id, avg_rating, active, image, thumbnail) VALUES
                                                                                                   (1, 'Bàn Ăn Marble Carrara', 'Mặt đá cẩm thạch Ý, chân inox mạ vàng Gold', 1, 4.9, 1, '["https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800"]', 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200'),
                                                                                                   (2, 'Ghế Sofa Velvet Cloud', 'Vải nhung mềm mại, phong cách Pháp', 2, 4.8, 1, '["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'),
                                                                                                   (3, 'Giường Grande Walnut', 'Gỗ óc chó tự nhiên, đầu giường bọc da bò', 3, 5.0, 1, '["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"]', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=200'),
                                                                                                   (4, 'Tủ Áo Crystal Glass', 'Hệ tủ cánh kính lùa, tích hợp đèn LED', 4, 4.7, 1, '["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200'),
                                                                                                   (5, 'Bàn Làm Việc Executive', 'Mặt bàn sơn mài đen nhám, tối giản', 1, 4.6, 1, '["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"]', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200'),
                                                                                                   (6, 'Ghế Lounge Eames Classic', 'Gỗ sồi phối da đen, biểu tượng Luxury', 2, 4.9, 1, '["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800"]', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200'),
                                                                                                   (7, 'Bàn Trà Eclipse Gold', 'Bộ đôi bàn trà tròn lồng nhau mạ vàng', 1, 4.5, 1, '["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800"]', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=200'),
                                                                                                   (8, 'Giường Royal Velvet', 'Xanh Navy huyền bí, chân giường ẩn', 3, 4.8, 1, '["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"]', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200'),
                                                                                                   (9, 'Ghế Xoay President', 'Da thật 100%, khung gỗ óc chó cao cấp', 2, 5.0, 1, '["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800"]', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200'),
                                                                                                   (10, 'Ghế Ăn Grace Leather', 'Thiết kế Emmanuel Gallina, bọc da Nappa', 2, 4.7, 1, '["https://images.unsplash.com/photo-1503602642458-232111445657?w=800"]', 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200'),
                                                                                                   (11, 'Ghế Bập Bênh Relax', 'Thiết kế công thái học, nệm vải nỉ', 2, 4.6, 1, '["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800"]', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200'),
                                                                                                   (12, 'Ghế Bar Industrial Gold', 'Chân kim loại mạ PVD Gold sang trọng', 2, 4.5, 1, '["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800"]', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200'),
                                                                                                   (13, 'Ghế Đôn Pouf Velvet', 'Phụ kiện trang trí nhung cao cấp', 2, 4.4, 1, '["https://images.unsplash.com/photo-1562113500-579e977013ff?w=800"]', 'https://images.unsplash.com/photo-1562113500-579e977013ff?w=200'),
                                                                                                   (14, 'Ghế Sofa Corner L-Shape', 'Kích thước lớn cho Penthouse', 2, 4.9, 1, '["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'),
                                                                                                   (15, 'Giường Bay FloatBed LED', 'Hệ thống LED gầm giường hiện đại', 3, 5.0, 1, '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=200'),
                                                                                                   (16, 'Giường Tầng Castle Home', 'Gỗ sồi Nga, thiết kế lâu đài trẻ em', 3, 4.8, 1, '["https://images.unsplash.com/photo-1505693413171-293669746a57?w=800"]', 'https://images.unsplash.com/photo-1505693413171-293669746a57?w=200'),
                                                                                                   (17, 'Giường Japandi Zen', 'Sự kết hợp Nhật Bản và Scandinavia', 3, 4.7, 1, '["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"]', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200'),
                                                                                                   (18, 'Giường Nệm Royal Silk', 'Vải bọc lụa cao cấp, tân cổ điển', 3, 4.9, 1, '["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"]', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200'),
                                                                                                   (19, 'Giường Single Studio', 'Nhỏ gọn tinh tế, ngăn kéo ẩn', 3, 4.3, 1, '["https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800"]', 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=200'),
                                                                                                   (20, 'Tủ Rượu vang Heritage', 'Làm mát chuyên dụng, kính chống UV', 4, 5.0, 1, '["https://images.unsplash.com/photo-1610492166683-1628d32d03a1?w=800"]', 'https://images.unsplash.com/photo-1610492166683-1628d32d03a1?w=200'),
                                                                                                   (21, 'Tủ Sách Library Gold', 'Khung kim loại PVD phối gỗ óc chó', 4, 4.8, 1, '["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800"]', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=200'),
                                                                                                   (22, 'Tủ Giày Air Purifier', 'Khử mùi Ozone hiện đại', 4, 4.7, 1, '["https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800"]', 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=200'),
                                                                                                   (23, 'Kệ Tivi Infinity Wall', 'Mặt kính cường lực đen mờ cao cấp', 4, 4.6, 1, '["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800"]', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200'),
                                                                                                   (24, 'Bàn Trang Điểm Muse', 'Gương xoay 360, sạc không dây', 1, 4.8, 1, '["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"]', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200'),
                                                                                                   (25, 'Bàn Họp Director Board', 'Gỗ nguyên tấm 3m cực kỳ uy quyền', 1, 4.9, 1, '["https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800"]', 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=200'),
                                                                                                   (26, 'Ghế Ăn Wishbone Classic', 'Biểu tượng gỗ tần bì Hans Wegner', 2, 4.7, 1, '["https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=800"]', 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=200'),
                                                                                                   (27, 'Giường Ottoman Storage', 'Hệ thống nâng thủy lực thông minh', 3, 4.5, 1, '["https://images.unsplash.com/photo-1505693413171-293669746a57?w=800"]', 'https://images.unsplash.com/photo-1505693413171-293669746a57?w=200'),
                                                                                                   (28, 'Tủ Áo Walk-in Closet', 'Hệ tủ không cánh sang trọng', 4, 5.0, 1, '["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200'),
                                                                                                   (29, 'Bàn Cafe Tulip Marble', 'Mặt đá Marble, chân trụ nghệ thuật', 1, 4.6, 1, '["https://images.unsplash.com/photo-1544450531-13c9d9c820ca?w=800"]', 'https://images.unsplash.com/photo-1544450531-13c9d9c820ca?w=200'),
                                                                                                   (30, 'Ghế Sofa Bed Harmony', 'Nệm lò xo túi, linh hoạt sử dụng', 2, 4.4, 1, '["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"]', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200'),
                                                                                                   (31, 'Bàn Console Tiền Sảnh', 'Inox mạ PVD, mặt kính đen', 1, 4.7, 1, '["https://images.unsplash.com/photo-1581404476143-fb31d7429255?w=800"]', 'https://images.unsplash.com/photo-1581404476143-fb31d7429255?w=200'),
                                                                                                   (32, 'Bàn Làm Việc SmartDesk', 'Nâng hạ độ cao tự động Smart-Home', 1, 4.9, 1, '["https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800"]', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=200'),
                                                                                                   (33, 'Ghế Bành Reading Nook', 'Đệm lông cừu nhân tạo siêu mềm', 2, 4.8, 1, '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"]', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200'),
                                                                                                   (34, 'Giường Gỗ Tràm Mosaic', 'Họa tiết gỗ ghép Mosaic độc bản', 3, 4.4, 1, '["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"]', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200'),
                                                                                                   (35, 'Tủ Locker Wood Vintage', 'Phong cách hoài cổ cao cấp', 4, 4.2, 1, '["https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800"]', 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=200'),
                                                                                                   (36, 'Bàn Ăn Xoay Smart-Stone', 'Mặt đá Ceramic chống xước mở rộng', 1, 4.9, 1, '["https://images.unsplash.com/photo-1530018607912-eff2df11a21c?w=800"]', 'https://images.unsplash.com/photo-1530018607912-eff2df11a21c?w=200'),
                                                                                                   (37, 'Ghế Lounge Eames Da Bò', 'Phiên bản giới hạn da bò Ý', 2, 5.0, 1, '["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800"]', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200'),
                                                                                                   (38, 'Tủ Bếp Treo Crystal', 'Acrylic bóng gương chống nước', 4, 4.7, 1, '["https://images.unsplash.com/photo-1556912177-450034574e57?w=800"]', 'https://images.unsplash.com/photo-1556912177-450034574e57?w=200'),
                                                                                                   (39, 'Giường Nhật Minimalist', 'Thiết kế bệt gỗ sáng tinh tế', 3, 4.6, 1, '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=200'),
                                                                                                   (40, 'Bàn Trà Eclipse Silver', 'Mặt kính màu trà, khung inox bạc', 1, 4.8, 1, '["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800"]', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=200'),
                                                                                                   (41, 'Ghế Sofa Velvet Rosé', 'Màu hồng tro sang trọng quyến rũ', 2, 4.9, 1, '["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800"]', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200'),
                                                                                                   (42, 'Tủ Luna Nightstand', 'Tích hợp đèn ngủ và sạc USB', 4, 4.5, 1, '["https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800"]', 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=200'),
                                                                                                   (43, 'Bàn Urban Industrial', 'Gỗ thông phối sắt sơn mài', 1, 4.4, 1, '["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"]', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200'),
                                                                                                   (44, 'Ghế Ergonomic Pro', 'Hỗ trợ thắt lưng đa điểm cực tốt', 2, 4.8, 1, '["https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800"]', 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=200'),
                                                                                                   (45, 'Giường Tầng Slide Lux', 'Kết hợp cầu trượt gỗ cao cấp', 3, 4.7, 1, '["https://images.unsplash.com/photo-1505693413171-293669746a57?w=800"]', 'https://images.unsplash.com/photo-1505693413171-293669746a57?w=200'),
                                                                                                   (46, 'Tủ Sách X-Frame Oak', 'Gỗ sồi khối, thiết kế nghệ thuật', 4, 4.5, 1, '["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800"]', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=200'),
                                                                                                   (47, 'Bàn Trang Điểm Infinity', 'Mạ vàng hồng Rosé Gold Luxury', 1, 4.8, 1, '["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"]', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200'),
                                                                                                   (48, 'Ghế Sofa Đơn Nordic', 'Vải bố Canvas dệt kim cao cấp', 2, 4.6, 1, '["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800"]', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200'),
                                                                                                   (49, 'Giường Grande Walnut Pro', 'Gỗ óc chó nhập khẩu Bắc Mỹ', 3, 5.0, 1, '["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"]', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=200'),
                                                                                                   (50, 'Tủ Áo Crystal 6 Cánh', 'Khung nhôm kính, đèn LED thông minh', 4, 4.9, 1, '["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200');
-- 3. THUỘC TÍNH (Màu sắc & Kích thước cho toàn bộ 50 SP)
INSERT INTO product_attribute (field_name, name, product_id)
SELECT 'color', 'Màu sắc', id FROM product
UNION ALL
SELECT 'size', 'Kích thước', id FROM product;

-- 4. GIÁ TRỊ THUỘC TÍNH (Luxury Color Palette)
INSERT INTO attribute_value (attribute_id, value)
SELECT id, val FROM (
                        SELECT id, 'Trắng Tuyết' as val FROM product_attribute WHERE field_name = 'color' AND (product_id % 5 = 1)
                        UNION ALL SELECT id, 'Gỗ Óc Chó' FROM product_attribute WHERE field_name = 'color' AND (product_id % 5 = 2)
                        UNION ALL SELECT id, 'Đen Nhám' FROM product_attribute WHERE field_name = 'color' AND (product_id % 5 = 3)
                        UNION ALL SELECT id, 'Kem Sand' FROM product_attribute WHERE field_name = 'color' AND (product_id % 5 = 4)
                        UNION ALL SELECT id, 'Vàng Gold' FROM product_attribute WHERE field_name = 'color' AND (product_id % 5 = 0)
                    ) as c;

INSERT INTO attribute_value (attribute_id, value)
SELECT id, 'Standard' FROM product_attribute WHERE field_name = 'size'
UNION ALL SELECT id, 'Large' FROM product_attribute WHERE field_name = 'size';

-- 5. BIẾN THỂ (Gồm giá bán và giá gốc cao hơn 20%)
INSERT INTO product_variant (product_id, sku, price, original_price, stock, image)
SELECT
    p.id,
    CONCAT('OKL-', p.id, '-', UPPER(REPLACE(av_c.value, ' ', '')), '-', LEFT(av_s.value, 1), '-', FLOOR(RAND()*99)) as sku,
    @sell_price := (12000000 + (p.id * 500000)) + (CASE WHEN av_s.value = 'Large' THEN 4000000 ELSE 0 END) as price,
    ROUND(@sell_price * (1.2 + (RAND() * 0.1)), -4) as original_price,
    FLOOR(RAND() * 15) + 3 as stock,
    CONCAT('https://picsum.photos/seed/lux', p.id, REPLACE(av_c.value, ' ', ''), '/800/800') as image
FROM product p
         JOIN product_attribute pa_c ON pa_c.product_id = p.id AND pa_c.field_name = 'color'
         JOIN attribute_value av_c ON av_c.attribute_id = pa_c.id
         JOIN product_attribute pa_s ON pa_s.product_id = p.id AND pa_s.field_name = 'size'
         JOIN attribute_value av_s ON av_s.attribute_id = pa_s.id;

-- 6. MAPPING VARIANT VỚI GIÁ TRỊ THUỘC TÍNH
INSERT INTO product_variant_attribute (variant_id, attribute_value_id)
SELECT v.id, av.id
FROM product_variant v
         JOIN product_attribute pa ON pa.product_id = v.product_id
         JOIN attribute_value av ON av.attribute_id = pa.id
WHERE v.sku LIKE CONCAT('%', REPLACE(av.value, ' ', ''), '%')
   OR v.sku LIKE CONCAT('%-', LEFT(av.value, 1), '-%');

COMMIT;