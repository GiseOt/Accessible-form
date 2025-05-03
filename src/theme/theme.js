import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			light: "rgb(166, 241, 224)",
			main: "rgb(115, 199, 199)",
			dark: "#002884",
			contrastText: "#fff",
		},
		secondary: {
			light:"rgb(244, 248, 211)",
			main: "rgb(166, 241, 224)",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});

export default theme;
