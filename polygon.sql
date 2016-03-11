/*
Navicat MySQL Data Transfer

Source Server         : rasp1
Source Server Version : 50544
Source Host           : 192.168.1.8:3306
Source Database       : polygon

Target Server Type    : MYSQL
Target Server Version : 50544
File Encoding         : 65001

Date: 2016-03-11 09:20:32
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postal_code` varchar(8) DEFAULT NULL,
  `country` varchar(16) DEFAULT NULL,
  `city` varchar(16) DEFAULT NULL,
  `nif` int(9) DEFAULT NULL,
  `phone` int(20) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO users VALUES ('a@a.aa', '', '', '', null, null, null, null, null, null);
