DROP DATABASE IF EXISTS `employee_db`;
CREATE DATABASE `employee_db`;
USE `employee_db`;

CREATE TABLE `employees`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(63) NOT NULL,
    `position` VARCHAR(63) NOT NULL,
    `join_date` DATE NOT NULL,
    `release_date` DATE DEFAULT NULL,
    `year_of_experience` FLOAT UNSIGNED NOT NULL,
    `salary` INT UNSIGNED NOT NULL
);

INSERT INTO `employees`(
        `name`, 
        `position`, 
        `join_date`, 
        `release_date`, 
        `year_of_experience`, 
        `salary`
    )
    VALUES
        ("Jacky", "Solution Architect", "2018-07-18", "2022-07-22", 8, 150),
        ("John", "Assistant Manager", "2016-02-02", "2021-02-02", 12, 155),
        ("Alano", "Manager", "2010-11-09", NULL, 14, 175),
        ("Aaron", "Engineer", "2021-08-16", "2022-08-16", 1, 80),
        ("Allen", "Engineer", "2024-06-06", NULL, 4, 75),
        ("Peter", "Team Leader", "2020-01-09", NULL, 3, 85)
    ;