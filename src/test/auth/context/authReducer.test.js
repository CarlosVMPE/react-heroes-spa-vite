import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth";

describe('Testing in authReducer', () => {

    const initialState = { logged: false };

    test('should be return the initialValue', () => {
        const newState = authReducer(initialState, {});
        expect(newState).toBe(initialState);
    });

    test('should call login auth and set the user', () => {
        const userAuth = { id: '123', name: 'Carlos' };
        const action = {
            type: types.login,
            payload: userAuth
        };

        const { logged, user } = authReducer(initialState, action);
        expect(logged).toBeTruthy();
        expect(user).toBe(userAuth);
    });

    test('should call logout auth and delete the user', () => {
        const state = {
            logged: true,
            user: { id: '123', name: 'Juan' }
        };

        const action = {
            type: types.logout
        };

        const { logged, user } = authReducer(state, action);
        expect(logged).toBeFalsy();
        expect(user).toBeUndefined();
    });
})