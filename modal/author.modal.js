const { serial } = require("drizzle-orm/mysql-core");
const { mysqlTable , int , varchar} = require("drizzle-orm/mysql-core");

const authorsTable = mysqlTable("authors", {
    id: serial("id").primaryKey(),
    firstname: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 1024 }),
    email: varchar({length:255}).notNull().unique(),
})
module.exports={authorsTable};