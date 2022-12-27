import React, {FC} from 'react';

import {ResponsiveContainer,AreaChart , Area, XAxis, YAxis,CartesianGrid, Tooltip} from 'recharts'
import {Application} from "../features/allJobs/types";



interface IData {
	data: Application[];
}

const AreaChartComponent:FC<IData> = ({data}) => {

	return (
		<ResponsiveContainer width={'100%'} height={300}>
			<AreaChart data={data} margin={{top:50}}>
				<CartesianGrid strokeDasharray={'3 3'}/>
				<XAxis dataKey={'date'}/>
				<YAxis allowDecimals={false}/>
				<Tooltip/>
				<Area dataKey={'count'} type={'monotone'} stroke={'#1e3a8a'} fill={'#2cb1bc'}/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default AreaChartComponent;
