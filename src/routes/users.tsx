import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { usersQueryOptions } from '#/lib/users/queryOptions'
export const Route = createFileRoute('/users')({
  component: RouteComponent,
  loader: ({context})=> {
    context.queryClient.ensureQueryData(usersQueryOptions())
  }
})

function RouteComponent() {
    const query = useSuspenseQuery(usersQueryOptions())
    const users = query.data
    // console.log(users)
  return (<div className='min-h-svh w-full bg-gray-50 flex flex-col'>
    <div className='w-full flex justify-between p-4 bg-gray-200 border-b-2 border-gray-300'>
        <h1>User Admin Page</h1>
        <ul>
            <li><Link to='/users/new'>new user</Link></li>
        </ul>

    </div>
    <div className='flex grow'>
        <div className='w-1/5 max-1/3 bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold text-cneter'> user list</h1>
            
            <ul className='flex flex-col gap-2 mt-4'>
                {users.map( user => (<li key={user.id}>
                    <Link to='/users/$id' params={{ id: user.id}}>
                        <h3>{user.name}</h3>
                    </Link>
                </li>))}
            </ul>
        </div>
        <div className='w-3/4 max-w-2/3'>
            <Outlet />
        </div>
    </div>
    
    </div>)
}
