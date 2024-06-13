-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Properties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalcode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Spain',
    "ownerId" INTEGER NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    CONSTRAINT "Properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Properties" ("address", "city", "created", "id", "ownerId", "postalcode", "updated") SELECT "address", "city", "created", "id", "ownerId", "postalcode", "updated" FROM "Properties";
DROP TABLE "Properties";
ALTER TABLE "new_Properties" RENAME TO "Properties";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
