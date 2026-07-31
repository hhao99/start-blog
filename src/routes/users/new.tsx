import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type NewUser } from '#/db/schema'
import { createUserFn } from '#/lib/users/apis'

export const Route = createFileRoute('/users/new')({
  component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createUserFn,
        onSuccess: async (updateData)=> {
            console.log("===> updated:",updateData)
            queryClient.invalidateQueries({ queryKey:['users']})
        },
        onSettled: async ()=> {
            console.log('===> on settled')
        },
        onError: async (error)=> {
            console.log('===> on Error',error)
        },
    })
    const defaultUser: NewUser = {
        name: 'new user',
        email: 'test-1@example.com'
    }
    const form = useForm({
        defaultValues: defaultUser,
        onSubmit: async ({ value}) => {
            //console.log(value)
            mutation.mutate({data: {user: value}})
        },
    })
  return <div>
    <h1>New User form</h1>
    <div>
        <form onSubmit={e=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
        <div>
            
            <form.Field name='name' 
                children={ (field) => (<>
                    <label htmlFor={field.name}>Name:</label>
                    <input type='text' id={field.name}
                        value={field.state.value}
                        onChange={ e=> field.handleChange(e.target.value)} />
                    </>)} />
            
             <div>
                <form.Field name='email'
                    children={ (field) => (<>
            <label htmlFor={field.name}>Email:</label>
                    <input type='email' id={field.name}
                        value={field.state.value}
                        onChange={ e=> field.handleChange(e.target.value)} />
                    </>)} />
        </div>
        <div>
            <form.Subscribe
                selector={(state)=> [state.canSubmit,state.isSubmitting]}
                children={ ([canSubmit,isSubmitting])=> (<>
                    <button type='submit'>
                        {isSubmitting? 'submitting': 'Save'}
                    </button>
                    <button type='reset' onClick={(e)=> {e.preventDefault();form.reset(e)} }>reset</button>
                    </>
                )}
            />
        </div>
        </div>
        </form>
    </div>
  </div>
}
