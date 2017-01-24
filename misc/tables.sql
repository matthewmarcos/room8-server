-- MYSQL 5.7.17
-- Ubuntu 16.04.1
-- Database: room8_dev
-- Host: localhost

-- user table
DROP TABLE IF EXISTS `user`;
CREATE TABLE user (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `username` VARCHAR(32) NOT NULL UNIQUE,
    `password` VARCHAR(128) NOT NULL,
    `email` VARCHAR(256) NOT NULL UNIQUE,
    `nickname` VARCHAR(12) NOT NULL,
    PRIMARY KEY(`id`)
);

-- user profile
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE user_profile (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `full_name` VARCHAR(64),
    `status` VARCHAR(128) NOT NULL,
    `cleanliness` VARCHAR(32), -- match with preferences
    `sex` ENUM('Male', 'Female', 'Do not care'), -- match with preferences
    `smoker` BOOL, -- match with preferences
    `has_org` BOOL, -- match with preferences
    `gender` VARCHAR(64),
    `course` VARCHAR(64),
    `batch` VARCHAR(4),
    `birthday` DATE,
    `contact_number` VARCHAR(16),
    `bio` VARCHAR(1024),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_organization`;
CREATE TABLE user_organization (
    `id` VARCHAR(128) NOT NULL,
    `organization` VARCHAR(128) NOT NULL,
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_hobby`;
CREATE TABLE user_hobby (
    `id` VARCHAR(128) NOT NULL,
    `hobby` VARCHAR(128) NOT NULL,
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_interest`;
CREATE TABLE user_interest (
    `id` VARCHAR(128) NOT NULL,
    `interest` VARCHAR(128) NOT NULL,
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- When Preferences
DROP TABLE IF EXISTS `user_preferences_when`;
CREATE TABLE user_preferences_when (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `start_date` DATE,
    `duration` ENUM('End of semester', 'Indefinitely'),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- Utilities preferences
DROP TABLE IF EXISTS `user_preferences_utilities`;
CREATE TABLE user_preferences_utilities (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `airconditioning` ENUM('Yes', 'No', 'Do not care'),
    `laundry` ENUM('Yes', 'No', 'Do not care'),
    `cooking` ENUM('Yes', 'No', 'Do not care'),
    `gas_stove` BOOL,
    `electric_stove` BOOL,
    `microwave` BOOL,
    `water_kettle` BOOL,
    `internet` ENUM('Yes', 'No', 'Do not care'),
    `torrent` ENUM('Yes', 'No', 'Do not care'),
    `speed_requirement` DECIMAL(5,2),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_preferences_lifestyle`;
CREATE TABLE user_preferences_lifestyle (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `alcohol` ENUM('Yes', 'No', 'Do not care'),
    `cleanliness` TINYINT,
    `smokers` ENUM('Yes', 'No', 'Do not care'),
    `study_time` ENUM('Morning', 'Evening', 'Both', 'Do not care'),
    `guests_in_room` ENUM('Yes', 'No', 'Do not care'),
    `guests_study_area` ENUM('Yes', 'No', 'Do not care'),
    `pets` ENUM('Yes', 'No', 'Do not care'),
    `org` ENUM('Yes', 'No', 'Do not care'),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_preferences_location`;
CREATE TABLE user_preferences_location (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `nearby_restaurants` ENUM('Yes', 'No', 'Do not care'),
    `travel_time_to_uplb` INTEGER,
    `general_location` VARCHAR(128),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_preferences_misc`;
CREATE TABLE user_preferences_misc (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `curfew` ENUM('Yes', 'No', 'Do not care'),
    `curflew_time` TIME,
    `message` VARCHAR(256),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- List of sexes the user wants to be matched with -> One to many
DROP TABLE IF EXISTS `user_preferences_sex`;
CREATE TABLE user_preferences_sex (
    `id` VARCHAR(128) NOT NULL,
    `sex` ENUM('Male' ,'Female' , 'Do not care'),
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

