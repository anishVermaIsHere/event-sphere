const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;

export const SelectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const formBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: 800 },
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
};
