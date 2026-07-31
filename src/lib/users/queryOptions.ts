import { queryOptions } from '@tanstack/react-query'
import { getAllUsersFn, getUserByIdFn } from './apis'

export const usersQueryOptions = ()=> queryOptions({
    queryKey: ['users'],
    queryFn: ()=> getAllUsersFn()
})

export const userQueryOptions = (id: number) => queryOptions({
    queryKey: ['users',{id}],
    queryFn: () => getUserByIdFn({data: {id}})
})