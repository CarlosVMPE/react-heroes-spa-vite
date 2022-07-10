import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Navbar } from "../../../ui/components/Navbar";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Testing in Navbar', () => {

    const contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'Strider'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());
    test('should be show the name of the user logged', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Strider')).toBeTruthy();
    });
    test('should be call logout and Navigate when the button logout is clicked', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", { "replace": true });
    });
})