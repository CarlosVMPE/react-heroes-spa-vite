import { types } from "../../../auth/types/types"

// si en alguna aplicacion se define types que aun no se 
// definen aun entonces hacer un expect de any string
// para validar que venga cualquier informacion de momento

describe('Testing in "types.js"', () => {
    test('should be return array of types', () => {
        expect(types).toEqual(
            {
                login: '[Auth] Login',
                logout: '[Auth] Logout'
            });
    })


})