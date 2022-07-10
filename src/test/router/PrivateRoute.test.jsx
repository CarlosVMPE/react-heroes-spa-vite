import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";

describe('Testing in PrivateRoute', () => {
    test('should be show the children if you are authenticated', () => {
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: '345',
                name: 'Juan'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');

    });

    test('should be Navigate if you are not authenticated', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}> // ruta donde me encuentro
                    <Routes>
                        <Route path='marvel' element={
                            <PrivateRoute>
                                <h1>Página Marvel</h1>
                            </PrivateRoute>
                        } />
                        <Route path='login' element={<h1>Página Login</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Login')).toBeTruthy();
    });
})