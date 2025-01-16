import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertCard({ color, message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={color}>{message}</Alert>
    </Stack>
  );
}
