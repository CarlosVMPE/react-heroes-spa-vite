import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "../../router/AppRouter";

describe('Testing in AppRouter', () => {
    test('should be show the login if not logged', () => {
        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('should be show the component Marvel is logged', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '1234',
                name: 'Carlos'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //screen.debug();
        expect(screen.getByText('MarvelPage')).toBeTruthy();
    });
})