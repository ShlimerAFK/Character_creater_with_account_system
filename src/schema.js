const { sqliteTable, integer, text } = require('drizzle-orm/sqlite-core');


const user = sqliteTable('user',{

    id: integer('id').primaryKey({autoIncrement: true}),
    username: text('username').notNull().unique(),
    password: text('password').notNull()
})

const character = sqliteTable('character', {

    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),   
    strength: integer('strength').notNull(),
    dexterity: integer('dexterity').notNull(),
    intelligence: integer('intelligence').notNull(),
    charisma: integer('charisma').notNull(),
    hp: integer('hp').notNull(),
    weapon_id: integer('weapon_id').notNull().references(() => weapon.id),
    armor_id: integer('armor_id').notNull().references(() => armor.id),
    user_id: integer('user_id').notNull().references(() => user.id)
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

const ownership = sqliteTable('ownership',{
    id: integer('id').primaryKey({autoIncrement: true}),
    char_id: integer('char_id').notNull().references(()=> character.id),
    item_id: integer('item_id').notNull().references(()=> item.id)
})



module.exports = {
character,
user,
weapon,
armor,
item,
ownership
}