const { sqliteTable, integer, text } = require('drizzle-orm/sqlite-core');

const character = sqliteTable('character', {

    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),   
    strength: integer('strength').notNull(),
    dexterity: integer('dexterity').notNull(),
    intelligence: integer('intelligence').notNull(),
    charisma: integer('charisma').notNull(),
    user_id: integer('user_id').references(() => user.id)  
})

const user = sqliteTable('user',{

    id: integer('id').primaryKey({autoIncrement: true}),
    username: text('username').notNull(),
    password: text('password').notNull()
})

const weapon = sqliteTable('weapon',{

    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull()
})

const armor = sqliteTable('armor',{
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull()
})

const item = sqliteTable('item',{
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull()
})



module.exports = {
character,
user,
weapon,
armor,
item
}