import { Formik } from "formik";
import { CreateTouristSpotData, UpdateTouristSpotData } from "../../types/touristSpots";
import { Box, TextField, Button, Typography } from "@mui/material";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const schema = z.object({
  name: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
  description: z.string().min(5, "Mínimo 5 caracteres"),
  address: z.string().min(10, "Mínimo 10 caracteres"),
  latitude: z.number(),
  longitude: z.number(),
});

// type FormData = z.infer<typeof schema>

interface FormProps {
  initialValues: CreateTouristSpotData | UpdateTouristSpotData;
  onSave: (data: CreateTouristSpotData | UpdateTouristSpotData) => Promise<void>;
  onClose: () => void;
  onDelete?: (id: number) => Promise<void>;
  showDeleteButton?: boolean;
}
export default function TouristSpotForm({
  initialValues,
  onSave,
  onClose,
}: FormProps) {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(schema)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onSave(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty: isDirty,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              paddingTop: 10,
            }}
          >
            <Box
              sx={{
                mb: 2,
              }}
            >
              <TextField
                id="name"
                name="name"
                label="Nome"
                error={touched.name && !!errors.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                fullWidth
              />
              {touched.name && !!errors.name && (
                <Typography variant="caption" color="error" ml={1}>
                  {errors.name}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <TextField
                id="description"
                name="description"
                label="Descrição"
                value={values.description}
                error={touched.description && !!errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                fullWidth
              />
              {touched.description && !!errors.description && (
                <Typography variant="caption" color="error" ml={1}>
                  {errors.description}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <TextField
                id="address"
                name="address"
                label="Endereço"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && !!errors.address}
                variant="outlined"
                fullWidth
              />
              {touched.address && !!errors.address && (
                <Typography variant="caption" color="error" ml={1}>
                  {errors.address}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <TextField
                id="latitude"
                name="latitude"
                label="Latitude"
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched && !!errors.latitude}
                variant="outlined"
                type="number"
                fullWidth
              />
              {touched.latitude && !!errors.latitude && (
                <Typography variant="caption" color="error" ml={1}>
                  {errors.latitude}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <TextField
                id="longitude"
                name="longitude"
                label="Longitude"
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={touched && !!errors.longitude}
                variant="outlined"
                fullWidth
              />
              {touched.longitude && !!errors.longitude && (
                <Typography variant="caption" color="error" ml={1}>
                  {errors.longitude}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Button variant="text" color="primary" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !isValid || !isDirty}
              >
                Salvar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}
