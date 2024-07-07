CREATE TABLE `addresses` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`uuid` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`type` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`customer` INT(11) NOT NULL DEFAULT '0',
	`address_one` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`address_two` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`city` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`state` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`zip` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`country` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`added_by` INT(11) NOT NULL DEFAULT '0',
	`updated_by` INT(11) NOT NULL DEFAULT '0',
	`added_on` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_addresses_users` (`added_by`) USING BTREE,
	INDEX `FK_addresses_users_2` (`updated_by`) USING BTREE,
	CONSTRAINT `FK_addresses_users` FOREIGN KEY (`added_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_addresses_users_2` FOREIGN KEY (`updated_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;
