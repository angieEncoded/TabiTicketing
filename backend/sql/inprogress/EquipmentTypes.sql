CREATE TABLE `equipment_types` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(240) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`added_by` INT(11) NOT NULL DEFAULT '0',
	`updated_by` INT(11) NOT NULL DEFAULT '0',
	`added_on` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=17
;





INSERT INTO `equipment_types` VALUES (1, 'SERVER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (2, 'UPS', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (3, 'ILO', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (4, 'ROUTER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (5, 'SWITCH', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (6, 'WAP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (7, 'MODEM', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (8, 'DESKTOP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (9, 'LAPTOP', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (10, 'PRINTER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (11, 'IP_PHONE', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (12, 'VALIDATOR', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (13, 'PRINT_SERVER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (14, 'TABLET', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (15, 'CELL_PHONE', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
INSERT INTO `equipment_types` VALUES (16, 'OTHER', 0, 0, '2022-03-14 15:48:31', '2022-03-14 15:48:31');
