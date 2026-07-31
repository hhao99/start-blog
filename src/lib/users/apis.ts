import { createServerFn } from "@tanstack/react-start";
import { getAllUsers, getUserById } from "./functions";

export const getAllUsersFn = createServerFn({ method: 'GET'})
    .handler( async ()=> getAllUsers() )

export const getUserByIdFn = createServerFn({ method: 'GET'})
    .validator( (data: { id: number}) => data )
    .handler( async ({data}) => getUserById(data.id) )