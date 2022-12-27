import React, {useState} from 'react';

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import {useAppSelector} from "../store/hooks";



const ChartsContainer = () => {
	const [barchart, setBarChart] = useState(true)
	const {monthlyApplications: data} = useAppSelector(store => store.allJobs)
	return (
		<Wrapper>
			<button className={`btn  btn-success ${barchart? 'active':''}`} type={'button'} onClick={() => setBarChart(true)}>BarChart</button>
			<button className={`btn  btn-success ${!barchart? 'active':''}`} type={'button'} onClick={() => setBarChart(false)}>Area Chart</button>

			{barchart? <BarChart data={data}/>: <AreaChart data={data}/>}
		</Wrapper>
	);
};

export default ChartsContainer;
