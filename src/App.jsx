
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme"; // Importa el tema personalizado
import Form from "./components/Form"; // Componente que usará el tema

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Form /> {/* Componente donde aplicarás el tema */}
		</ThemeProvider>
	);
}

export default App;
