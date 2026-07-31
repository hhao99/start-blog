import { userQueryOptions } from '#/lib/users/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id')({
  component: RouteComponent,
  loader: ({context,params}) => {
    const id = Number.parseInt(params.id)
    context.queryClient.ensureQueryData(userQueryOptions(id))
  }
})

function RouteComponent() {
    const id = Number.parseInt(Route.useParams().id)
    const query = useSuspenseQuery(userQueryOptions(id))
    const user = query.data
  return <div>
    <h3>Hello { user?.name }!</h3>
    <h5>{user?.email}</h5>
  </div>
}
