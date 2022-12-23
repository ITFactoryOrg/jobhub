import React, {FC, ReactNode} from 'react';

import Wrapper  from "../assets/wrappers/StatItem";


interface IStatItem {
	title: string;
	count: number;
	icon: ReactNode;
	color: string;
	bcg: string;
}

const StatItem:FC<IStatItem> = ({color,count,bcg, title, icon}) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className={'count'}>{count}</span>
				<span className={'icon'}>{icon}</span>
			</header>
			<h5 className={'title'}>{title}</h5>
		</Wrapper>
	);
};

export default StatItem;
