import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';

it('renders a search box with a button', () => {
    const {getByRole} = render(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    expect(getByRole(/entry/)).toBeInTheDocument();
    expect(getByRole(/pushbutton/)).toBeInTheDocument();
});
it('lists supported features', () => {
    const {getByRole, getByText} = render(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    expect(getByRole(/list/)).toBeInTheDocument();
    expect(getByText(/unterstützt/)).toBeInTheDocument();
})