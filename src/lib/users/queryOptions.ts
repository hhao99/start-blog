import { queryOptions, mutationOptions} from '@tanstack/react-query'
import { getAllUsersFn, getUserByIdFn, createUserFn } from './apis'
import type { NewUser } from '#/db/schema'

export const usersQueryOptions = ()=> queryOptions({
    queryKey: ['users'],
    queryFn: ()=> getAllUsersFn()
})

export const userQueryOptions = (id: number) => queryOptions({
    queryKey: ['users',{id}],
    queryFn: () => getUserByIdFn({data: {id}})
})

