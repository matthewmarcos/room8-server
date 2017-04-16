-- MYSQL 5.7.17
-- Ubuntu 16.04.1
-- Database: room8_dev
-- Host: localhost

-- user table
DROP TABLE IF EXISTS `user`;
CREATE TABLE user (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `username` VARCHAR(32) NOT NULL UNIQUE,
    `email` VARCHAR(256) NOT NULL UNIQUE,
    `password` VARCHAR(128) NOT NULL,
    `nickname` VARCHAR(12) NOT NULL,
    `time_registered` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- user profile
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE user_profile (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `full_name` VARCHAR(64) DEFAULT '',
    `status` ENUM('I am looking for a room', 'I have a room') DEFAULT 'I am looking for a room',
    `cleanliness` TINYINT DEFAULT 1, -- match with preferences
    `sex` ENUM('Male', 'Female', 'Do not know') DEFAULT 'Do not know', -- match with preferences
    `smoker` ENUM('Yes', 'No') DEFAULT 'Yes', -- match with preferences
    `has_org` ENUM('Yes', 'No') DEFAULT 'Yes', -- match with preferences? -> Please check if you can just do a join instead
    `gender` VARCHAR(64) DEFAULT '',
    `course` VARCHAR(64) DEFAULT '',
    `batch` VARCHAR(4) DEFAULT '',
    `birthday` DATE DEFAULT '1000-01-01',
    `contact_number` VARCHAR(16) DEFAULT '',
    `bio` VARCHAR(1024) DEFAULT '',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_organization`;
CREATE TABLE user_organization (
    `id` VARCHAR(128) NOT NULL,
    `organization` VARCHAR(128) NOT NULL DEFAULT '',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_hobby`;
CREATE TABLE user_hobby (
    `id` VARCHAR(128) NOT NULL,
    `hobby` VARCHAR(128) NOT NULL DEFAULT '',
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
    `start_date` DATE DEFAULT '1000-01-01',
    `duration` ENUM('End of semester', 'Indefinitely') DEFAULT 'Indefinitely',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- Cost Preference
DROP TABLE IF EXISTS `user_preferences_cost`;
CREATE TABLE user_preferences_cost (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `rent_price_range_start` INTEGER DEFAULT 0,
    `rent_price_range_end` INTEGER DEFAULT 0,
    `should_include_utilities` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `utilities_price_range_start` INTEGER DEFAULT 0,
    `utilities_price_range_end` INTEGER DEFAULT 0,
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- Location Preferences
DROP TABLE IF EXISTS `user_preferences_location`;
CREATE TABLE user_preferences_location (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `nearby_restaurants` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `travel_time_to_uplb` INTEGER DEFAULT 120,
    `general_location` VARCHAR(128) DEFAULT '',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);
-- Utilities preferences
DROP TABLE IF EXISTS `user_preferences_utilities`;
CREATE TABLE user_preferences_utilities (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `airconditioning` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `laundry` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `cooking` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `gas_stove` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `electric_stove` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `microwave` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `water_kettle` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `internet` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `torrent` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `speed_requirement` DECIMAL(5,2) DEFAULT 1.0,
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_preferences_lifestyle`;
CREATE TABLE user_preferences_lifestyle (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `alcohol` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `cleanliness` TINYINT DEFAULT 0,
    `smokers` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `study_time` ENUM('Morning', 'Evening', 'Both', 'Do not care') DEFAULT 'Do not care',
    `guests_in_room` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `guests_study_area` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `pets` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `org` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

DROP TABLE IF EXISTS `user_preferences_misc`;
CREATE TABLE user_preferences_misc (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `curfew` ENUM('Yes', 'No', 'Do not care') DEFAULT 'Do not care',
    `curfew_time` TIME DEFAULT '00:00:00',
    `message` VARCHAR(256) DEFAULT '',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

-- List of sexes the user wants to be matched with -> One to many
DROP TABLE IF EXISTS `user_preferences_sex`;
CREATE TABLE user_preferences_sex (
    `id` VARCHAR(128) NOT NULL,
    `sex` ENUM('Male' ,'Female' , 'Do not care') DEFAULT 'Do not care',
    FOREIGN KEY(`id`) REFERENCES user(`id`)
);

