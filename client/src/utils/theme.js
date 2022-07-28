import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	status: {
		danger: 'rgba(70, 68, 141, 50%',
	},
	palette: {
		secondary: {
			main: 'rgba(70, 68, 141, 50%)',
			darker: 'rgba(70, 68, 141, 50%)',
		},
		neutral: {
			main: 'rgba(70, 68, 141, 50%',
			contrastText: '#fff',
		},
	},
});

export { theme, ThemeProvider };
