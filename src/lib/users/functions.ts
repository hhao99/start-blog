import { eq } from 'drizzle-orm'
import { db } from '#/db'
import { usersTable, type User, type NewUser } from '#/db/schema'

export async function getAllUsers(): Promise<User[]> {
    return db.select().from(usersTable).all()
}

export async function getUserById(id: number): Promise<User|undefined> {
    return db.select().from(usersTable).where(eq(usersTable.id,id)).get()

}