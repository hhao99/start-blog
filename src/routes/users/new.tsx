import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type NewUser } from '#/db/schema'
import { createUserFn } from '#/lib/users/apis'


// shadcn
import { 
    Button, 
    Input, 
    Label,
    Card, CardHeader, CardContent, CardFooter, CardTitle,
    CardDescription,
    FieldGroup,
    Field, FieldLabel
} from '#/components/ui'


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
        name: '',
        email: '@example.com'
    }
    const form = useForm({
        defaultValues: defaultUser,
        onSubmit: async ({ value}) => {
            //console.log(value)
            mutation.mutate({data: {user: value}})
            form.reset()
        },
    })
  return <Card>
    <CardHeader>
        <CardTitle>New User form</CardTitle>
        <CardDescription>Fill out the form to create a new user</CardDescription>
    </CardHeader>
    
    <CardContent>
        <form onSubmit={e=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
        <div>
            <FieldGroup>
            <form.Field name='name' 
                children={ (field) => (<Field>
                    <FieldLabel 
                        className='flex text-lg text-bold gap-4'
                        htmlFor={field.name}>Name:
                    <Input type='text' id={field.name}
                        
                        placeHolder="new user name"
                        value={field.state.value}
                        onChange={ e=> field.handleChange(e.target.value)} />
                    </FieldLabel>
                    </Field>)} />
            
             <div>
                <form.Field name='email'
                    children={ (field) => (<Field>
                    <FieldLabel 
                    className='flex text-lg text-bold gap-4'
                    htmlFor={field.name}>Email:
                    <Input type='email' id={field.name} 
                        placeHolder="new user email"
                        value={field.state.value}
                        onChange={ e=> field.handleChange(e.target.value)} />
                    </FieldLabel>
                    </Field>)} />
        </div>
        </FieldGroup>
        <CardFooter className='flex gap-4'>
            <form.Subscribe
                selector={(state)=> [state.canSubmit,state.isSubmitting]}
                children={ ([canSubmit,isSubmitting])=> (<>
                    <Button type='submit' variant='outlin'
                        >
                        {isSubmitting? 'submitting': 'Save'}
                    </Button>
                    <Button type='reset' 
                        onClick={(e)=> {
                            e.preventDefault();
                            form.reset()
                         } }>reset</Button>
                    </>
                )}
            />
        </CardFooter>
        </div>
        </form>
    </CardContent>
  </Card>
}
