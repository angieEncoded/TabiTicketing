CREATE TABLE `license_types` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`uuid` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`vendor` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`type` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`price` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`added_by` INT(11) NOT NULL DEFAULT '0',
	`updated_by` INT(11) NOT NULL DEFAULT '0',
	`added_on` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_license_types_users` (`added_by`) USING BTREE,
	INDEX `FK_license_types_users_2` (`updated_by`) USING BTREE,
	CONSTRAINT `FK_license_types_users` FOREIGN KEY (`added_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_license_types_users_2` FOREIGN KEY (`updated_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;