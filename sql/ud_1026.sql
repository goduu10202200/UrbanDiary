-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 10 月 26 日 15:50
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
(1, 1, '今天早上的CCNA很無聊，不知道老師在教什麼，我就開始跟旁邊的同學聊天。\r\n下午在專題教室寫程式一直問吳冠興問題，\r\n寫完程式去打籃球，但是今天怎麼投籃都投不進，\r\n好想要會打籃球!!', '2018-10-24 17:38:41', '2018-10-24 17:38:41', ''),
(2, 1, '快才能才能猜測太倉促\n呢暖男\n給哦弄痛\n可呢溫暖\n可挪威男\n可呢呢餓呢\n', '2018-10-24 17:39:00', '2018-10-24 17:39:00', ''),
(3, 1, '', '2018-10-24 18:12:35', '2018-10-24 18:12:35', ''),
(4, 1, '', '2018-10-24 18:13:54', '2018-10-24 18:13:54', ''),
(5, 1, 'xxxd', '2018-10-25 15:15:59', '2018-10-25 15:15:59', ''),
(6, 1, 'vgg', '2018-10-25 15:17:41', '2018-10-25 15:17:41', ''),
(7, 1, 'bhutto', '2018-10-25 15:17:45', '2018-10-25 15:17:45', ''),
(8, 1, '岡山羊肉爐要跟邱于芸告白日本東京背單字', '2018-10-25 17:32:54', '2018-10-25 17:32:54', ''),
(9, 1, '要跟邱于芸告白，但她喜歡又會運動又高學歷', '2018-10-25 17:33:38', '2018-10-25 17:33:38', ''),
(10, 1, 'ㄩㄑㄎㄎㄕㄕ', '2018-10-25 18:14:57', '2018-10-25 18:14:57', ''),
(11, 1, '跑三圈操場，但她喜歡的是又會運動又會讀書的男生', '2018-10-25 18:23:06', '2018-10-25 18:23:06', ''),
(12, 1, '跑三圈操場，有一個⋯', '2018-10-25 18:32:51', '2018-10-25 18:32:51', ''),
(13, 1, '在台大體育館,跑三圈操場\n她喜歡會讀書又會運動的男孩', '2018-10-26 02:15:43', '2018-10-26 02:15:43', '');

-- --------------------------------------------------------

--
-- 資料表結構 `jieba`
--

CREATE TABLE `jieba` (
  `id` int(11) NOT NULL,
  `word` varchar(200) NOT NULL,
  `sentence` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 資料表的匯出資料 `jieba`
--

INSERT INTO `jieba` (`id`, `word`, `sentence`, `created_at`) VALUES
(1, 'ddddd', '', '2018-10-25 20:01:33');

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
(2, ' ', ' ', '2018-10-25 17:39:29', '2018-10-25 17:39:29', ' '),
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表 AUTO_INCREMENT `jieba`
--
ALTER TABLE `jieba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=4;

--
-- 使用資料表 AUTO_INCREMENT `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=17;

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
