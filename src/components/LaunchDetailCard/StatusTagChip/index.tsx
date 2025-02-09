import { FC } from "react";
import { useHooks } from "./hooks";
import Chip from "@mui/material/Chip";

interface Props {
  status: boolean;
}

export const StatusTagChip: FC<Props> = ({ status }) => {
  const { tagStatus, tagColor } = useHooks({ status });
  return (
    <Chip
      sx={{ ml: 1, borderRadius: 0.5 }}
      label={tagStatus}
      color={tagColor}
    />
  );
};
