-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.61 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 homestay 的数据库结构
CREATE DATABASE IF NOT EXISTS `homestay` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `homestay`;

-- 导出  表 homestay.comment 结构
CREATE TABLE IF NOT EXISTS `comment` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `content` text NOT NULL COMMENT '评论内容',
  `time` datetime NOT NULL COMMENT '评论发布时间',
  `u_id` int(10) NOT NULL COMMENT '外键 用户（评论者）id',
  `h_id` int(10) NOT NULL COMMENT '外键 房源（被评论）id',
  `status` int(10) NOT NULL DEFAULT '1' COMMENT '状态值，默认为1',
  PRIMARY KEY (`c_id`),
  KEY `FK_comment_user` (`u_id`),
  KEY `FK_comment_house` (`h_id`),
  CONSTRAINT `FK_comment_house` FOREIGN KEY (`h_id`) REFERENCES `house` (`h_id`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评论表';

-- 正在导出表  homestay.comment 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 导出  表 homestay.house 结构
CREATE TABLE IF NOT EXISTS `house` (
  `h_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '房源id',
  `title` varchar(50) NOT NULL COMMENT '房源标题',
  `price` int(6) NOT NULL COMMENT '价格',
  `imglist` text NOT NULL COMMENT '房源图片 json数组',
  `location` text NOT NULL COMMENT '位置 json对象',
  `period` varchar(30) NOT NULL COMMENT '出租时间段',
  `type` varchar(10) NOT NULL COMMENT '户型',
  `style` varchar(10) NOT NULL COMMENT '风格',
  `description` text NOT NULL COMMENT '房源描述',
  `time` datetime NOT NULL COMMENT '上传时间',
  `star` text NOT NULL COMMENT '评星 json对象',
  `number` int(6) NOT NULL COMMENT '评论人数',
  `u_id` int(10) NOT NULL COMMENT '外键 用户id',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态值，默认为1',
  PRIMARY KEY (`h_id`),
  KEY `FK_house_user` (`u_id`),
  CONSTRAINT `FK_house_user` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源表';

-- 正在导出表  homestay.house 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
/*!40000 ALTER TABLE `house` ENABLE KEYS */;

-- 导出  表 homestay.order 结构
CREATE TABLE IF NOT EXISTS `order` (
  `o_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `time` datetime NOT NULL COMMENT '订单时间',
  `price` int(6) NOT NULL COMMENT '价格',
  `period` varchar(30) NOT NULL COMMENT '订单时间段',
  `h_id` int(10) NOT NULL COMMENT '外键 房源id',
  `u_id1` int(10) NOT NULL COMMENT '外键 订单用户id',
  `u_id2` int(10) NOT NULL COMMENT '外键 房源用户id',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态值,默认为1',
  PRIMARY KEY (`o_id`),
  KEY `FK_order_house` (`h_id`),
  KEY `FK_order_user` (`u_id1`),
  KEY `FK_order_user_2` (`u_id2`),
  CONSTRAINT `FK_order_house` FOREIGN KEY (`h_id`) REFERENCES `house` (`h_id`),
  CONSTRAINT `FK_order_user` FOREIGN KEY (`u_id1`) REFERENCES `user` (`u_id`),
  CONSTRAINT `FK_order_user_2` FOREIGN KEY (`u_id2`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';

-- 正在导出表  homestay.order 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- 导出  表 homestay.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(10) NOT NULL COMMENT '密码',
  `imgsrc` varchar(50) NOT NULL DEFAULT '/upload/default.jpg' COMMENT '头像src，有默认头像',
  `tel` varchar(11) NOT NULL COMMENT '电话',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态值，默认为1',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 正在导出表  homestay.user 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
