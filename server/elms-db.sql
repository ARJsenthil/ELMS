-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2025 at 01:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ph_no` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `ph_no`, `email`, `password_hash`, `status`) VALUES
(1, 'Arjun C', '7708725405', 'arjun2442004@gmail.com', '$2b$10$bKXd8qRQDZJvSlZpK0WYn.sXfFKvfb7QPl8uAs2FSReciHBGPlzSi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `dept_code` varchar(11) NOT NULL,
  `dept_name` varchar(100) DEFAULT NULL,
  `dept_short_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `dept_code`, `dept_name`, `dept_short_name`, `created_at`, `updated_at`) VALUES
(25, 'Aaaaa', 'Aaarrrrrrrrrrrr', 'aaa', '2025-03-30 12:16:07', '2025-07-15 10:17:35'),
(336, 'A', 'A', 'a', '2025-04-04 06:32:59', '2025-05-24 12:49:58'),
(347, 'aaaA', 'ARA', 'aaaq', '2025-04-05 17:23:24', '2025-04-27 14:41:32'),
(349, 'Ar', 'Ar', 'ar', '2025-04-25 14:56:11', '2025-05-24 12:51:01'),
(354, '123', 'Vithu', 'vith', '2025-04-27 12:40:25', '2025-05-24 15:25:18'),
(355, 'Arj', 'Arjun c', 'arjun', '2025-05-19 07:44:18', '2025-05-28 08:58:37'),
(356, 'Abc', 'Abc', 'abc', '2025-05-26 13:59:22', '2025-05-26 13:59:22');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password_hash` varchar(50) DEFAULT NULL,
  `ConfirmPasswordHash` varchar(255) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city_town` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `ph_no` varchar(15) NOT NULL,
  `status` enum('Active','Inactive','On Leave') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `firstname`, `lastname`, `email`, `password_hash`, `ConfirmPasswordHash`, `gender`, `dob`, `dept_id`, `country`, `city_town`, `address`, `ph_no`, `status`, `created_at`, `updated_at`) VALUES
(12, 'Aa', 'Aa', 'aaa', 'aa', NULL, 'male', '2004-04-21', 347, 'aa', 'aa', 'aa', '8888888888', 'Active', '2025-05-07 09:49:57', '2025-05-24 12:26:29'),
(13, 'New', 'N', 'new@gmail.com', NULL, NULL, 'male', '2025-12-31', 336, 'ab', 'new', 'new', '8921739871', 'Active', '2025-05-21 17:12:15', '2025-05-24 12:26:36'),
(14, 'Akash', 'H', 'akash@gmail.com', NULL, NULL, 'male', '2004-08-10', 349, 'india', 'cuddalore', 'ot', '9600618871', 'Active', '2025-05-23 10:32:30', '2025-05-24 12:26:44'),
(15, 'Arjun', 'Cha', 'arjun.chandrasekar04@gmail.com', '$2b$05$oUbHwkCr7cvbJHJTh0Gzn.3AqQo8CfyYYt8LlERYmb7', NULL, 'male', '2004-04-21', 336, 'India', 'vadalur', '87, palkaran colony, vadalur', '7708725405', 'Active', '2025-06-30 10:23:50', '2025-07-16 16:00:17');

-- --------------------------------------------------------

--
-- Table structure for table `leave_request`
--

CREATE TABLE `leave_request` (
  `id` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `leave_type` varchar(100) NOT NULL,
  `reson` text NOT NULL,
  `emp_code` int(11) DEFAULT NULL,
  `leave_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `admin_remark` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_type`
--

CREATE TABLE `leave_type` (
  `id` int(11) NOT NULL,
  `leave_type` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Active','Inactive','On Leave') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_type`
--

INSERT INTO `leave_type` (`id`, `leave_type`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Arjun', 'a', '', '2025-04-06 11:11:45', '2025-05-24 12:53:19'),
(9, 'Aa', 'a', '', '2025-05-16 09:46:47', '2025-05-24 12:53:23'),
(12, 'Health Issue', 'Fever, Cold, Caugh ..', '', '2025-05-21 14:35:21', '2025-05-21 14:43:55'),
(13, 'Medical issue', 'medi', '', '2025-05-21 14:40:46', '2025-05-24 15:24:59'),
(17, 'Function', 'wedding, festival', 'Active', '2025-07-20 14:57:56', '2025-07-20 14:57:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` mediumtext NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT 'employee',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`id`, `username`, `password`, `email`, `type`, `created_at`, `updated_at`) VALUES
(15, 'a', 'a', NULL, 'employee', '2025-03-30 02:55:06', '2025-03-30 02:55:06'),
(20, 'arjun1', '$2b$05$RFkRjgQXOi2HCyksxWPE3.7KOlvDHX4bhGB2IJwJx6h.xX3nHQjYq', 'arj1@gmail.com', 'employee', '2025-05-09 13:10:19', '2025-05-09 13:10:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `DeptCode` (`dept_code`),
  ADD UNIQUE KEY `dept_name` (`dept_name`),
  ADD UNIQUE KEY `dept_short_name` (`dept_short_name`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`),
  ADD UNIQUE KEY `PhoneNumber` (`ph_no`),
  ADD KEY `DeptCode` (`dept_id`);

--
-- Indexes for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmployeeCode` (`emp_code`);

--
-- Indexes for table `leave_type`
--
ALTER TABLE `leave_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leave_type` (`leave_type`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `created_at` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `leave_request`
--
ALTER TABLE `leave_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `leave_type`
--
ALTER TABLE `leave_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `employee_ref_department` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD CONSTRAINT `leave_request_ibfk_1` FOREIGN KEY (`emp_code`) REFERENCES `employee` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leave_request_ref_leave_type` FOREIGN KEY (`emp_code`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
