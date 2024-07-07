CREATE TABLE `vendors` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`type` VARCHAR(240) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`notes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`added_by` INT(11) NULL DEFAULT '0',
	`updated_by` INT(11) NULL DEFAULT '0',
	`added_on` TIMESTAMP NULL DEFAULT current_timestamp(),
	`updated_on` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;


INSERT INTO `vendors` VALUES (1, 'Malwarebytes', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:20');
INSERT INTO `vendors` VALUES (2, 'Microsoft', '0', 'OFFICE PRODUCTIVITY', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:45:14');
INSERT INTO `vendors` VALUES (3, 'Avast', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:33');
INSERT INTO `vendors` VALUES (4, 'Hewlett Packard', '0', 'HARDWARE', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:36');
INSERT INTO `vendors` VALUES (5, 'ESET', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:39');
INSERT INTO `vendors` VALUES (6, 'Malwarebytes', '0', 'ANTIVIRUS', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:46');
INSERT INTO `vendors` VALUES (7, 'Abobe', '0', 'OFFICE PRODUCTIVITY', 0, 0, '2022-03-14 16:43:32', '2022-03-14 16:44:46');
