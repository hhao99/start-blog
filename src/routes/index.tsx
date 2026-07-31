import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'

const helloQueryOptions = ()=> queryOptions({
  queryKey:['hello'],
  queryFn: ()=> {
    return "Tanstack/start integrated with tanstack/query"
  }
})
export const Route = createFileRoute('/')({ 
  component: Home,
  loader: ({context}) => {
    context.queryClient.ensureQueryData(helloQueryOptions())
  }
})

function Home() {
  const query = useSuspenseQuery(helloQueryOptions())
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Message: {query.data}
      </p>
    </div>
  )
}
