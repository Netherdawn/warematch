'use client'

import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ListingDetailsType {
	id: string;
	details: string;
};

export default function ListingDetailsAccordion({ id, details }: ListingDetailsType) {
	const [isExpanded, setExpanded] = useState<boolean>(false);
	
	// tried using accordian from material ui, was not a fan
	// this would be better if the state logic was further compartmented so only details of a certain size used it
	return details.length > 80 ? (
		<>
			<div className='w-full flex items-center no-wrap'>
				<span 
					className={`overflow-hidden transition-max-height duration-1000 ease-in-out text-xs ${isExpanded ? 'whitespace-pre-wrap max-h-[800rem]' : 'truncate max-w-[90%] max-h-6'}`}
				>
					{details}
				</span>
				<button
					onClick={() => setExpanded(!isExpanded)}
					className={`ml-auto ${isExpanded ? 'mt-auto' : ''}`}
				>
					{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
				</button>
			</div>
		</>
	) : <span className='text-xs'>{details}</span>;
};
