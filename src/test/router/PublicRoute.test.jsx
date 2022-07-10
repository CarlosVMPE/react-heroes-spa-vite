import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth'
import { PublicRoute } from '../../router/PublicRoute'

describe('Testing in PublicRoute', () => {
    test('should be show the children if you are not authenticated', () => {
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('should be Navigate if you are authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}> // ruta donde me encuentro
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
})