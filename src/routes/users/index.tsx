import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1>Select a user for the detail</h1>
}
