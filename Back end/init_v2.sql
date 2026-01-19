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

CREATE TABLE `attribute_value` (
                                   `id` int NOT NULL,
                                   `attribute_id` int NOT NULL,
                                   `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `category` (
                            `id` int NOT NULL,
                            `name` varchar(200) DEFAULT NULL,
                            `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
                           `id` int NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `description` text,
                           `category_id` int NOT NULL DEFAULT '0',
                           `avg_rating` decimal(3,2) DEFAULT '0.00',
                           `active` int DEFAULT '1',
                           `image` text,
                           `thumbnail` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_attribute` (
                                     `id` int NOT NULL,
                                     `field_name` varchar(100) NOT NULL,
                                     `name` varchar(100) NOT NULL,
                                     `product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_variant` (
                                   `id` int NOT NULL,
                                   `product_id` int NOT NULL,
                                   `sku` varchar(100) DEFAULT NULL,
                                   `price` double DEFAULT NULL,
                                   `stock` int DEFAULT '0',
                                   `image` text,
                                   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_variant_attribute` (
                                             `variant_id` int NOT NULL,
                                             `attribute_value_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_wishlist` (
                                     `user_id` int NOT NULL,
                                     `product_id` int NOT NULL,
                                     `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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


ALTER TABLE `attribute_value`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_attribute_value_attribute` (`attribute_id`);

ALTER TABLE `category`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `product`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_active` (`active`),
  ADD KEY `idx_product_category` (`category_id`);

ALTER TABLE `product_attribute`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_attribute_field_name` (`field_name`,`product_id`),
  ADD KEY `idx_attribute_product_id` (`product_id`);

ALTER TABLE `product_variant`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_product_variant_product` (`product_id`);

ALTER TABLE `product_variant_attribute`
    ADD KEY `idx_variant_attribute_variant` (`variant_id`),
  ADD KEY `idx_variant_attribute_value` (`attribute_value_id`);

ALTER TABLE `product_wishlist`
    ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `idx_wishlist_user` (`user_id`),
  ADD KEY `idx_wishlist_product` (`product_id`);

ALTER TABLE `user`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;