-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for tabicrm
CREATE DATABASE IF NOT EXISTS `tabicrm` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `tabicrm`;

-- Dumping structure for table tabicrm.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `customer` int(11) NOT NULL DEFAULT 0,
  `address_one` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `address_two` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `city` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `state` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `zip` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `country` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_addresses_users` (`added_by`) USING BTREE,
  KEY `FK_addresses_users_2` (`updated_by`) USING BTREE,
  CONSTRAINT `FK_addresses_users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_addresses_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table tabicrm.addresses: ~0 rows (approximately)
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;

-- Dumping structure for table tabicrm.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(240) NOT NULL DEFAULT '0',
  `middle_name` varchar(240) NOT NULL DEFAULT '0',
  `last_name` varchar(240) NOT NULL DEFAULT '0',
  `job_title` varchar(240) NOT NULL DEFAULT '0',
  `home_phone` varchar(240) NOT NULL DEFAULT '0',
  `work_phone` varchar(240) NOT NULL DEFAULT '0',
  `cell_phone` varchar(240) NOT NULL DEFAULT '0',
  `extension` varchar(240) NOT NULL DEFAULT '0',
  `notes` text NOT NULL,
  `customer` int(11) NOT NULL DEFAULT 0,
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK__users` (`added_by`),
  KEY `FK__users_2` (`updated_by`),
  KEY `FK__customers` (`customer`),
  CONSTRAINT `FK__customers` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table tabicrm.contacts: ~0 rows (approximately)
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Dumping structure for table tabicrm.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `primary_phone` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `fax` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `secondary_phone` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `website` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_customers_users` (`added_by`) USING BTREE,
  KEY `FK_customers_users_2` (`updated_by`) USING BTREE,
  CONSTRAINT `FK_customers_users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_customers_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table tabicrm.customers: ~0 rows (approximately)
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Dumping structure for table tabicrm.equipment_types
CREATE TABLE IF NOT EXISTS `equipment_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table tabicrm.equipment_types: ~16 rows (approximately)
/*!40000 ALTER TABLE `equipment_types` DISABLE KEYS */;
INSERT INTO `equipment_types` (`id`, `name`, `added_by`, `updated_by`, `added_on`, `updated_on`) VALUES
	(1, 'SERVER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(2, 'UPS', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(3, 'ILO', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(4, 'ROUTER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(5, 'SWITCH', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(6, 'WAP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(7, 'MODEM', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(8, 'DESKTOP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(9, 'LAPTOP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(10, 'PRINTER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(11, 'IP_PHONE', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(12, 'VALIDATOR', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(13, 'PRINT_SERVER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(14, 'TABLET', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(15, 'CELL_PHONE', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31'),
	(16, 'OTHER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
/*!40000 ALTER TABLE `equipment_types` ENABLE KEYS */;

-- Dumping structure for table tabicrm.license_types
CREATE TABLE IF NOT EXISTS `license_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor` varchar(240) NOT NULL DEFAULT '0',
  `type` varchar(240) NOT NULL DEFAULT '0',
  `price` varchar(240) NOT NULL DEFAULT '0',
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_license_types_users` (`added_by`),
  KEY `FK_license_types_users_2` (`updated_by`),
  CONSTRAINT `FK_license_types_users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_license_types_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table tabicrm.license_types: ~0 rows (approximately)
/*!40000 ALTER TABLE `license_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `license_types` ENABLE KEYS */;

-- Dumping structure for table tabicrm.ticket_options
CREATE TABLE IF NOT EXISTS `ticket_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `option` varchar(240) DEFAULT NULL,
  `type` varchar(240) DEFAULT NULL,
  `added_by` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_ticket_options_users` (`added_by`),
  KEY `FK_ticket_options_users_2` (`updated_by`),
  CONSTRAINT `FK_ticket_options_users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ticket_options_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table tabicrm.ticket_options: ~19 rows (approximately)
/*!40000 ALTER TABLE `ticket_options` DISABLE KEYS */;
INSERT INTO `ticket_options` (`id`, `option`, `type`, `added_by`, `updated_by`, `added_on`, `updated_on`) VALUES
	(1, 'OPEN', 'STATUS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:54:41'),
	(2, 'IN PROGRESS', 'STATUS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:55:20'),
	(3, 'WAITING ON CUSTOMER', 'STATUS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:55:24'),
	(4, 'CLOSED', 'STATUS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:55:27'),
	(5, 'LOW', 'PRIORITY', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:55:46'),
	(6, 'NORMAL', 'PRIORITY', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:55:53'),
	(7, 'HIGH', 'PRIORITY', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:56:02'),
	(8, 'URGENT', 'PRIORITY', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:56:09'),
	(9, 'NETWORK', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:56:27'),
	(10, 'SOFTWARE', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:56:38'),
	(11, 'SERVER', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:56:55'),
	(12, 'HARDWARE', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:06'),
	(13, 'SALES', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:08'),
	(14, 'DEVELOPMENT', 'ASSIGNED_TO', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:16'),
	(15, 'SOLVED ON PHONE', 'RESULTS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:39'),
	(16, 'SERVER SERVICE', 'RESULTS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:48'),
	(17, 'ROUTER SERVICE', 'RESULTS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:52'),
	(18, 'CONTRACT SERVICE', 'RESULTS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:57:57'),
	(19, 'NON-CONTRACT SERVICE', 'RESULTS', 11, 11, '2022-03-14 15:54:41', '2022-03-14 15:58:08');
/*!40000 ALTER TABLE `ticket_options` ENABLE KEYS */;

-- Dumping structure for table tabicrm.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salutation` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(240) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `title` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `department` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `office_phone` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `extension` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `cell_phone` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `street` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `city` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `state` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `zip` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `country` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT 0,
  `added_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table tabicrm.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `middle_name`, `last_name`, `salutation`, `role`, `title`, `department`, `office_phone`, `extension`, `cell_phone`, `street`, `city`, `state`, `zip`, `country`, `notes`, `added_by`, `updated_by`, `added_on`, `updated_on`) VALUES
	(11, 'angie@test.com', 'angie', 'angie', NULL, 'angie', NULL, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', NULL, 0, 0, '2022-03-14 15:54:11', '2022-03-14 15:54:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table tabicrm.vendors
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(240) NOT NULL DEFAULT '0',
  `type` varchar(240) NOT NULL DEFAULT '0',
  `notes` text DEFAULT NULL,
  `added_by` int(11) DEFAULT 0,
  `updated_by` int(11) DEFAULT 0,
  `added_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table tabicrm.vendors: ~6 rows (approximately)
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` (`id`, `name`, `type`, `notes`, `added_by`, `updated_by`, `added_on`, `updated_on`) VALUES
	(1, 'Malwarebytes', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:20'),
	(2, 'Microsoft', '0', 'OFFICE PRODUCTIVITY', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:45:14'),
	(3, 'Avast', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:33'),
	(4, 'Hewlett Packard', '0', 'HARDWARE', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:36'),
	(5, 'ESET', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:39'),
	(6, 'Malwarebytes', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:46'),
	(7, 'Abobe', '0', 'OFFICE PRODUCTIVITY', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:46');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
