import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { LoginPage } from "../../../auth/pages/LoginPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('<LoginPage />', () => {
    test('should be render the component and set a new user', () => {
        Storage.prototype.getItem = jest.fn();

        const contextValue = {
            logged: false,
            login: jest.fn()
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <LoginPage />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        const button = screen.getByRole('button');
        expect(screen.getAllByText('Login').length).toBe(2);
        fireEvent.click(button);
        expect(contextValue.login).toHaveBeenCalled();
        expect(localStorage.getItem).toHaveBeenCalledWith('lastPath');

    })
})