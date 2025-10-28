/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Box } from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import { ReactNode } from "react";

interface PopupProps {
  open: boolean;
  children?: ReactNode;
  showOnClose?: boolean;
  onClose: () => void;
}

export const Popup = ({
  children,
  open,
  onClose,
  showOnClose = true,
}: PopupProps) => {
  if (!open) return null;

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Stack
      onClick={handleBackdropClick}
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(15px)",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          borderRadius: "15px",
          width: "fit-content",
          height:"fit-content",
          maxHeight: "90vh",
          display: "inline-block",
          boxShadow: 3,
          p: 2,
          position:"relative"
        }}
      >
        <IconifyIcon
          display={showOnClose ? "block" : "none"}
          icon="hugeicons:cancel-01"
          onClick={onClose}
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: -10,
            right: -10,
            fontSize: 28,
            backgroundColor: "#E1801C",
            color: "#fff",
            borderRadius: "50%",
            padding: 0.6,
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#ff0000",
              color: "#fff",
            },
          }}
        />
        <Box
          sx={{
            mt: 1,
            height:"fit-content",
            maxHeight: "80vh",
            overflowY: "auto",
            pr: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
};
