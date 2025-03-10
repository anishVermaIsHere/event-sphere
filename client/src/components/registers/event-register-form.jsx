import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  FormControl,
  Typography,
  Grid2,
  TextField,
  InputLabel,
  Button,
  Checkbox, 
  FormControlLabel
} from "@mui/material";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { applyEventSchema } from "../../shared/validation/schema";

const EventRegisterForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(applyEventSchema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "docsLinks", // unique name for your Field Array
  });

  const onSubmit = (data) => {};

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mx: "auto" }}
      >
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.topicsOfInterest?.message && true}
              id="topicsOfInterest"
              name="topicsOfInterest"
              label="Topics of Interest"
              size="small"
              helperText={errors?.topicsOfInterest?.message}
              fullWidth
              {...register("topicsOfInterest")}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.bio?.message && true}
              id="bio"
              name="bio"
              label="Bio"
              size="small"
              helperText={errors?.bio?.message}
              multiline
              fullWidth
              maxRows={6}
              minRows={6}
              {...register("bio")}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.description?.message && true}
              id="previousExperience"
              name="previousExperience"
              label="Previous Experience"
              size="small"
              helperText={errors?.description?.message}
              multiline
              fullWidth
              maxRows={6}
              minRows={6}
              {...register("previousExperience")}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.description?.message && true}
              id="reasonForAttend"
              name="reasonForAttend"
              label="Reason to Attend"
              size="small"
              helperText={errors?.description?.message}
              multiline
              fullWidth
              maxRows={6}
              minRows={6}
              {...register("reasonForAttend")}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.description?.message && true}
              id="specialRequirements"
              name="specialRequirements"
              label="Requirements or Needs"
              size="small"
              helperText={errors?.description?.message}
              multiline
              fullWidth
              maxRows={6}
              minRows={6}
              {...register("specialRequirements")}
            />
          </Grid2>

          <Grid2 item size={{ xs: 12 }} sx={{ position: "relative" }}>
            <Typography mb={2}>Document Links</Typography>
            <TextField
              // required
              error={errors?.description?.message && true}
              id="docsLinks"
              name="docsLinks"
              label="Docs links"
              size="small"
              helperText={errors?.description?.message}
              multiline
              fullWidth
            //   maxRows={6}
            //   minRows={6}
              {...register("docsLinks")}
            />
          </Grid2>

          <Grid2 item size={{ xs: 12 }}>
            <TextField
              // required
              error={errors?.description?.message && true}
              id="content"
              name="content"
              label="Content"
              size="small"
              helperText={errors?.description?.message}
              multiline
              fullWidth
              maxRows={6}
              minRows={6}
              {...register("content")}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
             <FormControlLabel control={<Checkbox />} label="Terms agree" {...register('termsAgreed')} />
             <FormControlLabel control={<Checkbox />} label="Data privacy agree" {...register('dataPrivacyAgreed')} />
          </Grid2>
        </Grid2>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2, width: { xs: "100%", sm: "50%", lg: "30%" } }}
        >
          Register
        </Button>
      </FormControl>
    </Box>
  );
};

export default EventRegisterForm;
