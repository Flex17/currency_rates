import React from "react";
import Currency, { CurrencyI } from './currency/Currency';

interface CurrencyListI {
    setCurrentCurrency: (currency: CurrencyI) => void,
    currencyList: CurrencyI[];
}

const CurrencyList: React.FC<CurrencyListI> = ({
    currencyList,
    setCurrentCurrency,
}: CurrencyListI) => {

    return (
        <>
            {
                Object.entries(currencyList)?.map(currency => {
                    const previousValue = currency[1].Previous;
                    const value = currency[1].Value;
                    const changes = (value / previousValue * 100 - 100).toFixed(3);

                    return (
                        <Currency
                            currency={currency[1]}
                            changes={changes}
                            setCurrentCurrency={setCurrentCurrency}
                            key={currency[1].CharCode}
                        />
                    )
                })
            }
        </>
    );
};

export default CurrencyList;
