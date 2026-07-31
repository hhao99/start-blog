import { createServerFn } from "@tanstack/react-start";
import { getAllUsers, getUserById, createUser } from "./functions";
import type { NewUser } from "#/db/schema";

export const getAllUsersFn = createServerFn({ method: 'GET'})
    .handler( async ()=> getAllUsers() )

export const getUserByIdFn = createServerFn({ method: 'GET'})
    .validator( (data: { id: number}) => data )
    .handler( async ({data}) => getUserById(data.id) )

export const createUserFn = createServerFn({method: 'POST'})
    .validator( ( data: {user: NewUser}) => data)
    .handler( async({data}) => { 
        return createUser(data.user) 
    })