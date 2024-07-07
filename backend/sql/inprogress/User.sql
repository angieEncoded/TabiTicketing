CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`password` VARCHAR(240) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`first_name` VARCHAR(240) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`middle_name` VARCHAR(240) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`last_name` VARCHAR(240) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`salutation` VARCHAR(240) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`role` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`title` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`department` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`extension` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`office_phone` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`cell_phone` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`street` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`city` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`state` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`zip` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`country` VARCHAR(240) NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`added_by` INT(11) NOT NULL DEFAULT '0',
	`updated_by` INT(11) NOT NULL DEFAULT '0',
	`added_on` TIMESTAMP NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_users_users` (`added_by`) USING BTREE,
	INDEX `FK_users_users_2` (`updated_by`) USING BTREE,
	CONSTRAINT `FK_users_users` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_users_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;
