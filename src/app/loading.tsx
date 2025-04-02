import { Container } from "@mui/material";
import HourglassIcon from '@mui/icons-material/HourglassFull';
// I would like an icon with enough movement to be interesting to look at, but this will do
export default function Loading () {
	return (
		<Container>
			<div className='fill-accentFunky h-[100vh] w-full flex items-center justify-center'>
				<HourglassIcon className='animate-pulse !fill-inherit' />
			</div>
		</Container>
	);
};