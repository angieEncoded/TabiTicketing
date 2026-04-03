CREATE TABLE `customers` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`uuid` VARCHAR(40) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`customer_name` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`primary_phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`fax` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`secondary_phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`website` VARCHAR(1000) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`email` VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_one` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_two` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_city` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_state` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_zip` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`billing_address_country` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_one` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_two` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_city` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_state` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_zip` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`shipping_address_country` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`county` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`added_by` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`updated_by` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`added_on` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`status` VARCHAR(8) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
;