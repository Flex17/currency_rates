import React from "react";
import css from './header.module.scss';

interface HeaderI {
	date: string;
}

const Header: React.FC<HeaderI> = ({date}: HeaderI) => {

    return (
		<div className={css.wrapper}>
			<h1 className={css.title}>Курсы валют ЦБ РФ на {date}</h1>
			<div className={css.blocks}>
				<div
					className={`${css.code} ${css.classification}`}
					data-testid="classification-block"
				>
					Код
				</div>
				<div
					className={`${css.price} ${css.classification}`}
					data-testid="classification-block"
				>
					Цена, ₽
				</div>
				<div
					className={`${css.changes} ${css.classification}`}
					data-testid="classification-block"
				>
					Разница по сравнению с предыдущим днем, %
				</div>
			</div>
		</div>
    );
};

export default Header;
