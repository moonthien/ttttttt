-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.36 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for oncuoiky
CREATE DATABASE IF NOT EXISTS `oncuoiky` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `oncuoiky`;

-- Dumping structure for table oncuoiky.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oncuoiky.category: ~8 rows (approximately)
INSERT INTO `category` (`id`, `name`, `image`) VALUES
	(1, 'Resort', 'https://i.imgur.com/05e4V86.png'),
	(2, 'Homestay', 'https://i.imgur.com/Hj5mgBm.png'),
	(3, 'Hotel', 'https://i.imgur.com/bueMwgq.png'),
	(4, 'Lodge', 'https://i.imgur.com/qhkysxR.png'),
	(5, 'Villa', 'https://i.imgur.com/EEWX6UL.png'),
	(6, 'Apartment', 'https://i.imgur.com/rD3zVKG.png'),
	(7, 'Hostel', 'https://i.imgur.com/goK3GYX.png'),
	(8, 'See all', 'https://i.imgur.com/6wLDcNr.png');

-- Dumping structure for table oncuoiky.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oncuoiky.location: ~6 rows (approximately)
INSERT INTO `location` (`id`, `image`) VALUES
	(1, 'https://i.imgur.com/riEaO08.png'),
	(2, 'https://i.imgur.com/cai3XhU.png'),
	(3, 'https://i.imgur.com/oMSH0dg.png'),
	(4, 'https://i.imgur.com/4WW563e.png'),
	(5, 'https://i.imgur.com/Ze8iOUf.png'),
	(6, 'https://i.imgur.com/Ze8iOUf.png');

-- Dumping structure for table oncuoiky.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oncuoiky.users: ~9 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password`, `avatar`, `email`, `role`, `birthday`) VALUES
	(1, 'Mai Quốc Trường', '123', 'https://randomuser.me/api/portraits/men/1.jpg', 'maiquoctruong2403@gmail.com', 'Admin', '2004-12-09'),
	(2, 'Jane Smith', '123', 'https://randomuser.me/api/portraits/women/2.jpg', 'jane@example.com', 'User', '2014-11-05'),
	(3, 'Mai Truong Mai', '123456789', 'http://localhost:3000/uploads/1733755381641.jpeg', 'maitruong24113@gmail.com', 'User', '2004-01-02'),
	(4, 'aaa', '123', 'http://localhost:3000/uploads/1733720765746.jpg', 'aa@gmail.com', 'User', '2024-11-03'),
	(5, 'bb chang', '12345', 'http://localhost:3000/uploads/1733759454248.jpg', 'nbbchang@gmail.com', 'User', '2003-01-13'),
	(6, 'Karina Aespa', '123456', 'http://localhost:3000/uploads/1733760199651.jpg', 'karina13233@gmail.com', 'User', '2003-08-26'),
	(7, 'Winter', '123', 'http://localhost:3000/uploads/1733761871634.jpg', 'winter123@gmail.com', 'User', '2003-08-08'),
	(8, 'Ningning', '12345', 'http://localhost:3000/uploads/1733762668760.jpg', 'ning@gmail.com', 'User', '2005-07-20'),
	(9, 'Giselle', '123', 'http://localhost:3000/uploads/1733763887126.jpg', 'giselle123456@gmail.com', 'User', '2006-03-17');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
