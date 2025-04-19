"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import useFetch from "../../hooks/useFetch";
import { TouristSpot } from "../../types/touristSpots";
import { Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useTouristSpots } from "../../services/useTouristSpots";
import { useNavigate } from "react-router";
interface User {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
}

export default function DashboardViewPage() {
  const { data: spots } = useFetch<TouristSpot[]>(
    "http://localhost:8080/v1/tourist-spots"
  );
  const { data: userInfo } = useFetch<User>(
    "http://localhost:8080/v1/userInfo"
  );

  const { create, update } = useTouristSpots();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = useCallback(() => {
    setOpenConfirmationModal(true);
  }, []);

  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    if (userInfo) setLoggedUser(userInfo);
  }, [userInfo]);

  const handleCreate = async (data: TouristSpot) => {
    await create(data);
  };

  const handleUpdate = async (id: number, data: TouristSpot) => {
    await update(id, data);
  };

  // if (error)
  //   return <Typography>Falhou para carregar os dados da API</Typography>;

    return (
    <Box>
      <AppBar
        position="static"
        sx={{
          width: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toolbar>
            <AddLocationAltIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Guia Turístico
            </Typography>
          </Toolbar>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Sair
          </Button>
        </Container>
      </AppBar>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            justifySelf: "center",
            width: "80%",
            mt: 4,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Olá, {loggedUser?.name} 👋
            </Typography>

            <Typography variant="body2">
              Aqui você pode visualizar seus pontos turísticos salvos e criar
              novos
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleOpenModal}>
            novo ponto turistico
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            justifyContent: "center",
            width: "100%",
            marginLeft: 2,
          }}
        >
          {spots?.length ? spots.map((spot) => (
            <Card
              sx={{
                mb: 2,
                p: 4,
                width: "250px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2">{spot.name}</Typography>
                <Tooltip title="Editar Informações sobre esse Ponto Turístico">
                  <IconButton
                    size="small"
                    color="default"
                    onClick={handleOpenModal}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body2" fontStyle="italic" mt={2}>
                {spot.description}
              </Typography>
              <Typography variant="caption">{spot.address}</Typography>
            </Card>
          )) : <Typography>Nenhum Guia Turístico foi adicionado</Typography>}
        </Box>

        <Dialog
          open={openConfirmationModal}
          onClose={() => setOpenConfirmationModal(false)}
        >
          <DialogTitle>Informações sobre o Ponto Turístico </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Endereço"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
                fullWidth
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                color="primary"
                onClick={() => setOpenConfirmationModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="contained">Salvar</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
