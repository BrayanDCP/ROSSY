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
-- Temporary view structure for view `v_productos_oferta`
--

DROP TABLE IF EXISTS `v_productos_oferta`;
/*!50001 DROP VIEW IF EXISTS `v_productos_oferta`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_productos_oferta` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `precio`,
 1 AS `precio_original`,
 1 AS `descuento_pct`,
 1 AS `categoria`,
 1 AS `stock`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_resumen_pedidos`
--

DROP TABLE IF EXISTS `v_resumen_pedidos`;
/*!50001 DROP VIEW IF EXISTS `v_resumen_pedidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_resumen_pedidos` AS SELECT 
 1 AS `id`,
 1 AS `nombre_cliente`,
 1 AS `telefono`,
 1 AS `metodo_pago`,
 1 AS `total`,
 1 AS `estado`,
 1 AS `fecha`,
 1 AS `cantidad_items`,
 1 AS `unidades_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_productos_oferta`
--

/*!50001 DROP VIEW IF EXISTS `v_productos_oferta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_productos_oferta` AS select `productos`.`id` AS `id`,`productos`.`nombre` AS `nombre`,`productos`.`precio` AS `precio`,`productos`.`precio_original` AS `precio_original`,round((((`productos`.`precio_original` - `productos`.`precio`) / `productos`.`precio_original`) * 100),0) AS `descuento_pct`,`productos`.`categoria` AS `categoria`,`productos`.`stock` AS `stock` from `productos` where ((`productos`.`precio_original` is not null) and (`productos`.`precio_original` > `productos`.`precio`) and (`productos`.`activo` = 1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_resumen_pedidos`
--

/*!50001 DROP VIEW IF EXISTS `v_resumen_pedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_resumen_pedidos` AS select `p`.`id` AS `id`,`p`.`nombre_cliente` AS `nombre_cliente`,`p`.`telefono` AS `telefono`,`p`.`metodo_pago` AS `metodo_pago`,`p`.`total` AS `total`,`p`.`estado` AS `estado`,`p`.`fecha` AS `fecha`,count(`d`.`id`) AS `cantidad_items`,sum(`d`.`cantidad`) AS `unidades_total` from (`pedidos` `p` left join `pedido_detalle` `d` on((`d`.`pedido_id` = `p`.`id`))) group by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-30 21:35:48
