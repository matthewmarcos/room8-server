-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: room8_dev
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(128) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nickname` varchar(12) NOT NULL,
  `time_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','username3','username3@email.com','$2a$10$Ubsfz0WSn/V28H0AGGd22./LJOoOO3skddKrlATBNWgOeG4OugNAa','username2','2017-04-17 20:12:07'),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','username1','username1@email.com','$2a$10$1Ulr/w4Zr82wpDyU8ZhFj.iOXy8Bh8Zp008pvq8Heah5V.hj.bB9S','Matthew','2017-04-17 19:38:45'),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','username2','username2@email.com','$2a$10$0hTbEPDi2GcKUvDGUDTMzOAMKuuaPZmvHA/1/hNblF6DSEn1q8Xmy','Micah','2017-04-17 19:39:01'),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','username4','username4@email.com','$2a$10$FlKWNJjQ9mM.s6Y97fhw2uIs27E.Tj8gn/dZeFr.zLnhMxfLYaXG6','user4','2017-04-17 20:15:30'),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','username5','username5@email.com','$2a$10$J79eODXruDRR7R7sCUhHi.RXn/8rTIYwyHc7IQgRF.JPRR4k9PwhC','user5','2017-04-17 20:16:29');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_hobby`
--

DROP TABLE IF EXISTS `user_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_hobby` (
  `id` varchar(128) NOT NULL,
  `hobby` varchar(128) NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `user_hobby_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_hobby`
--

LOCK TABLES `user_hobby` WRITE;
/*!40000 ALTER TABLE `user_hobby` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_hobby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_interest` (
  `id` varchar(128) NOT NULL,
  `interest` varchar(128) NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `user_interest_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interest`
--

LOCK TABLES `user_interest` WRITE;
/*!40000 ALTER TABLE `user_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_organization`
--

DROP TABLE IF EXISTS `user_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_organization` (
  `id` varchar(128) NOT NULL,
  `organization` varchar(128) NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `user_organization_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_organization`
--

LOCK TABLES `user_organization` WRITE;
/*!40000 ALTER TABLE `user_organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_cost`
--

DROP TABLE IF EXISTS `user_preferences_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_cost` (
  `id` varchar(128) NOT NULL,
  `rent_price_range_start` int(11) DEFAULT '0',
  `rent_price_range_end` int(11) DEFAULT '0',
  `should_include_utilities` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `utilities_price_range_start` int(11) DEFAULT '0',
  `utilities_price_range_end` int(11) DEFAULT '0',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_cost_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_cost`
--

LOCK TABLES `user_preferences_cost` WRITE;
/*!40000 ALTER TABLE `user_preferences_cost` DISABLE KEYS */;
INSERT INTO `user_preferences_cost` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f',0,0,'Do not care',0,0),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a',0,0,'Do not care',0,0),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a',0,0,'Do not care',0,0),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8',0,0,'Do not care',0,0),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1',0,0,'Do not care',0,0);
/*!40000 ALTER TABLE `user_preferences_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_lifestyle`
--

DROP TABLE IF EXISTS `user_preferences_lifestyle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_lifestyle` (
  `id` varchar(128) NOT NULL,
  `alcohol` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `cleanliness` tinyint(4) DEFAULT '0',
  `smokers` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `study_time` enum('Morning','Evening','Both','Do not care') DEFAULT 'Do not care',
  `guests_in_room` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `guests_study_area` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `pets` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `org` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_lifestyle_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_lifestyle`
--

LOCK TABLES `user_preferences_lifestyle` WRITE;
/*!40000 ALTER TABLE `user_preferences_lifestyle` DISABLE KEYS */;
INSERT INTO `user_preferences_lifestyle` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','Do not care',0,'Do not care','Do not care','Do not care','Do not care','Do not care','Do not care'),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','Do not care',0,'Do not care','Do not care','Do not care','Do not care','Do not care','Do not care'),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','Do not care',0,'Do not care','Do not care','Do not care','Do not care','Do not care','Do not care'),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','Do not care',0,'Do not care','Do not care','Do not care','Do not care','Do not care','Do not care'),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','Do not care',0,'Do not care','Do not care','Do not care','Do not care','Do not care','Do not care');
/*!40000 ALTER TABLE `user_preferences_lifestyle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_location`
--

DROP TABLE IF EXISTS `user_preferences_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_location` (
  `id` varchar(128) NOT NULL,
  `nearby_restaurants` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `travel_time_to_uplb` int(11) DEFAULT '120',
  `general_location` varchar(128) DEFAULT '',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_location_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_location`
--

LOCK TABLES `user_preferences_location` WRITE;
/*!40000 ALTER TABLE `user_preferences_location` DISABLE KEYS */;
INSERT INTO `user_preferences_location` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','Do not care',120,''),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','Do not care',120,''),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','Do not care',120,''),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','Do not care',120,''),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','Do not care',120,'');
/*!40000 ALTER TABLE `user_preferences_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_misc`
--

DROP TABLE IF EXISTS `user_preferences_misc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_misc` (
  `id` varchar(128) NOT NULL,
  `curfew` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `curfew_time` time DEFAULT '00:00:00',
  `message` varchar(256) DEFAULT '',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_misc_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_misc`
--

LOCK TABLES `user_preferences_misc` WRITE;
/*!40000 ALTER TABLE `user_preferences_misc` DISABLE KEYS */;
INSERT INTO `user_preferences_misc` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','Do not care','00:00:00',''),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','Do not care','00:00:00',''),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','Do not care','00:00:00',''),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','Do not care','00:00:00',''),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','Do not care','00:00:00','');
/*!40000 ALTER TABLE `user_preferences_misc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_sex`
--

DROP TABLE IF EXISTS `user_preferences_sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_sex` (
  `id` varchar(128) NOT NULL,
  `sex` enum('Male','Female','Do not care') DEFAULT 'Do not care',
  KEY `id` (`id`),
  CONSTRAINT `user_preferences_sex_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_sex`
--

LOCK TABLES `user_preferences_sex` WRITE;
/*!40000 ALTER TABLE `user_preferences_sex` DISABLE KEYS */;
INSERT INTO `user_preferences_sex` VALUES ('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','Do not care'),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','Do not care'),('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','Do not care'),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','Do not care'),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','Do not care');
/*!40000 ALTER TABLE `user_preferences_sex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_utilities`
--

DROP TABLE IF EXISTS `user_preferences_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_utilities` (
  `id` varchar(128) NOT NULL,
  `airconditioning` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `laundry` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `cooking` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `gas_stove` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `electric_stove` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `microwave` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `water_kettle` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `internet` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `torrent` enum('Yes','No','Do not care') DEFAULT 'Do not care',
  `speed_requirement` decimal(5,2) DEFAULT '1.00',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_utilities_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_utilities`
--

LOCK TABLES `user_preferences_utilities` WRITE;
/*!40000 ALTER TABLE `user_preferences_utilities` DISABLE KEYS */;
INSERT INTO `user_preferences_utilities` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care',1.00),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care',1.00),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care',1.00),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care',1.00),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care','Do not care',1.00);
/*!40000 ALTER TABLE `user_preferences_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences_when`
--

DROP TABLE IF EXISTS `user_preferences_when`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences_when` (
  `id` varchar(128) NOT NULL,
  `start_date` date DEFAULT '1000-01-01',
  `duration` enum('End of semester','Indefinitely') DEFAULT 'Indefinitely',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_preferences_when_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences_when`
--

LOCK TABLES `user_preferences_when` WRITE;
/*!40000 ALTER TABLE `user_preferences_when` DISABLE KEYS */;
INSERT INTO `user_preferences_when` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','1000-01-01','Indefinitely'),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','1000-01-01','Indefinitely'),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','1000-01-01','Indefinitely'),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','1000-01-01','Indefinitely'),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','1000-01-01','Indefinitely');
/*!40000 ALTER TABLE `user_preferences_when` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `id` varchar(128) NOT NULL,
  `full_name` varchar(64) DEFAULT '',
  `status` enum('I am looking for a room','I have a room') DEFAULT 'I am looking for a room',
  `cleanliness` tinyint(4) DEFAULT '1',
  `sex` enum('Male','Female','Do not know') DEFAULT 'Do not know',
  `smoker` enum('Yes','No') DEFAULT 'Yes',
  `has_org` enum('Yes','No') DEFAULT 'Yes',
  `gender` varchar(64) DEFAULT '',
  `course` varchar(64) DEFAULT '',
  `batch` varchar(4) DEFAULT '',
  `birthday` date DEFAULT '1000-01-01',
  `contact_number` varchar(16) DEFAULT '',
  `bio` varchar(1024) DEFAULT '',
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('4aa2b75e-dae0-4de5-802e-b8fd7354a23f','','I am looking for a room',1,'Do not know','Yes','Yes','','','','1000-01-01','',''),('778b2f24-f3e6-4bd4-bf4a-f5c54140e36a','','I am looking for a room',1,'Do not know','Yes','Yes','','','','1000-01-01','',''),('904c2696-9bbc-45b6-88d6-70d4bc9e7f7a','','I am looking for a room',1,'Do not know','Yes','Yes','','','','1000-01-01','',''),('dde85f2e-5a64-45bf-acbb-f0b9de25f7d8','','I am looking for a room',1,'Do not know','Yes','Yes','','','','1000-01-01','',''),('f09e58fd-3710-4eea-9e5d-0c8365b4edf1','','I am looking for a room',1,'Do not know','Yes','Yes','','','','1000-01-01','','');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-18  4:34:08
