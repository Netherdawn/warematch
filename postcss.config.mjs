const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
	themes: {
		colors: {
			offWhite: '#EDEAE5',
			offGrey: '#d5cec8',
			offGreyDark: '#b0a39d',
			success: '#6ad3a4',
			successOff: '#cffcc1',
			primary: '#6fcfc4',
			primaryOff: '#90e5c6',
			accentYellow : '#fce181',
			accentYellowOff: '#fef9c7',
			accentFunky: '#895971'
		},
		extend: {
			transitionProperty: {
				'max-height': 'max-height'
			}
		}
	}
};
/* color theory and a little visual interest */

export default config;
