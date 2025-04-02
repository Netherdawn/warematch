export type stringObject = {
  [key: string]: string;
};

// There is an intelligent way to use an interface that it won't throw an error without specifying every key
// but I wanted to do ui
export type cheatObjectType = {
  [key: string]: any;
};

export interface ListingsProps {
	listings: cheatObjectType[]
}

//these two functions could be reused but it doesn't hurt to explicit about their difference incase they change
export type addToComparisonFunc = (a: string) => void;
export type removeFromComparisonFunc = (a: string) => void;