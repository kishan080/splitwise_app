create database Splitwise_273;
use Splitwise_273;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `ACCOUNT`;
CREATE TABLE `ACCOUNT` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `psswd` varchar(300) NOT NULL,
  `phone` char(15) NOT NULL,
  `picture` char(100),
  `currency` char(1),
  `time` char(50),
  `language` char(10),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ----------------------------
-- Table structure for owed
-- ----------------------------
DROP TABLE IF EXISTS `OWED`;
CREATE TABLE `OWED` (
  `U_ID` int NOT NULL,
  `R_ID` int NOT NULL,
  `money` int NOT NULL,
  `group` varchar(50) NULL,
  `owed` int NOT NULL,
  PRIMARY KEY (`U_ID`,`R_ID`),
  CONSTRAINT `owe_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `ACCOUNT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `TEAM`;
CREATE TABLE `Splitwise_273`.`TEAM` (
  `G_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `member` VARCHAR(200) NULL,
  `picture` CHAR(100) NULL,
  PRIMARY KEY (`G_ID`));

-- ----------------------------
-- Table structure for expenses
-- ----------------------------
DROP TABLE IF EXISTS `EXPENSES`;
CREATE TABLE `EXPENSES` (
  `E_ID` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `expense` int NOT NULL,
  `date` datetime NOT NULL,
  `host` varchar(15) NOT NULL,
  PRIMARY KEY (`E_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- others list<text> NOT NULL
-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `ACTIVITY`;
CREATE TABLE `ACTIVITY` (
  `A_ID` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `action` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`A_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
