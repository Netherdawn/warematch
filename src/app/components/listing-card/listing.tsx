import { 
	Card, 
	CardActions,
	Button
} from '@mui/material';

import { 
	cheatObjectType,
	addToComparisonFunc,
	removeFromComparisonFunc
} from '../listings/listings-types';

import ListingDetailsAccordion from '../listing-details/listing-details';

interface ListingProps {
	data: cheatObjectType;
	isInComparison: boolean;
	addToComparison: addToComparisonFunc;
	removeFromComparison: removeFromComparisonFunc;
}

export default function listing({ 
	data, isInComparison, addToComparison, removeFromComparison 
}: ListingProps) {
	const {
			ListingName,
			images,
			// we should transform these in the life cycle or maybe in a selector in storing to a state
			price_per_standard_pallet_stackable_per_month,
			fee_percentage,
			payment_frequency,
			ListingDetails, 
			id,
			available_pallets,
			available_square_footage
	} = data;

	const calculateMinPalettePrice = (price_per_standard_pallet_stackable_per_month: string, fee_percentage: string): string => {
		// this should be server calc
		const pricePerStanPal = parseInt(price_per_standard_pallet_stackable_per_month);
		const percentage = parseInt(fee_percentage);
		return Math.round(pricePerStanPal + ((pricePerStanPal/100) * percentage)).toFixed(2); 
	}
	return (
		<Card 
			className='!bg-offGrey !border-offGreyDark' 
			elevation={isInComparison ? 4 : 1}
			sx={{ maxWidth: 345 }}
		>
			{/* I would like a slideshow on the image but time constraint */}
			{/* this should really be componentised */}
			{images.length > 1 && (
				<div 
					className='w-[347px] h-[212px] border border-[#b0a39d] overflow-hidden'
					// there is some css specifity nonsense going on
					// Meterial UI and tailwind ain't playing nice
					// needs investigating how to make copacetic without style
					style={{ backgroundColor: '#b0a39d'}}
				>
					<img 
						src={images[0].image_url} 
						alt='warehouse picture' 
						className='w-full h-full object-contain'
					/>
				</div>
			)}
			<div className='p-4'>
				{price_per_standard_pallet_stackable_per_month && fee_percentage && (
					<p className='text-accentFunky text-sm'>
						<span>from{' '}</span>
						<span className='font-bold'>
							{/* not type correct */}
							{`$${calculateMinPalettePrice(price_per_standard_pallet_stackable_per_month, fee_percentage)}`}
						</span>
						<span>{` per palette / ${payment_frequency}`}</span>
					</p>
				)}
				<h2 className='font-bold truncate'>{ListingName}</h2>
				<p className='text-accentFunky text-xs font-bold'>
					{`${parseInt(available_square_footage).toFixed(0)} SQFT Available`}
				</p>
				<p className='text-accentFunky text-xs font-bold'>
					{`${available_pallets} Pallets Available`}
				</p>

				<ListingDetailsAccordion id={id} details={ListingDetails} />
			</div>
			<CardActions>
				<Button variant='contained' color='success'>
					Contact
				</Button>
				<Button 
					variant='outlined' 
					color='primary' 
					onClick={isInComparison ? () => removeFromComparison(id) : () => addToComparison(id)}
				>
					{isInComparison ? 'Remove' : 'Compare'}
				</Button>
				<Button variant='outlined' color='primary'>
					Expand
				</Button>

			</CardActions>
				
		</Card>
	);
}