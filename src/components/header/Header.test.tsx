import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";

const date = '17.06.2023';

const renderHeader = () => render(
    <Router>
        <Header date={date} />;
    </Router>
);

describe("Header component", () => {
    test("Рендер заголовка", () => {
        renderHeader();
        expect(screen.getByText(`Курсы валют ЦБ РФ на ${date}`)).toBeInTheDocument();
    });
    test("renders the correct number of classification blocks", () => {
        renderHeader();

        const classificationBlocks = screen.getAllByTestId("classification-block");
        expect(classificationBlocks).toHaveLength(3);
    });
    test('Header snapshot', () => {
        const page = render(<Header date={date}/>);

        expect(page).toMatchSnapshot();
    })
});
