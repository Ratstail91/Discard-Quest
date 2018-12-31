/* create the database itself */
CREATE DATABASE IF NOT EXISTS discard;
USE discard;

/* logging */
CREATE TABLE IF NOT EXISTS log (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	discordID bigint,
	time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	type varchar(32),
	data varchar(255)
);

/* user information */
CREATE TABLE IF NOT EXISTS user (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	discordID bigint NOT NULL,
	timeJoined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* basic inventory */
CREATE TABLE IF NOT EXISTS inventory (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userID int UNIQUE,
	FOREIGN KEY (userID) REFERENCES user(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS item (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	inventoryID int,
	FOREIGN KEY (inventoryID) REFERENCES inventory(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	/* TODO: crystal, card or badge information */
);

/* the user's cards */
CREATE TABLE IF NOT EXISTS deck (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userID int UNIQUE,
	FOREIGN KEY (userID) REFERENCES user(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS card (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	deckID int,
	FOREIGN KEY (deckID) REFERENCES deck(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	/* TODO: card information */
);

/* the user's badges */
CREATE TABLE IF NOT EXISTS belt (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userID int UNIQUE,
	FOREIGN KEY (userID) REFERENCES user(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	/* TODO: badge count */
);

CREATE TABLE IF NOT EXISTS badge (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	beltID int,
	FOREIGN KEY (beltID) REFERENCES belt(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	/* TODO: badge information */
);