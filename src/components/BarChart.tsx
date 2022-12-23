import React, {FC} from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

import {Application} from "../features/allJobs/allJobsSlice";

interface IData {
	data: Application[];
}

const BarChartComponent:FC<IData> = ({data}) => {
	return (
		<ResponsiveContainer width={'100%'} height={300}>
			<BarChart data={data} margin={{top:50}}>
				<CartesianGrid strokeDasharray={'10 10'} />
				<XAxis dataKey={'date'} />
				<YAxis allowDecimals={false} />
				<Tooltip/>
				<Bar dataKey={'count'} fill={'#2cb1bc'} barSize={50}/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartComponent;
