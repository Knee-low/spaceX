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
import { getTimeAgo } from "@/utils/helpers";
import { CustomLink } from "@/components/CustomLink";

interface Props {
  launch: LaunchType;
  ref: ((node: HTMLDivElement | null) => void) | null;
}

export const LaunchDetailCard: FC<Props> = ({ launch, ref }) => {
  const { name, success, date_utc, links, details } = launch;
  const { onClickView, linksArray, detailsArray, isShowDetails } = useHooks({
    links,
  });

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

        {isShowDetails && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "13px", color: "text.secondary", mb: 1.5 }}
              >
                {getTimeAgo(date_utc)}
              </Typography>
              {linksArray.length > 0 &&
                linksArray.map((link, index) => (
                  <CustomLink key={index} linkObject={link} />
                ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {detailsArray?.large ? (
                <Box
                  component="img"
                  src={detailsArray.large}
                  alt="Mission Patch"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    objectFit: "cover",
                    backgroundColor: "grey.200",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "text.secondary",
                  }}
                >
                  No image yet.
                </Typography>
              )}

              <Typography
                sx={{
                  fontSize: 12,
                  fontStyle: "italic",
                  color: "text.secondary",
                }}
              >
                {details ?? "No details yet."}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button
          onClick={onClickView}
          sx={{ mb: 1, ml: 1 }}
          size="small"
          variant="contained"
        >
          {isShowDetails ? "Hide" : "View"}
        </Button>
      </CardActions>
    </Card>
  );
};
