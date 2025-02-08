import Typography from "@mui/material/Typography";
import { FC } from "react";
import { LaunchType } from "@/components/playground/hooks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { StatusTagChip } from "@/components/LaunchDetailCard/StatusTagChip";
import { useHooks } from "./hooks";

interface Props {
  launch: LaunchType;
  ref: ((node: HTMLDivElement | null) => void) | null;
}

export const LaunchDetailCard: FC<Props> = ({ launch, ref }) => {
  const { onClickView } = useHooks();
  const { name, success } = launch;
  return (
    <Card ref={ref} sx={{ minWidth: 275, mb: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontSize: 24, fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <StatusTagChip status={success} />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={onClickView}
          sx={{ mb: 1, ml: 1 }}
          size="small"
          variant="contained"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};
