-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: rossy_db
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3b0cc205-2ca1-11f1-b2ca-d8f3bc97b284:1-15';

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `precio_original` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `talla` varchar(100) DEFAULT 'S, M, L',
  `color` varchar(150) DEFAULT NULL,
  `categoria` enum('vestidos','blusas','conjuntos','accesorios','general') DEFAULT 'general',
  `badge` enum('nuevo','oferta','') DEFAULT '',
  `stock` int DEFAULT '0',
  `activo` tinyint(1) DEFAULT '1',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_categoria` (`categoria`),
  KEY `idx_activo` (`activo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Vestido Floral Primavera',NULL,89.90,120.00,'vestido-floral.jpg','S, M, L','Rosa, Blanco','vestidos','oferta',15,1,'2026-03-31 02:18:35'),(2,'Blusa Elegante Turquesa',NULL,55.00,NULL,'blusa-turquesa.jpg','XS, S, M, L','Turquesa, Azul','blusas','nuevo',20,1,'2026-03-31 02:18:35'),(3,'Conjunto Casual Dorado',NULL,130.00,160.00,'conjunto-dorado.jpg','S, M, L, XL','Dorado, Crema','conjuntos','oferta',10,1,'2026-03-31 02:18:35'),(4,'Vestido Noche Marina',NULL,145.00,NULL,'vestido-noche.jpg','S, M, L','Azul Marino','vestidos','nuevo',8,1,'2026-03-31 02:18:35'),(5,'Blusa Romántica Encaje',NULL,68.00,NULL,'blusa-encaje.jpg','XS, S, M','Blanco, Crema','blusas','',25,1,'2026-03-31 02:18:35'),(6,'Conjunto Deportivo Chic',NULL,110.00,140.00,'conjunto-sport.jpg','S, M, L, XL','Negro, Gris','conjuntos','oferta',12,1,'2026-03-31 02:18:35'),(7,'Collar Dorado Perlas',NULL,35.00,NULL,'collar-perlas.jpg','Única','Dorado','accesorios','nuevo',30,1,'2026-03-31 02:18:35'),(8,'Bolso Mini Elegante',NULL,75.00,95.00,'bolso-mini.jpg','Única','Nude, Negro','accesorios','oferta',18,1,'2026-03-31 02:18:35'),(9,'Vestido Casual Rayas',NULL,95.00,NULL,'vestido-rayas.jpg','S, M, L','Azul/Blanco','vestidos','nuevo',14,1,'2026-03-31 02:18:35'),(10,'Blusa Off Shoulder',NULL,72.00,90.00,'blusa-offshoulder.jpg','XS, S, M, L','Crema, Rosa Palo','blusas','oferta',22,1,'2026-03-31 02:18:35');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-30 21:35:47
