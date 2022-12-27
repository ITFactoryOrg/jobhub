import React from 'react';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';

import {useAppSelector, useAppDispatch} from "../store/hooks";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import {changePage} from "../features/allJobs/allJobsSlice";

const pageBtnContainer = () => {
	const {numOfPages,page} = useAppSelector((store) => store.allJobs)
	const dispatch =  useAppDispatch();
	const pages = Array.from({length:numOfPages},(_, index) => {
		return index + 1
	});
	const nextPage = () =>{
		let newNextPage = page + 1;
		if(newNextPage >numOfPages) {
			newNextPage = pages.length;
		}
		dispatch(changePage(newNextPage))
	}
	const prevPage = () =>{
		console.log('prev page')
		let newPrevPage = page - 1;
		if(newPrevPage < 1) {
			newPrevPage = 1;
		}
		dispatch(changePage(newPrevPage))
	}

	return (
		<Wrapper>
			<button className="prev-btn" onClick={prevPage}>
				<HiChevronDoubleLeft/>
				prev
			</button>
			<div className="btn-container">
				{pages.map(pageNum =>{
					return(
						<button
							type={'button'}
							className={pageNum === page ? 'pageBtn active': 'pageBtn'}
							key={pageNum}
							onClick={() => dispatch(changePage(pageNum))}
						>{pageNum}</button>
					)
				})}
			</div>
			<button className="prev-btn" onClick={nextPage}>
				next
				<HiChevronDoubleRight/>
			</button>
		</Wrapper>
	);
};

export default pageBtnContainer;
