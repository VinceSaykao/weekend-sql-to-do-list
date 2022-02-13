CREATE TABLE "to_do_table" (
"id" SERIAL PRIMARY KEY,
"to_do" VARCHAR(40) NOT NULL,
"notes" VARCHAR(200),
"done" BOOLEAN DEFAULT FALSE 
);
--"notes" VARCHAR(140)

INSERT INTO "to_do_table" ("id","to_do","notes","done")
VALUES ('2','dishes','stuff done','Y');


SELECT * FROM "to_do_table" ORDER BY "id";
