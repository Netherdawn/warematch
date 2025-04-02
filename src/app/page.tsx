import { Container } from "@mui/material";
import Listings from "./components/listings/listings";

// given time I would like to build some ease of use function
// where the endpoints are constants and shared across components to make changes easy
const BASE_ADDRESS = 'http://54.242.149.77:8000/';
const AUTH_ADDRESS = 'auth/jwt/create/';
const LISTINGS_ADDRESS = 'listings/listings';

// these should really be in a config that is in the gitIgnore
const AUTH_EMAIL = '';
const AUTH_PASS = '';

/* ***** TYPES ***** */
// if I could remember how I would reuse the constant to declare this strict type
type subDomainsTypes = 'auth/jwt/create/' | 'listings/listings';
interface successResType {
	success: true;
}
interface failureResType {
	success: false;
}
interface authResType extends successResType {
	refresh: string;
	access: string;
	welcome_message: string;
}
interface listingResType extends successResType {
	data: object[]
}

const createUrl = (subDomain: subDomainsTypes): string => BASE_ADDRESS + subDomain;

const fetchAuth = async (): Promise<authResType | failureResType> => {
	const res = await fetch(createUrl(AUTH_ADDRESS), {
		method: 'POST',
		// headers because of error and stack overflow told me to do so because of django database
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: AUTH_EMAIL,
			password: AUTH_PASS
		})
	});

	// Ideally here I would want to return a specific error code on a failure to parse the error correctly in the ui
	// Possibly using catch or throwing an error to make use of inbuilt nextjs error pages
	// this type of extending is kinda hacky 

	if(!res.ok) return { success: false };
	const resObj = await res.json();
	return { ...resObj, success: true };
}

const fetchListings = async (): Promise<listingResType | failureResType> => {
	const authRes = await fetchAuth();

	if(!authRes.success) return { success: false};

	const res = await fetch(createUrl(LISTINGS_ADDRESS), {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authRes.access}`
		}
	});
	// Ideally here I would want to return a specific error code on a failure to parse the error correctly in the ui
	// Possibly using catch or throwing an error to make use of inbuilt nextjs error pages
	// this type of extending is kinda hacky 

	if(!res.ok) return { success: false };
	const listings = await res.json();
	return {
		success: true,
		// don't need all the data for the demo
		// how to paginate the data feeds into a wider product discusson on target customers
		data: listings.slice(0,8)
	};
};

export default async function Home() {
	const res = await fetchListings();

  return (
    <div className='w-[100vw] h-[100vh] bg-offWhite'>
			<Container>
				{/* Prop drilling in this context is fine */}
				{res.success ? (
					<Listings listings={res.data} />
				) : (
					<p className='color-black w-full text-center'>
						Server Error: 500 <br/><br />
						Maybe the credentials are missing/incorrect
					</p>
				)}
			</Container>
    </div>
  );
}
