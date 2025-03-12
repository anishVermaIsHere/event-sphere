import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  FormControl,
  Typography,
  Grid2,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { applyEventSchema } from "../../shared/validation/schema";
import RichTextEditor from "../miscellaneous/rich-editor";
import { useEffect } from "react";
import { htmlToMarkdown } from "../../shared/utils";
import speakerAPI from "../../shared/services/api/speaker";

const EventRegisterForm = ({ eventId }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(applyEventSchema) });

  const onSubmit = async (data) => {
    const formData = {
      eventId,
      topicsOfInterest: data.topicsOfInterest,
      bio: await htmlToMarkdown(data.bio),
      previousExperience: await htmlToMarkdown(data.previousExperience),
      reasonForAttend: data.reasonForAttend,
      specialRequirements: data.specialRequirements,
      content: await htmlToMarkdown(data.content),
      termsAgreed: data.termsAgreed,
      dataPrivacyAgreed: data.dataPrivacyAgreed,
    };
    await speakerAPI.applyEvent(formData);
    reset();
  };

  useEffect(() => {
    register("bio", { required: true, minLength: 15 });
  }, [register]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mx: "auto", width: { xs: "100%", md: "768px" } }}
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
            <Typography mb={2}>Biography</Typography>
            <RichTextEditor
              setValue={setValue}
              value={watch("bio")}
              name="bio"
            />
            <Typography
              component="p"
              variant="body2"
              className=".css-1ylo5ag-MuiFormHelperText-root.Mui-error "
            >
              {errors?.bio?.message}
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <Typography mb={2}>Previous Experience</Typography>
            <RichTextEditor
              setValue={setValue}
              value={watch("previousExperience")}
              name="previousExperience"
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

          <Grid2 item size={{ xs: 12 }}>
            <Typography mb={2}>Content</Typography>
            <RichTextEditor
              setValue={setValue}
              value={watch("content")}
              name="content"
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Terms agree"
              {...register("termsAgreed")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Data privacy agree"
              {...register("dataPrivacyAgreed")}
            />
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
