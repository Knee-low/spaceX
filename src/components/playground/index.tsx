import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHooks } from "./hooks";
import { LaunchDetailCard } from "@/components/LaunchDetailCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

export const PlaygroundForm = () => {
  const {
    launches,
    isLoading,
    showButtomMessage,
    lastLaunchRef,
    onChangeInput,
  } = useHooks();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="grey.100"
    >
      <Box sx={{ width: "50vw" }}>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={(e) => onChangeInput(e.target.value)}
        />

        <Box
          sx={{
            mt: 3,
            width: "100%",
            height: "50vh",
          }}
        >
          <Box
            id="scroll-container"
            sx={{
              width: "100%",
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "grey.100",
              },
            }}
          >
            {launches.length > 0 &&
              launches.map((launch, index) => (
                <LaunchDetailCard
                  key={launch.id}
                  launch={launch}
                  ref={index === launches.length - 1 ? lastLaunchRef : null}
                />
              ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isLoading && <CircularProgress />}
          {showButtomMessage && <Typography>End of list.</Typography>}
        </Box>
      </Box>
    </Box>
  );
};
