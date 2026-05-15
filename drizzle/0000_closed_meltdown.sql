CREATE TABLE `character` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`strength` integer NOT NULL,
	`dexterity` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`charisma` integer NOT NULL,
	`hp` integer NOT NULL,
	`weapon_id` integer NOT NULL,
	`armor_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`armor_id`) REFERENCES `armor`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE TABLE `weapon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `armor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ownership` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`char_id` integer NOT NULL,
	`item_id` integer NOT NULL,
	FOREIGN KEY (`char_id`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
