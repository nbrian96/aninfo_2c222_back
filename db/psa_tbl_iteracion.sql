-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: psa
-- ------------------------------------------------------
-- Server version	8.0.31-commercial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_iteracion`
--

DROP TABLE IF EXISTS `tbl_iteracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_iteracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_fase` int NOT NULL,
  `id_anterior` int DEFAULT NULL,
  `id_siguiente` int DEFAULT NULL,
  `descripcion` mediumtext,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `fecha_fin_real` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_fase_idx` (`id_fase`),
  KEY `id_anteriori_idx` (`id_anterior`),
  KEY `id_siguientei_idx` (`id_siguiente`),
  CONSTRAINT `id_anteriori` FOREIGN KEY (`id_anterior`) REFERENCES `tbl_iteracion` (`id`),
  CONSTRAINT `id_fase` FOREIGN KEY (`id_fase`) REFERENCES `tbl_fase` (`id`),
  CONSTRAINT `id_siguientei` FOREIGN KEY (`id_siguiente`) REFERENCES `tbl_iteracion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_iteracion`
--

LOCK TABLES `tbl_iteracion` WRITE;
/*!40000 ALTER TABLE `tbl_iteracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_iteracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-28 15:09:36
