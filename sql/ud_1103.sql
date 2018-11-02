-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 11 月 02 日 13:22
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

--
-- 資料表的匯出資料 `diary`
--

INSERT INTO `diary` (`id`, `username`, `content`, `created_at`, `updated_at`, `location`, `jieba_check`, `date`) VALUES
(17, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！\n在台灣台北市大安區台大綜合體育館，跑三圈操場\n她喜歡會讀書和運動的男孩', '2018-11-01 17:29:24', '2018-11-01 17:29:24', '', 1, '2018-11-02'),
(18, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:33:11', '2018-11-02 06:33:11', '', 1, '2018-11-02'),
(19, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:43:59', '2018-11-02 06:43:59', '', 1, '2018-11-02'),
(20, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:44:02', '2018-11-02 06:44:02', '', 1, '2018-11-02'),
(21, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:44:06', '2018-11-02 06:44:06', '', 1, '2018-11-02'),
(22, 2, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！\n我要去運動', '2018-11-02 06:56:24', '2018-11-02 06:56:24', '', 1, '2018-11-02'),
(23, 3, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！\n她喜歡又愛運動又會讀書的男孩', '2018-11-02 07:43:06', '2018-11-02 07:43:06', '', 1, '2018-11-02'),
(24, 3, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！\n她喜歡又愛運動又會讀書的男孩\n我想打桌球', '2018-11-02 07:57:18', '2018-11-02 07:57:18', '', 1, '2018-11-02'),
(25, 3, '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！\n我想打桌球\n我想打籃球\n', '2018-11-02 08:02:58', '2018-11-02 08:02:58', '', 1, '2018-11-02'),
(26, 3, '我想打桌球\r\n我想打籃球\r\n高爾夫球打很爛', '2018-11-02 08:03:49', '2018-11-02 08:03:49', '', 1, '2018-11-02'),
(27, 2, '我想打桌球\r\n我想打籃球\r\n高爾夫球打很爛\r\n躲避球好好玩', '2018-11-02 08:04:32', '2018-11-02 08:04:32', '', 1, '2018-11-02');

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

--
-- 資料表的匯出資料 `jieba`
--

INSERT INTO `jieba` (`id`, `word`, `sentence`, `created_at`, `diary_id`) VALUES
(30, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-01 17:29:27', 17),
(31, '大安區,台灣,綜合,操場', '在台灣台北市大安區台大綜合體育館，跑三圈操場', '2018-11-01 17:29:27', 17),
(32, '喜歡,運動,讀書,男孩', '她喜歡會讀書和運動的男孩', '2018-11-01 17:29:27', 17),
(33, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:33:14', 18),
(34, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:44:01', 19),
(35, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:44:04', 20),
(36, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:44:08', 21),
(37, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 06:56:25', 22),
(38, '運動', '我要去運動', '2018-11-02 06:56:25', 22),
(39, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 07:43:09', 23),
(40, '喜歡,運動,讀書,男孩', '她喜歡又愛運動又會讀書的男孩', '2018-11-02 07:43:09', 23),
(41, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 07:57:20', 24),
(42, '喜歡,運動,讀書,男孩', '她喜歡又愛運動又會讀書的男孩', '2018-11-02 07:57:20', 24),
(43, '桌球', '我想打桌球', '2018-11-02 07:57:20', 24),
(44, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 08:03:00', 25),
(45, '桌球', '我想打桌球', '2018-11-02 08:03:00', 25),
(46, '籃球', '我想打籃球', '2018-11-02 08:03:00', 25),
(47, '', '', '2018-11-02 08:03:00', 25),
(48, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 08:03:51', 26),
(49, '桌球', '我想打桌球', '2018-11-02 08:03:51', 26),
(50, '籃球', '我想打籃球', '2018-11-02 08:03:51', 26),
(51, '很爛,高爾夫球', '高爾夫球打很爛', '2018-11-02 08:03:51', 26),
(52, '拉麵,地下街,初音,一蘭', '今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！', '2018-11-02 08:04:34', 27),
(53, '桌球', '我想打桌球', '2018-11-02 08:04:34', 27),
(54, '籃球', '我想打籃球', '2018-11-02 08:04:34', 27),
(55, '很爛,高爾夫球', '高爾夫球打很爛', '2018-11-02 08:04:34', 27),
(56, '好好玩,躲避球', '躲避球好好玩', '2018-11-02 08:04:34', 27);

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
(25, 1, '準備開會報告', '', 'schoolwork', '台灣台北市大安區圖書館', '2018-11-03', '09:00', 1, 'list', '2018-10-29 15:47:10', '2018-10-29 15:47:10'),
(26, 1, '大學同學會聚餐', '', 'eat', '台灣台北市一蘭拉麵', '2018-11-03', '12:00', 1, 'list', '2018-10-29 15:48:05', '2018-10-29 15:48:05'),
(27, 1, '和小睿逛逛', '', 'trip', '台灣台北市中台北地下街', '2018-11-03', '15:00', 1, 'list', '2018-10-29 15:51:23', '2018-10-29 15:51:23'),
(70, 1, '讀書二小時', '', ' ', '', '2018-11-04', '', 1, 'future', '2018-10-30 16:49:02', '2018-10-30 16:49:02'),
(71, 1, '練投籃球100顆', '', ' ', '', '2018-11-04', '', 0, 'future', '2018-10-30 16:49:05', '2018-10-30 16:49:05'),
(72, 1, '騎單車一小時', '', ' ', '', '2018-11-05', '', 0, 'future', '2018-10-30 16:49:07', '2018-10-30 16:49:07');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- 使用資料表 AUTO_INCREMENT `jieba`
--
ALTER TABLE `jieba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=37;

--
-- 使用資料表 AUTO_INCREMENT `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=74;

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
