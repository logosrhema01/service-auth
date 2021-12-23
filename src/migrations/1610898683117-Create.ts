import {MigrationInterface, QueryRunner} from "typeorm";

export class Create1610898683117 implements MigrationInterface {
    name = 'Create1610898683117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tracking` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL DEFAULT '', `serviceId` varchar(255) NOT NULL, `teamId` varchar(255) NOT NULL, `secretId` varchar(32) NOT NULL, `lastActivity` datetime NULL, `triggered` int NULL DEFAULT '0', `isActive` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `event_trigger` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `delayS` int NOT NULL DEFAULT '0', `delayType` int NOT NULL DEFAULT '0', `conditions` json NOT NULL, `templateId` varchar(32) NOT NULL, `trackingId` int NOT NULL, PRIMARY KEY (`id`, `trackingId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `event_trigger_data` (`id` int NOT NULL AUTO_INCREMENT, `phoneNumber` varchar(16) NOT NULL, `orderId` varchar(64) NOT NULL, `params` json NOT NULL, `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `response` json NOT NULL, `status` varchar(10) NOT NULL, `triggerId` int NOT NULL, `trackingId` int NOT NULL, INDEX `IDX_741be62133fcd0cc316593ab2c` (`phoneNumber`), INDEX `IDX_ee9d3abafa9add001d3a859f45` (`orderId`), PRIMARY KEY (`id`, `trackingId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `event_trigger` ADD CONSTRAINT `FK_9d6eb12b755b4e568e11f84ff34` FOREIGN KEY (`trackingId`) REFERENCES `tracking`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `event_trigger_data` ADD CONSTRAINT `FK_8e118913418f86701043eb74c59` FOREIGN KEY (`trackingId`) REFERENCES `tracking`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `event_trigger_data` DROP FOREIGN KEY `FK_8e118913418f86701043eb74c59`");
        await queryRunner.query("ALTER TABLE `event_trigger` DROP FOREIGN KEY `FK_9d6eb12b755b4e568e11f84ff34`");
        await queryRunner.query("DROP INDEX `IDX_ee9d3abafa9add001d3a859f45` ON `event_trigger_data`");
        await queryRunner.query("DROP INDEX `IDX_741be62133fcd0cc316593ab2c` ON `event_trigger_data`");
        await queryRunner.query("DROP TABLE `event_trigger_data`");
        await queryRunner.query("DROP TABLE `event_trigger`");
        await queryRunner.query("DROP TABLE `tracking`");
    }

}
