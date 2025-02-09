import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

interface Props {
  linkObject: {
    data: string;
    type: string;
  };
}

export const CustomLink = ({ linkObject }: Props) => {
  const { data, type } = linkObject;
  return (
    <Link
      href={typeof data === "string" ? data : "#"}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        fontSize: "14px",
        color: "primary.main",
        ml: 0.5,
        mb: 1.5,
        borderLeft: "2px solid",
        borderColor: "grey.500",
        pl: 1,
        display: "block",
        textDecoration: "none",
        "&:hover": { textDecoration: "none" },
      }}
    >
      <Typography sx={{ textTransform: "capitalize" }}>{type}</Typography>
    </Link>
  );
};
