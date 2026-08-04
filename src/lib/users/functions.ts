import '@tanstack/react-start/server-only'
import { eq } from 'drizzle-orm'
import { db } from '#/db'
import { users, type User, type NewUser } from '#/db/schema'

export async function getAllUsers(): Promise<User[]> {
    return db.select().from(users).all()
}

export async function getUserById(id: number): Promise<User|undefined> {
    return db.select().from(users).where(eq(users.id,id)).get()

}

export async function createUser(user: NewUser): Promise<User[]|undefined> {
    console.log("===> create user function : ",user)
    return db.insert(users).values(user).returning()    
}