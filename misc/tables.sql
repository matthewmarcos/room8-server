-- MYSQL 5.7.17
-- Ubuntu 16.04.1
-- Database: room8
-- Host: localhost

-- user table
CREATE TABLE user (
    `id` VARCHAR(128) NOT NULL UNIQUE,
    `username` VARCHAR(32) NOT NULL UNIQUE,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
