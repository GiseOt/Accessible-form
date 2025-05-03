import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useState, useEffect } from "react";
import {
	TextField,
	Box,
	Container,
	Typography,
	Button,
	useTheme,
} from "@mui/material";

const Form = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");

	const [activeField, setActiveField] = useState(null);
	const [isListening, setIsListening] = useState(false);

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

	const { start, stop } = useSpeechRecognition((detectedText) => {
		const normalizedText = normalizeDictatedText(detectedText, activeField);
		if (activeField === "firstName") setFirstName(normalizedText);
		if (activeField === "lastName") setLastName(normalizedText);
		if (activeField === "address") setAddress(normalizedText);
		if (activeField === "email") setEmail(normalizedText);

		stop();
		setIsListening(false);
		setActiveField(null);
	});

	const handleFieldClick = (field) => {
		if (activeField !== field) {
			stop(); 
			setActiveField(field);
			setIsListening(true);
			start();
		}
	};

	useEffect(() => {
		if (activeField) {
			stop();
			setIsListening(true);
			start();
		}
	}, [activeField]);

	const theme = useTheme();

	const getInputStyles = (field) => ({
		mb: 2,
		border: activeField === field && isListening ? "2px solid #4CAF50" : "1px solid #ccc",
		borderRadius: "4px",
		padding: "10px",
		animation: activeField === field && isListening ? "pulse 1s infinite" : "none",
		"@keyframes pulse": {
			"0%": { boxShadow: "0 0 0 0 rgba(0, 128, 0, 0.4)" },
			"70%": { boxShadow: "0 0 0 10px rgba(0, 128, 0, 0)" },
			"100%": { boxShadow: "0 0 0 0 rgba(0, 128, 0, 0)" },
		},
	});

	return (
		<Container maxWidth="sm" sx={{ marginTop: "50px" }}>
			<Box
				sx={{
					bgcolor: theme.palette.primary.light,
					height: "auto",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
                    gap: "20px",
					padding: "50px",
					borderRadius: "10px",
					boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
				}}
			>
				<Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
					Completa tus datos
				</Typography>

				{/* Nombre */}
				<Box sx={{ width: "100%"}}>
					<TextField
						id="firstName"
						value={firstName}
						label="Nombre"
						onChange={(e) => setFirstName(e.target.value)}
						onClick={() => handleFieldClick("firstName")}
						variant="outlined"
						fullWidth
						sx={getInputStyles("firstName")}
						InputLabelProps={{
							shrink: true,
						}}
						aria-label="Campo para nombre"
					/>
					{activeField === "firstName" && isListening && (
						<Typography color="green" variant="caption">
							🎤 Escuchando...
						</Typography>
					)}
				</Box>

				{/* Apellido */}
				<Box sx={{ width: "100%" }}>
					<TextField
						id="lastName"
						value={lastName}
						label="Apellido"
						onChange={(e) => setLastName(e.target.value)}
						onClick={() => handleFieldClick("lastName")}
						variant="outlined"
						fullWidth
						sx={getInputStyles("lastName")}
						InputLabelProps={{
							shrink: true,
						}}
						aria-label="Campo para apellido"
					/>
					{activeField === "lastName" && isListening && (
						<Typography color="green" variant="caption">
							🎤 Escuchando...
						</Typography>
					)}
				</Box>

				{/* Dirección */}
				<Box sx={{ width: "100%" }}>
					<TextField
						id="address"
						value={address}
						label="Dirección"
						onChange={(e) => setAddress(e.target.value)}
						onClick={() => handleFieldClick("address")}
						variant="outlined"
						fullWidth
						sx={getInputStyles("address")}
						InputLabelProps={{
							shrink: true,
						}}
						aria-label="Campo para dirección"
					/>
					{activeField === "address" && isListening && (
						<Typography color="green" variant="caption">
							🎤 Escuchando...
						</Typography>
					)}
				</Box>

				{/* Email */}
				<Box sx={{ width: "100%" }}>
					<TextField
						id="email"
						value={email}
						label="Email"
						onChange={(e) => setEmail(e.target.value)}
						onClick={() => handleFieldClick("email")}
						variant="outlined"
						fullWidth
						sx={getInputStyles("email")}
						InputLabelProps={{
							shrink: true,
						}}
						aria-label="Campo para correo electrónico"
					/>
					{activeField === "email" && isListening && (
						<Typography color="green" variant="caption">
							🎤 Escuchando...
						</Typography>
					)}
				</Box>

				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={() => alert("Formulario enviado con éxito!")}
					sx={{
						mt: 2,
						bgcolor: theme.palette.primary.main,
						"&:hover": {
							bgcolor: theme.palette.primary.dark,
						},
					}}
					aria-label="Enviar formulario"
				>
					Enviar
				</Button>
			</Box>
		</Container>
	);
};

export default Form;
