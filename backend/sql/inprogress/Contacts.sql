CREATE TABLE `contacts` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`uuid` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`first_name` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`middle_name` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`last_name` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`job_title` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`home_phone` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`work_phone` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`cell_phone` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`extension` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`notes` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`customer` INT(11) NOT NULL DEFAULT '0',
	`added_by` INT(11) NOT NULL DEFAULT '0',
	`updated_by` INT(11) NOT NULL DEFAULT '0',
	`added_on` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK__users` (`added_by`) USING BTREE,
	INDEX `FK__users_2` (`updated_by`) USING BTREE,
	INDEX `FK__customers` (`customer`) USING BTREE,
	CONSTRAINT `FK__customers` FOREIGN KEY (`customer`) REFERENCES `tabicrm`.`customers` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__users` FOREIGN KEY (`added_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__users_2` FOREIGN KEY (`updated_by`) REFERENCES `tabicrm`.`users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
