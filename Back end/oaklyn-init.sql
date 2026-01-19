SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS oaklyn;
USE oaklyn;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS product_variant_attribute;
DROP TABLE IF EXISTS product_wishlist;
DROP TABLE IF EXISTS order_payment;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS product_variant;
DROP TABLE IF EXISTS attribute_value;
DROP TABLE IF EXISTS product_attribute;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `product_review`;

SET FOREIGN_KEY_CHECKS = 1;

-- ======================
-- user
-- ======================
CREATE TABLE `user` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(200) DEFAULT NULL,
                        `phone` varchar(15) DEFAULT NULL,
                        `password` varchar(255) DEFAULT NULL,
                        `plain_password` varchar(255) DEFAULT NULL,
                        `email` varchar(255) DEFAULT NULL,
                        `role` varchar(30) DEFAULT NULL,
                        `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                        `active` bit(1) DEFAULT b'1',
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `phone` (`phone`),
                        UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======================
-- category
-- ======================
CREATE TABLE `category` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `name` varchar(200) DEFAULT NULL,
                            `description` text,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======================
-- product
-- ======================
CREATE TABLE product (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         category_id INT NULL,
                         active INT DEFAULT 1,
                         image TEXT,
                         thumbnail TEXT,
                         avg_rating FLOAT,
                         CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id)
);

-- ======================
-- product_attribute
-- ======================
CREATE TABLE product_attribute (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   field_name VARCHAR(100) NOT NULL,
                                   name VARCHAR(100) NOT NULL,
                                   product_id INT NOT NULL,
                                   CONSTRAINT fk_attr_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- ======================
-- attribute_value
-- ======================
CREATE TABLE attribute_value (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 attribute_id INT NOT NULL,
                                 value VARCHAR(255) NOT NULL,
                                 CONSTRAINT fk_value_attr FOREIGN KEY (attribute_id) REFERENCES product_attribute(id) ON DELETE CASCADE
);

-- ======================
-- product_variant
-- ======================
CREATE TABLE `product_variant` (
                                   `id` int NOT NULL AUTO_INCREMENT,
                                   `product_id` int NOT NULL,
                                   `sku` varchar(100) DEFAULT NULL,
                                   `price` double DEFAULT NULL,
                                   `original_price` double DEFAULT NULL,
                                   `stock` int DEFAULT '0',
                                   `image` text,
                                   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `sku` (`sku`),
                                   KEY `idx_product_variant_product` (`product_id`),
                                   CONSTRAINT fk_variant_product FOREIGN KEY (`product_id`) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======================
-- product_variant_attribute
-- ======================
CREATE TABLE `product_variant_attribute` (
                                             `variant_id` int NOT NULL,
                                             `attribute_value_id` int NOT NULL,
                                             PRIMARY KEY (`variant_id`, `attribute_value_id`),
                                             KEY `idx_variant_attribute_value` (`attribute_value_id`),
                                             CONSTRAINT fk_pva_variant FOREIGN KEY (`variant_id`) REFERENCES product_variant(id) ON DELETE CASCADE,
                                             CONSTRAINT fk_pva_value FOREIGN KEY (`attribute_value_id`) REFERENCES attribute_value(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======================
-- wishlist
-- ======================
CREATE TABLE `product_wishlist` (
                                    `user_id` int NOT NULL,
                                    `product_id` int NOT NULL,
                                    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                    PRIMARY KEY (`user_id`,`product_id`),
                                    KEY `idx_wishlist_product` (`product_id`),
                                    CONSTRAINT fk_wishlist_user FOREIGN KEY (`user_id`) REFERENCES `user`(id) ON DELETE CASCADE,
                                    CONSTRAINT fk_wishlist_product FOREIGN KEY (`product_id`) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======================
-- orders
-- ======================
CREATE TABLE `order` (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        code VARCHAR(50) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        user_id INT NOT NULL,
                        total_amount DOUBLE NOT NULL,
                        discount_amount DOUBLE DEFAULT 0,
                        final_amount DOUBLE NOT NULL,
                        status VARCHAR(50) NOT NULL,
                        payment_status VARCHAR(50) NOT NULL,
                        payment_method VARCHAR(50),
                        note TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NULL,
                        CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES `user`(id)
);

-- ======================
-- order_item
-- ======================
CREATE TABLE order_item (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            order_id INT NOT NULL,
                            product_id INT NOT NULL,
                            product_variant_id INT NOT NULL,
                            price DOUBLE NOT NULL,
                            quantity INT NOT NULL,
                            total_price DOUBLE NOT NULL,
                            CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE CASCADE,
                            CONSTRAINT fk_item_product FOREIGN KEY (product_id) REFERENCES product(id),
                            CONSTRAINT fk_item_variant FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
);

-- ======================
-- order_payment
-- ======================
CREATE TABLE order_payment (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               order_id INT NOT NULL,
                               provider VARCHAR(50) NOT NULL,
                               payment_code VARCHAR(100),
                               amount DOUBLE NOT NULL,
                               payment_status VARCHAR(50) NOT NULL,
                               raw_response TEXT,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE CASCADE
);

-- ======================
-- product_review
-- ======================
CREATE TABLE product_review (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                order_id INT NOT NULL,
                                order_item_id INT NOT NULL,
                                product_id INT NOT NULL,
                                product_variant_id INT NOT NULL,
                                user_id INT NOT NULL,
                                rating INT NOT NULL,
                                comment TEXT,
                                files TEXT,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                CONSTRAINT fk_review_order FOREIGN KEY (order_id) REFERENCES `order`(id),
                                CONSTRAINT fk_review_item FOREIGN KEY (order_item_id) REFERENCES order_item(id),
                                CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES product(id),
                                CONSTRAINT fk_review_variant FOREIGN KEY (product_variant_id) REFERENCES product_variant(id),
                                CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE oaklyn.product
    ADD FULLTEXT INDEX ft_product_name_description (name, description);

COMMIT;
