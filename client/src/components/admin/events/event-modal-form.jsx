import {
  TextField,
  Button,
  Grid2,
  Typography,
  FormControl,
  Box,
  Modal,
  Switch,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Chip,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CustomDateTimePicker from "../dashboard/custom-date-time-picker";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { fetchEventsData } from "../../../shared/utils";
import { useQuery } from "@tanstack/react-query";
import eventAPI from "../../../shared/services/api/event";
import { queryClient } from "../../../providers/query-provider";
import { eventSchema } from "../../../shared/validation/schema";
import { formBoxStyle, SelectMenuProps as MenuProps } from "./styles";
import useAppStore from "../../../store/app.store";
import GoogleMaps from "./g-map";



const LazyEventForm = ({ handleClose, open }) => {
  const { data } = useQuery({ queryKey: ["event-data"], queryFn: fetchEventsData });
  const { setSnackbar } = useAppStore(state=>state);
  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startTime: dayjs(),
      endTime: dayjs().add(2, "hour"),
      location: "",
      category: "",
      priceInCents: 0,
      capacity: 500,
      isPrivate: false,
      guests: [],
      speakers: [],
    },
  });
  const isPrivate = watch("isPrivate");

  const onSubmit = async (data) => {
    const validation = eventSchema.validate({
      ...data,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    });
    if (validation.error) {
      setSnackbar(validation.error.message, "warning");
      return;
    }
    const res = await eventAPI.create(validation.value);
    if (res.status === 201) {
      queryClient.invalidateQueries("events");
    }
    reset();
    handleClose();
  };

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add event form"
        aria-describedby="add event form"
        sx={{ overflowY: "auto" }}
      >
        <Box sx={formBoxStyle}>
          <FormControl
            fullWidth
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h6" gutterBottom>
              Create Event
            </Typography>
            <Grid2 container spacing={3}>
              <Grid2 item size={{ xs: 12, md: 9 }}>
                <TextField
                  // required
                  error={errors?.name?.message && true}
                  id="name"
                  name="name"
                  label="Event Name"
                  size="small"
                  helperText={errors?.name?.message}
                  fullWidth
                  {...register("name")}
                />
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, md: 3 }}
                sx={{ position: "relative" }}
              >
                <Controller
                  name="isPrivate"
                  control={control}
                  defaultValue={false} // Initial value
                  render={({ field }) => (
                    <FormControlLabel
                      label="Is Private"
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          color="primary"
                        />
                      }
                    />
                  )}
                />
              </Grid2>
              <Grid2 item size={{ xs: 12 }}>
                <TextField
                  // required
                  error={errors?.description?.message && true}
                  id="description"
                  name="description"
                  label="Description"
                  size="small"
                  helperText={errors?.description?.message}
                  multiline
                  fullWidth
                  maxRows={6}
                  minRows={6}
                  {...register("description")}
                />
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, md: 6 }}
                sx={{ position: "relative" }}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  error={errors?.category?.message && true}
                  helperText={errors?.category?.message}
                  MenuProps={MenuProps}
                  defaultValue=""
                  size="small"
                  fullWidth
                  {...register("category")}
                >
                  {data?.categories?.map((cat) => (
                    <MenuItem key={cat._id} value={cat?.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography component="small" variant="p" color="error.main">
                  {data?.categories?.length === 0 && "No categories"}
                </Typography>
              </Grid2>

              <Grid2
                item
                size={{ xs: 12, md: 6 }}
                sx={{ position: "relative" }}
              >
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  error={errors?.location?.message && true}
                  helperText={errors?.location?.message}
                  MenuProps={MenuProps}
                  defaultValue=""
                  size="small"
                  fullWidth
                  {...register("location")}
                >
                  {data?.locations?.map((loc) => (
                    <MenuItem key={loc._id} value={loc?._id}>
                      {loc.venueName + "," + loc.city}
                    </MenuItem>
                  ))}
                </Select>
                <Typography component="small" variant="p" color="error.main">
                  {data?.locations?.length === 0 && "No locations"}
                </Typography>
              </Grid2>

              <Grid2
                item
                size={{ xs: 12, md: isPrivate ? 4 : 12 }}
                sx={{ position: "relative" }}
                fullWidth
              >
                <InputLabel id="speakers-label">Speakers</InputLabel>
                <Controller
                  name="speakers"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      fullWidth
                      error={errors?.speakers?.message && true}
                      MenuProps={MenuProps}
                      size="small"
                      labelId="speakers-label"
                      id="speakers"
                      input={<OutlinedInput label="Multiple Speakers" />}
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selected.map((value) => {
                            const item = data?.userKeys?.speakers[value];
                            return (
                              <Chip
                                key={value}
                                label={item.firstName + " " + item.lastName}
                                onDelete={() => {
                                  const newValue = field.value.filter(
                                    (v) => v !== value
                                  );
                                  field.onChange(newValue);
                                }}
                                deleteIcon={
                                  <CancelIcon
                                    onMouseDown={(event) =>
                                      event.stopPropagation()
                                    }
                                  />
                                }
                              />
                            );
                          })}
                        </Stack>
                      )}
                    >
                      {data?.speakers?.map((sp) => (
                        <MenuItem key={sp._id} value={sp._id}>
                          {sp.firstName + " " + sp.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <Typography component="small" variant="p" color="error.main">
                  {errors?.speakers?.message}
                </Typography>
                <Typography component="small" variant="p" color="error.main">
                  {data?.speakers?.length === 0 && "No speakers"}
                </Typography>
              </Grid2>
              {isPrivate && (
                <Grid2
                  item
                  size={{ xs: 12, md: 4 }}
                  sx={{ position: "relative" }}
                  fullWidth
                >
                  <InputLabel id="guests-label">Guests</InputLabel>
                  <Controller
                    name="guests"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        fullWidth
                        error={errors?.guests?.message && true}
                        MenuProps={MenuProps}
                        size="small"
                        labelId="guests-label"
                        id="guests"
                        input={<OutlinedInput label="Multiple Guests" />}
                        renderValue={(selected) => (
                          <Stack gap={1} direction="row" flexWrap="wrap">
                            {selected.map((value) => {
                              const item = data?.userKeys?.guests[value];
                              return (
                                <Chip
                                  key={value}
                                  label={item.firstName + " " + item.lastName}
                                  onDelete={() => {
                                    const newValue = field.value.filter(
                                      (v) => v !== value
                                    );
                                    field.onChange(newValue);
                                  }}
                                  deleteIcon={
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                />
                              );
                            })}
                          </Stack>
                        )}
                      >
                        {data?.guests?.map((guest) => (
                          <MenuItem key={guest._id} value={guest._id}>
                            {guest.firstName + " " + guest.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Typography component="small" variant="p" color="error.main">
                    {errors?.guests?.message}
                  </Typography>
                  <Typography component="small" variant="p" color="error.main">
                    {data?.guests?.length === 0 && "No guests"}
                  </Typography>
                </Grid2>
              )}
              <Grid2
                item
                size={{ xs: 12, md: 6 }}
                sx={{ position: "relative" }}
              >
                <TextField
                  // required
                  error={errors?.priceInCents?.message && true}
                  id="priceInCents"
                  name="priceInCents"
                  label="Ticket Price (in cents)"
                  size="small"
                  type="number"
                  placeholder="2000"
                  helperText={errors?.priceInCents?.message}
                  fullWidth
                  {...register("priceInCents")}
                />
              </Grid2>

              <Grid2
                item
                size={{ xs: 12, md: 6 }}
                sx={{ position: "relative" }}
              >
                <TextField
                  // required
                  error={errors?.capacity?.message && true}
                  id="capacity"
                  name="capacity"
                  label="Seating capacity"
                  size="small"
                  type="number"
                  placeholder="100-10000"
                  helperText={errors?.capacity?.message}
                  fullWidth
                  {...register("capacity")}
                />
              </Grid2>

              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <CustomDateTimePicker
                  control={control}
                  errors={errors}
                  name="startTime"
                  label="Start Date Time"
                />
              </Grid2>
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <CustomDateTimePicker
                  control={control}
                  errors={errors}
                  name="endTime"
                  label="End Date Time"
                />
              </Grid2>
            </Grid2>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Event
            </Button>
          </FormControl>
        </Box>
      </Modal>
  );
};

export default LazyEventForm;
