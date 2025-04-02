'use client'

import { useState } from 'react';
import Listing from '../listing-card/listing';
import { Grid } from '@mui/material';

import { 
	stringObject, 
	ListingsProps,
	cheatObjectType,
	addToComparisonFunc,
	removeFromComparisonFunc
} from './listings-types';

export default function Listings(props: ListingsProps) {
	const [isComparing, setComparing] = useState<boolean>(false);
	const [comparedIds, setComparedIds] = useState<stringObject>({});

	const addToComparison: addToComparisonFunc = (id) => {
		if(Object.keys(comparedIds).length === 0) setComparing(true);
		setComparedIds({ ...comparedIds, [id]: id});
	};

	const removeFromComparison: removeFromComparisonFunc = (id) => {
		if(Object.keys(comparedIds).length === 1) {
			setComparing(false);
			setComparedIds({});
			return;
		}
		const cloned = { ...comparedIds };
		delete cloned[id];
		setComparedIds(cloned);
	};

	return (
		<Grid container spacing={3}>
			{props.listings.map((listing: cheatObjectType, i: number) => (
				<Grid
					// this should be more explicit than just the index
					// because of the limited scope here not important
					key={i} 
					size={{ xs: 12, md: 6 }} 
					sx={{ alignItems: 'stretch' }}
				>
					<Listing 
						data={listing} 
						addToComparison={addToComparison} 
						removeFromComparison={removeFromComparison}
						isInComparison={isComparing && !!comparedIds[listing.id]}
					/>
				</Grid>
			))}
		</Grid>
	);
}