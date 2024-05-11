import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('474f6412-d23b-40ed-946d-a11d7eb7401c', '1Leilani_Schinner@gmail.com', 'Charlie Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('45355205-4d29-4b8e-8e95-45f5d36de5bb', '7Elaina82@yahoo.com', 'Diana Prince', 'https://i.imgur.com/YfJQV5z.png?id=9', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '19Guy.Lindgren@yahoo.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=21', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('375f8dd9-e06a-40ad-bca7-b306c0921ea5', '25Colleen28@hotmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=27', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('ea5c0b2f-57a5-4aec-89b9-90836bc9cefa', '31Maurice83@hotmail.com', 'Ethan Hunt', 'https://i.imgur.com/YfJQV5z.png?id=33', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('19e4a1d7-95c1-444b-b794-4d40f05d5721', '37Mattie.Zemlak51@hotmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=39', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('65783082-58ea-4749-8b57-9e6cbcff5e07', '43Millie.Lakin@hotmail.com', 'Diana Prince', 'https://i.imgur.com/YfJQV5z.png?id=45', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('2ca4e4c3-6f63-4c66-a501-8054991155f4', '49Lindsey_Schneider57@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('dfc72871-3ca1-40be-8c01-51719d1ea00b', '55Bryce.Macejkovic7@gmail.com', 'Charlie Brown', 'https://i.imgur.com/YfJQV5z.png?id=57', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('ecf7ca12-2f64-4819-9591-41543fc43090', 'Payment Reminder', 'You have been invited to join the Family Vacation expense group.', 'Expense Manager', '64Manuel.Jenkins@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('45e63acc-715b-4215-a1d2-15c152aa5007', 'Payment Reminder', 'Your payment of 30.00 to Alice Smith has been confirmed.', 'Expense Manager', '71Virgil23@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=72', 'https://i.imgur.com/YfJQV5z.png?id=73', '65783082-58ea-4749-8b57-9e6cbcff5e07');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('18b752a3-2af0-439a-8bde-2047f908f45f', 'Expense Split Update', 'A new expense for office supplies has been added by Bob.', 'John Doe', '78Felix44@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=79', 'https://i.imgur.com/YfJQV5z.png?id=80', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('d1bef56e-d177-4832-945a-ec34b18762ed', 'Expense Added', 'You have been invited to join the Family Vacation expense group.', 'Expense Manager', '85Arvid.Toy@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=86', 'https://i.imgur.com/YfJQV5z.png?id=87', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('19d6d9ce-c0db-4303-86b1-2dc22914d488', 'Expense Added', 'The expense for the team dinner has been updated.', 'Group Admin', '92Rodger_Pouros35@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=93', 'https://i.imgur.com/YfJQV5z.png?id=94', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('730e405e-5ee7-4281-8fb5-d0caa8d8204e', 'Payment Reminder', 'You have a pending payment to John Doe for 45.00.', 'Bob Johnson', '99Jarred.Abshire57@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=100', 'https://i.imgur.com/YfJQV5z.png?id=101', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('096a297e-3b33-4319-814c-d679fc8b4ef2', 'Expense Split Update', 'The expense for the team dinner has been updated.', 'John Doe', '106Marta_Brakus70@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=107', 'https://i.imgur.com/YfJQV5z.png?id=108', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('bff7c5c8-8c36-4c64-84f6-474403771968', 'Expense Split Update', 'A new expense for office supplies has been added by Bob.', 'John Doe', '113Penelope74@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=114', 'https://i.imgur.com/YfJQV5z.png?id=115', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('2a6a2c3f-a50f-4a89-86a0-572ddd354492', 'Payment Confirmation', 'You have been invited to join the Family Vacation expense group.', 'Group Admin', '120Vern.Barrows81@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('beacb42d-d969-445a-8df3-80d88a0595dd', 'New Group Invitation', 'The expense for the team dinner has been updated.', 'John Doe', '127Nils.Dooley31@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=128', 'https://i.imgur.com/YfJQV5z.png?id=129', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');

INSERT INTO "group" ("id", "name", "createdById") VALUES ('324155e5-79c6-467e-8b9a-17bdcc906628', 'Travel Group 2023', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('6ac05fbe-0fe7-46fe-aa25-e856dfb1a190', 'Adventure Buddies', '65783082-58ea-4749-8b57-9e6cbcff5e07');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('a0f77534-7f04-4433-89c2-0e9fc1151f1a', 'Travel Group 2023', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('5629cb61-5d14-424d-837a-36982ac2814f', 'Family Finances', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('b8f481f2-18ce-47fe-915b-c0698ebee1b7', 'Family Finances', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('77427edd-0499-49b4-af05-1fea8ba009d9', 'Adventure Buddies', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('e96fc55e-834e-4feb-a41c-50f52c382afd', 'Roommates Split', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('01f10fbd-cd8c-43da-9d37-c65d6987da82', 'Adventure Buddies', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('ecd7d5a5-255a-434c-bad0-ab5b04301a24', 'Work Expenses', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "group" ("id", "name", "createdById") VALUES ('0c0da97b-9921-459a-8009-5fead352d4bd', 'Work Expenses', '2ca4e4c3-6f63-4c66-a501-8054991155f4');

INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('22047316-f196-49b4-a176-e6fd15a31887', 'cancelled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '01f10fbd-cd8c-43da-9d37-c65d6987da82');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('893aaee3-acca-4b88-82d1-d4ada5e9dd61', 'active', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '77427edd-0499-49b4-af05-1fea8ba009d9');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('5cf822eb-711e-41ad-bf1d-25a5e0cc70cf', 'active', '375f8dd9-e06a-40ad-bca7-b306c0921ea5', 'b8f481f2-18ce-47fe-915b-c0698ebee1b7');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('f8c9bcce-4c71-40b8-93a5-1a23de7d35fd', 'active', 'dfc72871-3ca1-40be-8c01-51719d1ea00b', '324155e5-79c6-467e-8b9a-17bdcc906628');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('8d824582-89ca-4037-815d-a5bf633ca5e8', 'active', '45355205-4d29-4b8e-8e95-45f5d36de5bb', '77427edd-0499-49b4-af05-1fea8ba009d9');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('a7ff8dac-19c4-48b7-9325-408e04665836', 'active', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '0c0da97b-9921-459a-8009-5fead352d4bd');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('4e7be3c3-8ebe-4581-b2d5-dc0ab78a0861', 'suspended', '65783082-58ea-4749-8b57-9e6cbcff5e07', 'e96fc55e-834e-4feb-a41c-50f52c382afd');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('364b1211-7d31-447b-bca0-eb4877dc9551', 'pending', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa', 'a0f77534-7f04-4433-89c2-0e9fc1151f1a');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('6a3b3cdc-8d40-4abd-a4bc-5c4b1150f23b', 'inactive', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa', 'ecd7d5a5-255a-434c-bad0-ab5b04301a24');
INSERT INTO "membership" ("id", "status", "userId", "groupId") VALUES ('c266f920-8681-4326-aa12-b3badd7e7e38', 'cancelled', '2ca4e4c3-6f63-4c66-a501-8054991155f4', 'e96fc55e-834e-4feb-a41c-50f52c382afd');

INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('cdab7db1-25e7-4184-a6d4-e26ded0a48ae', 'Movie Night Tickets', 268, '375f8dd9-e06a-40ad-bca7-b306c0921ea5', 'b8f481f2-18ce-47fe-915b-c0698ebee1b7');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('14b3a459-eedb-461a-8663-2ea21ebf398b', 'Dinner at Italian Restaurant', 733, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ecd7d5a5-255a-434c-bad0-ab5b04301a24');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('92fdab15-6690-4ce2-b840-d14063ee4641', 'Movie Night Tickets', 449, '45355205-4d29-4b8e-8e95-45f5d36de5bb', '0c0da97b-9921-459a-8009-5fead352d4bd');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('cc9ba08c-408a-4b9b-bded-cc2f31279955', 'Birthday Party Supplies', 834, '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '77427edd-0499-49b4-af05-1fea8ba009d9');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('2c136f4b-b1cd-400c-b4e0-5622ece200ee', 'Movie Night Tickets', 877, '65783082-58ea-4749-8b57-9e6cbcff5e07', '01f10fbd-cd8c-43da-9d37-c65d6987da82');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('55a65736-790f-4c6d-befa-ec9e38ecfa5d', 'Dinner at Italian Restaurant', 15, '2ca4e4c3-6f63-4c66-a501-8054991155f4', '5629cb61-5d14-424d-837a-36982ac2814f');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('bc41cf75-6866-4f63-8e39-f8e13c9596c6', 'Weekend Getaway Booking', 174, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6ac05fbe-0fe7-46fe-aa25-e856dfb1a190');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('46ef9844-bd94-49ee-ae4e-e718bbacc0be', 'Weekend Getaway Booking', 400, '65783082-58ea-4749-8b57-9e6cbcff5e07', 'a0f77534-7f04-4433-89c2-0e9fc1151f1a');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('ca4dd9df-cb58-4011-a9f9-90097ab6fa11', 'Movie Night Tickets', 47, '375f8dd9-e06a-40ad-bca7-b306c0921ea5', 'b8f481f2-18ce-47fe-915b-c0698ebee1b7');
INSERT INTO "expense" ("id", "description", "amount", "paidById", "groupId") VALUES ('3b93dcfd-78f6-4ece-9246-4fd22a34268c', 'Weekend Getaway Booking', 557, '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '5629cb61-5d14-424d-837a-36982ac2814f');

INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('5cc7b64d-2936-46fa-8989-90a95d399b25', 546, 'ca4dd9df-cb58-4011-a9f9-90097ab6fa11', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('a7aa9735-3bad-4838-9558-7942eea0d3e0', 775, '2c136f4b-b1cd-400c-b4e0-5622ece200ee', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('1ea5577b-d4c8-496c-a2d5-fbeac997187c', 525, '55a65736-790f-4c6d-befa-ec9e38ecfa5d', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('2596a64d-8a91-4f09-948a-a5716cb84a36', 72, '55a65736-790f-4c6d-befa-ec9e38ecfa5d', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('e977daf0-6694-47ce-bd08-5caccaecb744', 137, 'cdab7db1-25e7-4184-a6d4-e26ded0a48ae', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('fc801b0c-0de6-4dea-a9f7-374db205bac5', 157, 'ca4dd9df-cb58-4011-a9f9-90097ab6fa11', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('d7f1a5c9-e2f0-49ce-96fa-77232bfbb1f0', 56, '92fdab15-6690-4ce2-b840-d14063ee4641', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('e4a92b37-a2c2-4ee6-9f69-bc26eca10eff', 20, 'cc9ba08c-408a-4b9b-bded-cc2f31279955', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('47c50a09-13b6-42eb-a30e-2e95d9875ad3', 672, '14b3a459-eedb-461a-8663-2ea21ebf398b', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "expensesplit" ("id", "amount", "expenseId", "owedById") VALUES ('e07f04c2-1d82-4aee-bac2-9e83549077cf', 38, '92fdab15-6690-4ce2-b840-d14063ee4641', '2ca4e4c3-6f63-4c66-a501-8054991155f4');

INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('ef566a62-13d3-48e0-8d81-bfbf8058c076', '4532 9271 9983 2345', 'CHASE123890456', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('dec2dfff-aa7e-4757-88cf-b65fa833ba31', '4532 9271 9983 2345', 'WELLS456789123', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('01b0d4c8-e9cf-4004-b02c-56cd50a0fbd8', '4532 9271 9983 2345', 'CHASE123890456', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('7272f7f5-8676-4b8b-bb81-8c44ffc71453', '4485 2912 0364 7756', 'WELLS456789123', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('f8751cc3-a689-45da-94d5-b8743af4b3e6', '4716 2210 3987 1234', 'CITI987654321', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('72c3b1a7-c7a9-41bc-b31b-b17b723e2693', '4539 8765 3412 5567', 'WELLS456789123', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('04b1f9e4-c976-46e3-bcc2-fded83b16a62', '4716 2210 3987 1234', 'HSBC890123456', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('62c10b4f-9bf8-4a8d-8ed3-fdbd72be229f', '4532 9271 9983 2345', 'CHASE123890456', '65783082-58ea-4749-8b57-9e6cbcff5e07');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('4a77bb0e-71ce-4a6b-828e-99f9b6c234f5', '4485 2912 0364 7756', 'BOA123456789', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "virtualcard" ("id", "cardNumber", "linkedBankAccount", "userId") VALUES ('b787a166-f83e-4498-a844-0d196f778db7', '4716 2210 3987 1234', 'BOA123456789', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');

INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('04e17f56-3ff6-4112-aec1-1a5fb82ec66b', 856, 'completed', '474f6412-d23b-40ed-946d-a11d7eb7401c', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('474c49c9-38e9-4168-ac33-2f9a2329cdc5', 663, 'processing', '19e4a1d7-95c1-444b-b794-4d40f05d5721', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('ea252251-9534-456b-beac-f150b22f9b2d', 612, 'processing', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('6a24bc04-a148-4a6a-97ce-efd3aadf0eca', 821, 'rejected', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('e3242748-686b-46c1-a569-e51c65f9ec74', 619, 'cancelled', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('c1445d35-ae4f-4e48-b039-43853582d37c', 959, 'completed', 'dfc72871-3ca1-40be-8c01-51719d1ea00b', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('77a16a60-c654-4f18-ab98-3ee4ee10cdd6', 990, 'cancelled', '65783082-58ea-4749-8b57-9e6cbcff5e07', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('eea3a998-a3b0-4e0f-9b64-812a973d70e4', 786, 'rejected', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('099454ff-d955-45d6-890a-6661744a066a', 15, 'pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "transaction" ("id", "amount", "status", "senderId", "receiverId") VALUES ('44719006-e0a7-430f-afdc-816bc54d105b', 233, 'processing', '45355205-4d29-4b8e-8e95-45f5d36de5bb', '65783082-58ea-4749-8b57-9e6cbcff5e07');

INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('8c3b3e86-54d8-4b64-bf59-ab805a38b79e', '9876543210', 'Citibank', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('8cfbe355-abcb-4ef6-98f8-748cd8465164', '1029384756', 'Citibank', '45355205-4d29-4b8e-8e95-45f5d36de5bb');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('a9d4f32a-be17-490c-861c-a95f7e13e276', '1234567890', 'HSBC', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('f8f20d20-7cd5-4499-a5d0-481e273cfed6', '1029384756', 'Chase Bank', '5271aef6-c9bd-46fc-ab23-6cc15fbe8f24');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('107553df-1fa5-44dc-833d-a177cb39ff64', '1928374650', 'Bank of America', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('508fbe61-a50e-4658-abcb-b8722896985c', '1234567890', 'Wells Fargo', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('31078aa2-357c-4991-8537-bc57a787ce87', '9876543210', 'Citibank', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('5f61d17e-d24c-4d6a-9972-5f1a0c7bb082', '1928374650', 'HSBC', '65783082-58ea-4749-8b57-9e6cbcff5e07');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('d146505d-d2ae-4f3e-99f7-077201cf7981', '1928374650', 'Citibank', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "bankaccount" ("id", "accountNumber", "bankName", "userId") VALUES ('358e28ef-ed84-4c95-8ab2-6868e5630146', '1234567890', 'Chase Bank', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');

INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('98db6d26-6fac-479b-9648-8913813486a8', '311Janet.Daugherty48@gmail.com', 'rejected', 'ecd7d5a5-255a-434c-bad0-ab5b04301a24', '375f8dd9-e06a-40ad-bca7-b306c0921ea5');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('6be9e676-db82-4d0c-a35d-4c0896f25a68', '314Bert98@hotmail.com', 'rejected', '6ac05fbe-0fe7-46fe-aa25-e856dfb1a190', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('d2bf0f85-4347-4afa-a388-fe83896f3fe7', '317Austin_Kozey@gmail.com', 'rejected', 'a0f77534-7f04-4433-89c2-0e9fc1151f1a', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('18ab1e42-3d4a-4c9e-80c7-41925d42a679', '320Cloyd_Berge71@gmail.com', 'pending', '5629cb61-5d14-424d-837a-36982ac2814f', '19e4a1d7-95c1-444b-b794-4d40f05d5721');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('6d75ba33-11db-4e02-9a8c-e4d157507d09', '323Evert_Oberbrunner@gmail.com', 'pending', 'ecd7d5a5-255a-434c-bad0-ab5b04301a24', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('df9f397d-b747-44ad-b543-66c530feb7ff', '326Meta63@yahoo.com', 'pending', 'a0f77534-7f04-4433-89c2-0e9fc1151f1a', '474f6412-d23b-40ed-946d-a11d7eb7401c');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('6b420343-b95b-40af-92b3-c00ad86f06b7', '329Retta_Cormier76@hotmail.com', 'accepted', '324155e5-79c6-467e-8b9a-17bdcc906628', 'dfc72871-3ca1-40be-8c01-51719d1ea00b');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('fe3e4000-6d48-4b95-95b3-64c726210b87', '332Dana_Corwin61@hotmail.com', 'accepted', '6ac05fbe-0fe7-46fe-aa25-e856dfb1a190', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('867e15f8-da9a-4b1a-aa08-b8c82e8bf292', '335Alexandrea.Wunsch@yahoo.com', 'accepted', 'e96fc55e-834e-4feb-a41c-50f52c382afd', '2ca4e4c3-6f63-4c66-a501-8054991155f4');
INSERT INTO "invitation" ("id", "invitedUserEmail", "status", "groupId", "invitedById") VALUES ('6d913845-6ad3-4c76-867d-3f3c85120442', '338Malcolm_Cassin@hotmail.com', 'pending', '0c0da97b-9921-459a-8009-5fead352d4bd', 'ea5c0b2f-57a5-4aec-89b9-90836bc9cefa');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
