-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 10 月 24 日 19:43
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
  `id` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `diary`
--

INSERT INTO `diary` (`id`, `username`, `content`, `created_at`, `updated_at`, `location`) VALUES
(1, 1, '快才能才能猜測太倉促\n', '2018-10-24 17:38:41', '2018-10-24 17:38:41', ''),
(2, 1, '快才能才能猜測太倉促\n呢暖男\n給哦弄痛\n可呢溫暖\n可挪威男\n可呢呢餓呢\n', '2018-10-24 17:39:00', '2018-10-24 17:39:00', '');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL COMMENT '編號',
  `username` varchar(50) NOT NULL COMMENT 'e-mail',
  `name` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `username`, `name`, `created_at`, `updated_at`) VALUES
(1, 'goduu10202200@gmail.com', 'value2', '2018-10-21 15:28:21', '2018-10-21 15:28:21');

-- --------------------------------------------------------

--
-- 資料表結構 `scheduled`
--

CREATE TABLE `scheduled` (
  `id` int(11) NOT NULL COMMENT '編號',
  `username` int(11) NOT NULL COMMENT '連結member.username',
  `title` varchar(255) NOT NULL COMMENT '標題',
  `content` varchar(500) NOT NULL COMMENT '內容',
  `type` varchar(20) NOT NULL COMMENT '類別',
  `location` varchar(255) NOT NULL COMMENT '地點',
  `date` varchar(50) NOT NULL COMMENT '日期',
  `time` varchar(255) NOT NULL COMMENT '時間',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '完成與否',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `scheduled`
--

INSERT INTO `scheduled` (`id`, `username`, `title`, `content`, `type`, `location`, `date`, `time`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '', 'eeeeeee', '', '', '', '', 0, '2018-10-21 15:53:11', '2018-10-21 15:53:11'),
(2, 1, '', '', '', '', '', '', 0, '2018-10-24 07:55:01', '2018-10-24 07:55:01'),
(3, 1, ' ', '', ' ', ' ', 'Wed Oct 24 2018', '20:27:58 GMT+0800 (CST)', 0, '2018-10-24 12:28:00', '2018-10-24 12:28:00'),
(4, 1, '刷牙', '', 'pizza', '家裡', 'Sat Oct 27 2018', '20:26:32 GMT+0800 (CST)', 0, '2018-10-24 12:29:16', '2018-10-24 12:29:16'),
(5, 1, '出去走走', '', 'trip', '山上', 'Wed Oct 24 2018', '20:58:28 GMT+0800 (CST)', 0, '2018-10-24 12:58:56', '2018-10-24 12:58:56'),
(6, 1, '', '', '', '', '', '', 0, '2018-10-24 16:05:15', '2018-10-24 16:05:15'),
(7, 1, ' ', '', ' ', ' ', 'Thu Oct 25 2018', '00:14:20 GMT+0800 (CST)', 0, '2018-10-24 16:14:31', '2018-10-24 16:14:31'),
(8, 1, ' ', '', ' ', ' ', 'Thu Oct 25 2018', '00:22:58 GMT+0800 (CST)', 0, '2018-10-24 16:23:00', '2018-10-24 16:23:00');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=2;

--
-- 使用資料表 AUTO_INCREMENT `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=9;

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
