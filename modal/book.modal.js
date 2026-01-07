const { mysqlTable , int , varchar , defaultRandom, bigint} = require("drizzle-orm/mysql-core");
const { authorsTable} = require("./author.modal");
const { serial } = require("drizzle-orm/mysql-core");


const booksTable = mysqlTable("books", {
    id: serial("id").primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1024 }).notNull(),
    authorid: bigint("author_id", {mode: "number"}).notNull().references(()=> authorsTable.id),

},(table) => [
    index('title_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
  ]
);

module.exports={booksTable};