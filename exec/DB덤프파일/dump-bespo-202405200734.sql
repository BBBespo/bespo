-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: k10a606.p.ssafy.io    Database: bespo
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `accept_type` tinyint DEFAULT NULL,
  `alarm_id` int NOT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `is_read` bit(1) NOT NULL,
  `team_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`alarm_id`),
  KEY `FK3elsuwk6veorxf6lkn55h31u5` (`team_id`),
  CONSTRAINT `FK3elsuwk6veorxf6lkn55h31u5` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alarm_seq`
--

DROP TABLE IF EXISTS `alarm_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm_seq`
--

LOCK TABLES `alarm_seq` WRITE;
/*!40000 ALTER TABLE `alarm_seq` DISABLE KEYS */;
INSERT INTO `alarm_seq` VALUES (101);
/*!40000 ALTER TABLE `alarm_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `memo_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKt1hna68ivd4vy3gfs3lf7lcqg` (`memo_id`),
  CONSTRAINT `FKt1hna68ivd4vy3gfs3lf7lcqg` FOREIGN KEY (`memo_id`) REFERENCES `memo` (`memo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_seq`
--

DROP TABLE IF EXISTS `comment_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_seq`
--

LOCK TABLES `comment_seq` WRITE;
/*!40000 ALTER TABLE `comment_seq` DISABLE KEYS */;
INSERT INTO `comment_seq` VALUES (1);
/*!40000 ALTER TABLE `comment_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `team_id` int DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `end` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `start` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attendees` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `FKo7r78aa4ksoidjb2oh13jsgc5` (`team_id`),
  CONSTRAINT `FKo7r78aa4ksoidjb2oh13jsgc5` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,_binary '\0',53,0,'2024-05-19 13:04:02.730761','2024-05-19 13:03:34.962000','2024-05-19 13:04:02.730761','2024-05-19 13:03:34.962000','와이','어딘가','집합!!',_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0	차승윤t\0	박태양x');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_seq`
--

DROP TABLE IF EXISTS `event_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_seq`
--

LOCK TABLES `event_seq` WRITE;
/*!40000 ALTER TABLE `event_seq` DISABLE KEYS */;
INSERT INTO `event_seq` VALUES (51);
/*!40000 ALTER TABLE `event_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `injury`
--

DROP TABLE IF EXISTS `injury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `injury` (
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `injury_id` int NOT NULL,
  `injury_level` int DEFAULT NULL,
  `is_contact` bit(1) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `injury_area` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `injury_cause` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`injury_id`),
  KEY `FK784qx8f1sqdx2c43vxax4d77f` (`member_id`),
  CONSTRAINT `FK784qx8f1sqdx2c43vxax4d77f` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `injury`
--

LOCK TABLES `injury` WRITE;
/*!40000 ALTER TABLE `injury` DISABLE KEYS */;
INSERT INTO `injury` VALUES (_binary '\0',1,2,_binary '\0',18,'2024-05-19 13:03:48.667854','2024-05-19 13:03:48.667854','stomach',''),(_binary '\0',3,4,_binary '',15,'2024-05-19 13:07:34.085597','2024-05-19 13:07:34.085597','chest','박태양이 때림'),(_binary '\0',4,2,_binary '\0',17,'2024-05-19 13:09:26.147833','2024-05-19 13:09:26.147833','rightLeg','오늘 축구하다가 햄스트링이 올라왔어요'),(_binary '\0',5,2,_binary '\0',16,'2024-05-19 13:12:51.847326','2024-05-19 13:12:51.847326','stomach',''),(_binary '\0',6,4,_binary '',20,'2024-05-19 13:16:23.766466','2024-05-19 13:16:23.766466','chest','박태양이 명치때림'),(_binary '\0',7,3,_binary '',18,'2024-05-19 13:22:12.129278','2024-05-19 13:22:12.129278','rightLeg',''),(_binary '\0',8,2,_binary '',18,'2024-05-19 14:06:14.124129','2024-05-19 14:06:14.124129','rightLeg','아파요잇'),(_binary '\0',9,1,_binary '',17,'2024-05-19 22:22:08.145516','2024-05-19 22:22:08.145516','rightArm','부딪혔어요'),(_binary '\0',10,1,_binary '',17,'2024-05-19 22:22:17.608243','2024-05-19 22:22:17.608243','leftLeg','왼쪽다리에요'),(_binary '\0',11,1,_binary '',17,'2024-05-19 22:24:20.903093','2024-05-19 22:24:20.903093','rightArm','왼쪽을 다쳤어요'),(_binary '\0',12,1,_binary '',17,'2024-05-19 22:25:24.182516','2024-05-19 22:25:24.182516','rightArm','왼쪽 팔을 다쳤어요'),(_binary '\0',13,1,_binary '\0',17,'2024-05-19 22:25:36.741628','2024-05-19 22:25:36.741628','leftLeg','허벅지 뒤쪽이 아파요');
/*!40000 ALTER TABLE `injury` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `injury_seq`
--

DROP TABLE IF EXISTS `injury_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `injury_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `injury_seq`
--

LOCK TABLES `injury_seq` WRITE;
/*!40000 ALTER TABLE `injury_seq` DISABLE KEYS */;
INSERT INTO `injury_seq` VALUES (101);
/*!40000 ALTER TABLE `injury_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `modified_date` datetime(6) DEFAULT NULL,
  `back_number` int DEFAULT NULL,
  `birth` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` int DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `o_auth_provider` tinyint DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FKcjte2jn9pvo9ud2hyfgwcja0k` (`team_id`),
  CONSTRAINT `FKcjte2jn9pvo9ud2hyfgwcja0k` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (14,'2024-05-19 12:49:52.497232',_binary '\0','2024-05-19 12:51:50.122484',0,'2024-05-19T12:49:52.611Z','shinhesoung@naver.com',24,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','신혜승',0,1,'01033682413',30,53),(15,'2024-05-19 12:50:54.353906',_binary '\0','2024-05-19 12:59:35.065498',0,'1998-01-19T12:59:20.000Z','cwj98019@nate.com',185,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','최원재',0,0,'01024195263',100,53),(16,'2024-05-19 12:51:31.495956',_binary '\0','2024-05-19 13:09:07.042651',1,'2024-05-19T12:51:31.617Z','suninis@naver.com',166,'https://bespo.s3.ap-northeast-2.amazonaws.com/member/image.png','선수연',0,0,'01062105821',53,53),(17,'2024-05-19 12:51:34.460959',_binary '\0','2024-05-19 13:18:15.937127',7,'2024-05-19T12:51:34.474Z','sycha112@naver.com',176,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','차승윤',0,0,'01071975295',72,53),(18,'2024-05-19 12:58:13.216542',_binary '\0','2024-05-19 14:06:51.493525',16,'2024-05-19T12:58:12.258Z','pty9714@naver.com',12412124,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','박태양',0,0,'01094703498',123213,53),(20,'2024-05-19 13:14:13.357195',_binary '\0','2024-05-19 13:15:15.783240',0,'1998-01-19T13:14:13.000Z',NULL,185,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','최원재',0,0,'01024195263',100,53),(21,'2024-05-19 14:05:52.442403',_binary '\0','2024-05-19 14:13:34.707793',0,'2024-05-19T14:05:52.865Z','tp06100@gmail.com',40,'https://bespo.s3.ap-northeast-2.amazonaws.com/default/member.PNG','가영이숯불두마리치킨',0,NULL,'01046028213 ',160,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memo`
--

DROP TABLE IF EXISTS `memo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memo` (
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `member_id` int DEFAULT NULL,
  `memo_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`memo_id`),
  KEY `FK5qolu1o1dg88dow8h0o9rsi9y` (`member_id`),
  KEY `FKggstqvnhekxvp2bam7knugufk` (`team_id`),
  CONSTRAINT `FK5qolu1o1dg88dow8h0o9rsi9y` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKggstqvnhekxvp2bam7knugufk` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memo`
--

LOCK TABLES `memo` WRITE;
/*!40000 ALTER TABLE `memo` DISABLE KEYS */;
INSERT INTO `memo` VALUES (_binary '\0',17,1,53,1,'2024-05-19 13:00:40.290453','2024-05-19 13:00:40.290453','병원 보내주세요',NULL,'혜승 감독님 저 다리가 아파요','PLAYER MANAGER'),(_binary '\0',16,2,53,0,'2024-05-19 13:05:43.024992','2024-05-19 13:05:43.024992','지금 포지션이 맞는 포지션인지 모르겠어요...',NULL,'포지션 고민','MANAGER'),(_binary '\0',18,3,53,0,'2024-05-19 13:17:24.884992','2024-05-19 13:17:24.884992','바보자식',NULL,'짜이와짜이','PLAYER MANAGER'),(_binary '\0',20,4,53,0,'2024-05-19 13:18:09.300648','2024-05-19 13:18:09.300648','박태양이 상습 폭행합니다',NULL,'박태양의 폭행','PLAYER MANAGER COACH CAPTAIN'),(_binary '\0',18,5,53,0,'2024-05-19 14:06:35.569700','2024-05-19 14:06:35.569700','힘들어요 ㅠㅠ',NULL,'집에 가고싶어요','MANAGER'),(_binary '\0',17,6,53,2,'2024-05-19 22:31:33.573911','2024-05-19 22:31:33.573911','일요일날 축구하다가 다쳤어요',NULL,'햄스트링을 당했어요','MANAGER');
/*!40000 ALTER TABLE `memo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memo_seq`
--

DROP TABLE IF EXISTS `memo_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memo_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memo_seq`
--

LOCK TABLES `memo_seq` WRITE;
/*!40000 ALTER TABLE `memo_seq` DISABLE KEYS */;
INSERT INTO `memo_seq` VALUES (101);
/*!40000 ALTER TABLE `memo_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `notification_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `writer_id` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKg1cu5xs1wl79tkro6uvw75m5c` (`team_id`),
  CONSTRAINT `FKg1cu5xs1wl79tkro6uvw75m5c` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (_binary '\0',1,53,14,'2024-05-19 13:04:52.364967','2024-05-19 13:04:52.364967',NULL,'다들 들으셈','공지입니다.');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_seq`
--

DROP TABLE IF EXISTS `notification_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_seq`
--

LOCK TABLES `notification_seq` WRITE;
/*!40000 ALTER TABLE `notification_seq` DISABLE KEYS */;
INSERT INTO `notification_seq` VALUES (51);
/*!40000 ALTER TABLE `notification_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `fatigue` int NOT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `member_id` int DEFAULT NULL,
  `mood` int NOT NULL,
  `muscle` int NOT NULL,
  `status_id` int NOT NULL,
  `stress` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  KEY `FK3c1nj5m2aj2jpyclw278wyr24` (`member_id`),
  CONSTRAINT `FK3c1nj5m2aj2jpyclw278wyr24` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (0,_binary '\0',18,0,0,1,0,'2024-05-19 13:03:39.529211','2024-05-19 13:03:39.529211'),(1,_binary '\0',17,3,3,3,2,'2024-05-19 13:06:34.212472','2024-05-19 13:06:34.212472'),(1,_binary '\0',16,3,1,4,2,'2024-05-19 13:12:09.370906','2024-05-19 13:12:09.370906'),(1,_binary '\0',16,2,2,5,2,'2024-05-19 13:12:33.666393','2024-05-19 13:12:33.666393'),(2,_binary '\0',17,4,3,6,3,'2024-05-19 13:17:58.617803','2024-05-19 13:17:58.617803'),(0,_binary '\0',18,0,0,7,0,'2024-05-19 13:22:08.540181','2024-05-19 13:22:08.540181'),(4,_binary '\0',18,3,2,8,3,'2024-05-19 14:06:06.589172','2024-05-19 14:06:06.589172'),(1,_binary '\0',17,2,3,9,2,'2024-05-19 22:21:54.635546','2024-05-19 22:21:54.635546'),(2,_binary '\0',17,3,1,10,1,'2024-05-19 22:23:56.016853','2024-05-19 22:23:56.016853');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_seq`
--

DROP TABLE IF EXISTS `status_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_seq`
--

LOCK TABLES `status_seq` WRITE;
/*!40000 ALTER TABLE `status_seq` DISABLE KEYS */;
INSERT INTO `status_seq` VALUES (101);
/*!40000 ALTER TABLE `status_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (53,'2024-05-19 12:51:50.110861',_binary '\0','2024-05-19 12:51:50.110861','rMyogG','https://bespo.s3.ap-northeast-2.amazonaws.com/team/blob','team1'),(54,'2024-05-19 12:53:46.668143',_binary '\0','2024-05-19 12:53:46.668143','fteAai','https://bespo.s3.ap-northeast-2.amazonaws.com/team/bm.png','맨유');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_seq`
--

DROP TABLE IF EXISTS `team_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_seq`
--

LOCK TABLES `team_seq` WRITE;
/*!40000 ALTER TABLE `team_seq` DISABLE KEYS */;
INSERT INTO `team_seq` VALUES (151);
/*!40000 ALTER TABLE `team_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `bpm` int DEFAULT NULL,
  `distance` double NOT NULL,
  `flag` bit(1) NOT NULL DEFAULT b'0',
  `member_id` int DEFAULT NULL,
  `training_id` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`training_id`),
  KEY `FK9xle9bjs9aig8qvn1wsumsxhm` (`member_id`),
  CONSTRAINT `FK9xle9bjs9aig8qvn1wsumsxhm` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_seq`
--

DROP TABLE IF EXISTS `training_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_seq`
--

LOCK TABLES `training_seq` WRITE;
/*!40000 ALTER TABLE `training_seq` DISABLE KEYS */;
INSERT INTO `training_seq` VALUES (1);
/*!40000 ALTER TABLE `training_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bespo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  7:34:38
