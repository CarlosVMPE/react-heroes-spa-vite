import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Testing in SearchPage', () => {

    beforeEach(() => jest.clearAllMocks());
    test('should be show correctly with default values', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    test('should be show a Batman and the input with a value of queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');
    });

    test('should be show an error if dont find a hero (batman123)', () => {
        const noHero = 'batman123';
        render(
            <MemoryRouter initialEntries={[`/search?q=${noHero}`]}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');
    })

    test('should be call Navigate when you search a hero', () => {

        const hero = 'batman';

        render(
            <MemoryRouter initialEntries={[`/search`]}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole("textbox");
        const form = screen.getByLabelText('search-form');
        fireEvent.input(input, { target: { value: hero } });
        // simulando el change
        // fireEvent.change(input, { target: { name: 'searchText', value: hero } })
        fireEvent.submit(form, { event: { preventDefault: jest.fn() }});
        expect(mockUseNavigate).toHaveBeenCalledWith('?q=batman');

    });

});