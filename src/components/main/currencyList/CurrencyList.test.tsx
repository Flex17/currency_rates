import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import CurrencyList from "./CurrencyList";
import {BrowserRouter as Router} from "react-router-dom";

const currencyList = [
    {
        CharCode: "AED",
        ID: "R01230",
        Name: "Дирхам ОАЭ",
        Nominal: 1,
        NumCode: "784",
        Previous: 23.0504,
        Value: 23.1556,
    },
    {
        CharCode: "AMD",
        ID: "R01060",
        Name: "Армянских драмов",
        Nominal: 100,
        NumCode: "051",
        Previous: 21.9025,
        Value: 21.9933,
    }
];

const setCurrentCurrencyMock = jest.fn();

const renderCurrencyList = () => render(
    <Router>
        <CurrencyList currencyList={currencyList} setCurrentCurrency={setCurrentCurrencyMock} />
    </Router>
);

describe("CurrencyList", () => {
    test("Рендер листа", () => {
        renderCurrencyList();

        expect(screen.getByText("AED")).toBeInTheDocument();
        expect(screen.getByText("AMD")).toBeInTheDocument();
    });
    test("Вызов setCurrentCurrencyMock", () => {
        renderCurrencyList();

        fireEvent.click(screen.getByText("AED"));
        expect(setCurrentCurrencyMock).toHaveBeenCalledTimes(1);
    });
});
