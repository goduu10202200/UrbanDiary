-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 10 月 30 日 16:01
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
  `location` varchar(50) NOT NULL,
  `jieba_check` int(5) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `jieba`
--

CREATE TABLE `jieba` (
  `id` int(11) NOT NULL,
  `word` varchar(200) NOT NULL,
  `sentence` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diary_id` int(100) NOT NULL
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
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `username`, `name`, `created_at`, `updated_at`, `password`) VALUES
(1, 'mau123@gmail.com', '小茂', '2018-10-21 15:28:21', '2018-10-21 15:28:21', '1234'),
(2, ' goduu10202200@gmail.com', ' 陳致佑', '2018-10-25 17:39:29', '2018-10-25 17:39:29', ' 1234'),
(3, 'sandy010924@gmail.com', '余佩珊', '2018-10-25 17:40:24', '2018-10-25 17:40:24', '1234');

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
  `kind` varchar(20) NOT NULL DEFAULT 'list' COMMENT '種類',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `scheduled`
--

INSERT INTO `scheduled` (`id`, `username`, `title`, `content`, `type`, `location`, `date`, `time`, `status`, `kind`, `created_at`, `updated_at`) VALUES
(25, 1, '準備開會報告', '', 'schoolwork', '台灣台北市大安區圖書館', '2018-10-30', '09:00', 0, 'list', '2018-10-29 15:47:10', '2018-10-29 15:47:10'),
(26, 1, '大學同學會聚餐', '', 'eat', '台灣台北市一蘭拉麵', '2018-10-30', '12:00', 0, 'list', '2018-10-29 15:48:05', '2018-10-29 15:48:05'),
(27, 1, '和小睿逛逛', '', 'trip', '台灣台北市中台北地下街', '2018-10-30', '15:00', 1, 'list', '2018-10-29 15:51:23', '2018-10-29 15:51:23');

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
-- 資料表索引 `jieba`
--
ALTER TABLE `jieba`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用資料表 AUTO_INCREMENT `jieba`
--
ALTER TABLE `jieba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=4;

--
-- 使用資料表 AUTO_INCREMENT `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=59;

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
