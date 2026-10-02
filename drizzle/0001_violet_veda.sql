CREATE TABLE `extractionRuns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int,
	`userId` int NOT NULL,
	`mode` enum('extract','crawl') NOT NULL,
	`target` varchar(2048) NOT NULL,
	`status` enum('queued','running','completed','failed') NOT NULL DEFAULT 'queued',
	`pagesDiscovered` int NOT NULL DEFAULT 0,
	`pagesProcessed` int NOT NULL DEFAULT 0,
	`extractedFields` int NOT NULL DEFAULT 0,
	`resultSummary` text,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `extractionRuns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`rootUrl` varchar(2048) NOT NULL,
	`description` text,
	`status` enum('active','paused') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `extractionRuns` ADD CONSTRAINT `extractionRuns_projectId_projects_id_fk` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `extractionRuns` ADD CONSTRAINT `extractionRuns_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `runs_user_id_idx` ON `extractionRuns` (`userId`);--> statement-breakpoint
CREATE INDEX `runs_project_id_idx` ON `extractionRuns` (`projectId`);--> statement-breakpoint
CREATE INDEX `projects_user_id_idx` ON `projects` (`userId`);