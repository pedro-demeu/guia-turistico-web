"use client";

import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import useFetch from "../../hooks/useFetch";
import {
  CreateTouristSpotData,
  TouristSpot,
  UpdateTouristSpotData,
} from "../../types/touristSpots";
import { Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useTouristSpots } from "../../services/useTouristSpots";
import { useNavigate } from "react-router";
import TouristSpotForm from "../../components/form/TouristSpotForm";
interface User {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
}

const DEFAULT_TOURIST_SPOT_INITIAL_VALUES = {
  name: "",
  description: "",
  address: "",
  latitude: 0,
  longitude: 0,
};

export default function DashboardViewPage() {
  const { data: userInfo, error } = useFetch<User>(
    "http://localhost:8080/v1/userInfo"
  );

  const { data: spots, mutate } = useFetch<TouristSpot[]>(
    "http://localhost:8080/v1/tourist-spots"
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

  const handleCreate = async (data: CreateTouristSpotData) => {
    await create(data);
    setOpenConfirmationModal(false);
    mutate();
  };

  const handleUpdate = async (
    data: CreateTouristSpotData | UpdateTouristSpotData
  ) => {
    if (!(data as UpdateTouristSpotData)?.id) return;
    await update(data as UpdateTouristSpotData);
    setOpenEdittingModal(false);
    mutate();
  };

  const [openEdittingModal, setOpenEdittingModal] = useState(false);
  const [spotId, setSpotId] = useState<number | null>(null);
  const handleOpenEdittingModal = useCallback(
    (id: number) => {
      setSpotId(id);
      setOpenEdittingModal(true);
    },
    [setSpotId]
  );

  const getValuesFromSpotId = useCallback(
    (id: number) => {
      const spot = spots?.find((spot) => spot.id === id);
      if (!spot) return DEFAULT_TOURIST_SPOT_INITIAL_VALUES;
      return spot;
    },
    [spots]
  );

  if (!userInfo) return <Typography>Carregando...</Typography>;
  if (error)
    return <Typography>Falhou para carregar os dados da API</Typography>;

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
          {spots?.length ? (
            spots.map((spot) => (
              <Card
                key={spot.id}
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
                      onClick={() => handleOpenEdittingModal(spot.id)}
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
            ))
          ) : (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Nenhum Guia Turístico foi adicionado
              </Typography>
            </Box>
          )}
        </Box>

        <Dialog
          open={openConfirmationModal}
          onClose={() => setOpenConfirmationModal(false)}
        >
          <DialogTitle>Informações sobre o Ponto Turístico </DialogTitle>
          <DialogContent>
            <TouristSpotForm
              initialValues={DEFAULT_TOURIST_SPOT_INITIAL_VALUES}
              onSave={handleCreate}
              onClose={() => setOpenConfirmationModal(false)}
            />
          </DialogContent>
        </Dialog>

        {spotId && (
          <Dialog
            open={openEdittingModal}
            onClose={() => setOpenEdittingModal(false)}
          >
            <DialogTitle>Informações sobre o Ponto Turístico </DialogTitle>
            <DialogContent>
              <TouristSpotForm
                initialValues={getValuesFromSpotId(spotId)}
                onSave={handleUpdate}
                onClose={() => setOpenEdittingModal(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}
