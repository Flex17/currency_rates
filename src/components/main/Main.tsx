import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import { CurrencyI } from './currencyList/currency/Currency';
import axios from 'axios';
import CurrencyList from './currencyList/CurrencyList';
import History from '../history/History';
import Spinner from '../ui/spinner/Spinner';
import {convertDate} from "../../helpers/convertDate";

interface RateListI {
    currencyList: CurrencyI[],
    date: string,
    prevURL: string,
}

const Main: React.FC = () => {
    const [currentCurrency, setCurrentCurrency] = useState<CurrencyI>();

    const [isLoading, setIsLoading] = useState(false);

    const [rateList, setRateList] = useState<RateListI>(() => {
        return {
            date: '',
            prevURL: '',
            currencyList: [],
        }
    })

    useEffect(() => {
        const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
        setIsLoading(true);

        axios.get(url)
            .then(response => {
                const data = response.data;

                setRateList({
                    currencyList: data.Valute,
                    date: convertDate(data.Date),
                    prevURL: data.PreviousURL
                });
            })
            .catch(error => {
                throw new Error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Routes>
                <Route path='*' element={
                    <>
                        <Header date={rateList.date} />
                        <CurrencyList
                            setCurrentCurrency={setCurrentCurrency}
                            currencyList={rateList.currencyList}
                        />
                    </>
                }
                />
                {
                    currentCurrency && (
                        <Route path={`/valute/` + currentCurrency.CharCode} element={
                            <History
                                currency={currentCurrency}
                                date={rateList.date}
                                prevURL={rateList.prevURL}
                            />
                        }
                        />
                    )
                }
            </Routes>
        </>
    );
};

export default Main;
