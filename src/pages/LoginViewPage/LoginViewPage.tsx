import { Box, Button, Typography } from "@mui/material";


export default function LoginViewPage() {


  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Box mb={4}>
        <Typography variant="h6">Bem vindo ao Guia Turistico Web</Typography>
        <Typography variant="body2">
          Faça Login para cadastrar pontos turísticos na plataforma
        </Typography>

        <Typography variant="body2" fontWeight="bold" mt={4}>
          Socorro-SP
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleLoginGoogle}>
        Entrar com Google
      </Button>
    </Box>
  );
}
