/*
  Warnings:

  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `refresh_token` TINYTEXT NULL;
