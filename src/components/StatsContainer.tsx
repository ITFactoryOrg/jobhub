import React from 'react';
import {FaSuitcaseRolling, FaCalendarCheck, FaBug} from "react-icons/fa";

import Wrapper from "../assets/wrappers/StatsContainer";
import {useAppSelector} from "../store/hooks";
import StatItem from "./StatItem";

const StatsContainer = () => {
	const {stats} = useAppSelector((store) => store.allJobs);
	const defaultStats = [
		{
			title: 'pending applications',
			count: stats.pending || 0,
			icon: <FaSuitcaseRolling/>,
			color: '#e9b949',
			bcg: '#fcefc7'
		},
		{
			title: 'interviews scheculed',
			count: stats.interview || 0,
			icon: <FaCalendarCheck/>,
			color: '#647acb',
			bcg: '#e0e8f9'
		},
		{
			title: 'job declined',
			count: stats.declined || 0,
			icon: <FaBug/>,
			color: '#d66a6a',
			bcg: '#ffeeee'
		}
	]
	return (
		<Wrapper>
			{defaultStats.map((item, i)=> {
				return <StatItem key={i} {...item}/>
			})}
		</Wrapper>
	);
};

export default StatsContainer;
