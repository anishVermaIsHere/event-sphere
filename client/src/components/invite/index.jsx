import { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useFormStore from "../../store/form.store";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { inviteeSchema } from "../../shared/validation/schema";
import useAppStore from "../../store/app.store";
import inviteeAPI from "../../shared/services/api/invitee";
import { queryClient } from "../../providers/query-provider";


const formStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 400, xl: 600 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const fetchUsers = async () => {
//   const res = await Promise.all([
//     userAPI.findByRole("guest"),
//     userAPI.findByRole("speaker"),
//   ]);
//   return [...res[0].data, ...res[1].data];
// };

const InviteModal = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const { invite: { isOpen, setIsOpen } } = useFormStore((state) => state);
  const { setSnackbar } = useAppStore(state=>state);
  const { register, reset, handleSubmit, formState: { errors } } = useForm({  defaultValues: { email: "" }, resolver: joiResolver(inviteeSchema),});

  const handleClose = () => { 
    setIsOpen(false); 
    reset();
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await inviteeAPI.register(data);
      if(res.status === 201){
        setSnackbar("Invitation sent", "info");
      }
      setIsLoading(false);
      handleClose();
      queryClient.invalidateQueries("invitees");
    } catch (error) {
      setSnackbar(error?.response.data?.message);
      setIsLoading(false);
      handleClose();
    }
  };


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" noValidate sx={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="p" variant="h6">
          Invite Members
        </Typography>
        <Typography component="p" variant="p" color="text.secondary" mb={2}>
          Type user email and send invitation
        </Typography>
        <TextField
          label="Email"
          type="text"
          // variant="filled"
          name="email"
          size="small"
          error={errors?.email?.message && true}
          helperText={errors?.email?.message}
          sx={{ mb: 2 }}
          autoComplete="off"
          fullWidth
          {...register("email")}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ height: "100%", float: "right" }}
          disabled={isLoading}
        >
          <SendIcon sx={{ mr: 1 }} />
          {isLoading ? "Sending..." : "Invite"}
        </Button>
      </Box>
    </Modal>
  );
};

export default InviteModal;
