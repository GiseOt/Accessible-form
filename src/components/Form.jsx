import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useState, useEffect} from "react";
import {
	TextField,
	Box,
	Container,
	Typography,
	Button,
	useTheme,
} from "@mui/material";

const Form = () => {
	// Estado para los campos del formulario
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");

	// Een qué campo está escuchando)
	const [activeField, setActiveField] = useState(null);
 const normalizeDictatedText = (text, field) => {
			let result = text
				.toLowerCase()
				.replace(/ arroba /g, "@")
				.replace(/ arroba/g, "@")
				.replace(/ punto /g, ".")
				.replace(/ punto/g, ".")
				.replace(/ guion /g, "-")
				.replace(/ guion/g, "-")
				.replace(/ guion bajo /g, "_")
				.replace(/ guion bajo/g, "_");

			if (field === "email") {
				result = result.replace(/\s/g, ""); 
			}
			return result;
		};
	// Usar el hook para el reconocimiento de voz
	const { start, stop } = useSpeechRecognition((detectedText) => {
        const normalizedText = normalizeDictatedText(detectedText, activeField);
		// Dependiendo del campo activo, asignamos el texto detectado a ese campo
		if (activeField === "firstName") setFirstName(detectedText);
		if (activeField === "lastName") setLastName(detectedText);
		if (activeField === "address") setAddress(detectedText);
		if (activeField === "email") setEmail(detectedText);
	});

	// Función para iniciar el reconocimiento de voz
	const startListening = () => {
		stop(); 
		start(); 
	};

	// Función para manejar el cambio de campo
	const handleFieldClick = (field) => {
		setActiveField(field);
	
	};

   
 
useEffect(() => {
	if (activeField) {
		stop(); 
		start(); 
	}
}, [activeField]);
	const theme = useTheme();

	return (
		<Container maxWidth="sm" sx={{ marginTop: "125px" }}>
			<Box
				sx={{
					bgcolor: theme.palette.secondary.light,
					height: "70vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
					borderRadius: "10px",
				}}
			>
				<Typography variant="h5" gutterBottom>
					Completa tus datos
				</Typography>

				{/* Nombre */}
				<TextField
					id="firstName"
					value={firstName}
					label="Nombre"
					onChange={(e) => setFirstName(e.target.value)}
					onClick={() => handleFieldClick("firstName")} 
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
				/>

				{/* Apellido */}
				<TextField
					id="lastName"
					value={lastName}
					label="Apellido"
					onChange={(e) => setLastName(e.target.value)}
					onClick={() => handleFieldClick("lastName")} 
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
				/>

				{/* Dirección */}
				<TextField
					id="address"
					value={address}
					label="Dirección"
					onChange={(e) => setAddress(e.target.value)}
					onClick={() => handleFieldClick("address")} 
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
				/>

				{/* Email */}
				<TextField
					id="email"
					value={email}
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
					onClick={() => handleFieldClick("email")} 
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
				/>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={() => alert("Formulario enviado con éxito!")}
					sx={{ mt: 2 }}
				>
					Enviar
				</Button>
			</Box>
		</Container>
	);
};

export default Form;
