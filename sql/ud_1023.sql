-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 10 月 23 日 10:19
-- 伺服器版本: 10.1.29-MariaDB
-- PHP 版本： 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ud`
--

-- --------------------------------------------------------

--
-- 資料表結構 `diary`
--

CREATE TABLE `diary` (
  `id` int(11) NOT NULL COMMENT '編號',
  `username` int(11) NOT NULL COMMENT '連結member.username',
  `content` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL COMMENT '編號',
  `username` varchar(50) NOT NULL COMMENT 'e-mail',
  `name` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `username`, `name`, `created_at`, `updated_at`, `password`) VALUES
(1, 'goduu10202200@gmail.com', 'value2', '2018-10-21 15:28:21', '2018-10-21 15:28:21', ''),
(2, 'sandy010924', '余佩珊', '2018-10-22 16:21:25', '2018-10-22 16:21:25', 'buwwun-furgE8-nodsut'),
(3, 'sandy010924@gmail.com', '余佩珊', '2018-10-22 16:58:21', '2018-10-22 16:58:21', '1234'),
(4, ' ', ' ', '2018-10-23 08:16:43', '2018-10-23 08:16:43', ' ');

-- --------------------------------------------------------

--
-- 資料表結構 `scheduled`
--

CREATE TABLE `scheduled` (
  `id` int(11) NOT NULL COMMENT '編號',
  `username` int(11) NOT NULL COMMENT '連結member.username',
  `content` varchar(500) NOT NULL COMMENT '內容',
  `type` varchar(20) NOT NULL COMMENT '類別',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `scheduled`
--

INSERT INTO `scheduled` (`id`, `username`, `content`, `type`, `created_at`, `updated_at`, `location`) VALUES
(1, 1, 'eeeeeee', '', '2018-10-21 15:53:11', '2018-10-21 15:53:11', ''),
(2, 1, '測試', '感情', '2018-10-22 15:17:31', '2018-10-22 15:17:31', '中歐元'),
(3, 1, '測試', '感情', '2018-10-22 15:17:44', '2018-10-22 15:17:44', '中原');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usernameToid` (`username`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `scheduled`
--
ALTER TABLE `scheduled`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usernameToid` (`username`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `diary`
--
ALTER TABLE `diary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=5;

--
-- 使用資料表 AUTO_INCREMENT `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=4;

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `diary`
--
ALTER TABLE `diary`
  ADD CONSTRAINT `diary_ibfk_1` FOREIGN KEY (`username`) REFERENCES `member` (`id`);

--
-- 資料表的 Constraints `scheduled`
--
ALTER TABLE `scheduled`
  ADD CONSTRAINT `scheduled_ibfk_1` FOREIGN KEY (`username`) REFERENCES `member` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
