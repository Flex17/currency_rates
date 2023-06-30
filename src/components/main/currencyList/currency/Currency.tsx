import React from "react";
import {NavLink} from 'react-router-dom';
import css from './currency.module.scss';

export interface CurrencyI {
	CharCode: string,
	ID: string,
	Name: string,
	Nominal: number,
	NumCode: string,
	Previous: number,
	Value: number,
}

interface CurrencyProps {
	currency: CurrencyI,
	changes: string,
	setCurrentCurrency: (currency: CurrencyI) => void,
}

const Currency: React.FC<CurrencyProps> = ({
	changes,
	currency,
	setCurrentCurrency,
}: CurrencyProps) => {
	const {CharCode, Name, Value} = currency;

    return (
		<div className={css.rateBlock}>
			<NavLink
				to={`/valute/` + CharCode}
				className={`${css.valuteCode} ${css.valuteValue}`}
				onClick={() => { setCurrentCurrency(currency) }}
			>
				{CharCode}
				<span className={css.tooltipText}>{Name}</span>
			</NavLink>
			<div className={`${css.valutePrice} ${css.valuteValue}`}>
				{Value}
			</div>
			<div className={`${css.valuteChanges} ${css.valuteValue}`}>
				{changes === '-' ? changes : '+' + changes}
			</div>
		</div>
    );
};

export default Currency;
