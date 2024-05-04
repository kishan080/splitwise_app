import {render,screen} from '@testing-library/react'
import Profile from '../pages/userauth/Profile'


test('render home page', () => {
    render(<Profile/>);
    const homeText = screen.getByText(/Loading.../);
    expect(homeText).toBeInTheDocument();
});