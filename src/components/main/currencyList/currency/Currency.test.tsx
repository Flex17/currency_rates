import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Currency from "./Currency";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter as Router} from 'react-router-dom';

const currency = {
    CharCode: "USD",
    ID: "1",
    Name: "US Dollar",
    Nominal: 1,
    NumCode: "840",
    Previous: 70,
    Value: 75,
};

const renderCurrency = () => render(
    <Router>
        <Currency
            currency={currency}
            changes="1"
            setCurrentCurrency={setCurrentCurrency}
        />
    </Router>
);

const setCurrentCurrency = jest.fn();

describe("Currency", () => {
    test("renders the currency code and name", () => {
        renderCurrency();
        expect(screen.getByText("USD")).toBeInTheDocument();
        expect(screen.getByText("US Dollar")).toBeInTheDocument();
    });
    test("renders the currency value", () => {
        renderCurrency();
        expect(screen.getByText("75")).toBeInTheDocument();
    });
    test("renders the currency changes", () => {
        renderCurrency();
        expect(screen.getByText("+1")).toBeInTheDocument();
    });
    test("calls setCurrentCurrency when the currency is clicked", () => {
        renderCurrency();
        fireEvent.click(screen.getByText("USD"));
        expect(setCurrentCurrency).toBeCalledWith(currency);
    });
    test('Currency snapshot', () => {
        const page = renderCurrency();

        expect(page).toMatchSnapshot();
    });
});
