import React, { useEffect, useState } from 'react';
import axios from 'axios';

import css from './history.module.scss';
import { NavLink } from 'react-router-dom';
import { CurrencyI } from '../main/currencyList/currency/Currency';
import {convertDate} from "../../helpers/convertDate";

interface HistoryI {
	prevURL: string;
	date: string;
	currency: CurrencyI,
}

const History: React.FC<HistoryI> = ({
	prevURL,
	date,
	currency,
}: HistoryI) => {
	const {CharCode, Value, Name} = currency;

	const [data, setData] = useState<any[]>([]);

	async function getHistory(prevURL: string, counter = 0) {
		try {
			if (counter >= 10) {
				return;
			}

			const response = await axios.get(prevURL);
			const newData = response.data;

			setData(prevArray => [...prevArray, newData]);

			if (newData.PreviousURL) {
				await getHistory(newData.PreviousURL, counter + 1);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getHistory(prevURL);
	}, []);


	return (
		<>
			<NavLink
				to={'*'}
				className={css.back}
			>
				Вернуться на главную страницу
			</NavLink>
			<h1 className={css.title}>
				{`${Name} (${CharCode})`}
			</h1>
			<div className={css.categories}>
				<div className={css.category}>Дата</div>
				<div className={css.category}>Цена, ₽</div>
			</div>
			<div className={css.block}>
				<div className={css.item}>
					<div>{date}</div>
					<div>{Value}</div>
				</div>

				<div>
					{
						data.map((elem, i) => {
							const date = convertDate(elem.Date);
							const value = elem.Valute[CharCode].Value ? elem.Valute[CharCode].Value : '';

							return (
								<div className={css.item} key={i}>
									<div>{date}</div>
									<div>{value}</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</>
    );
};

export default History;
