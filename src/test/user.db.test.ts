import { db } from '#/db'
import { getAllUsers, getUserById  } from '#/lib/users/functions'

describe('userdb', () => {
    it('should get all users', async () => {
        const result = await getAllUsers()
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
    })

    it('should get user by id = 1', async () => {
        const result = await getUserById(1)
        expect(result).toBeDefined()
        if (result) {
            expect(result.id).toBe(1)
            expect( result.name).toBe('eric')

        }
    })

   
})