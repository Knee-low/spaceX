import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getStatusText = (
  status: boolean | null
): { tagStatus: string; tagColor: "success" | "primary" | "error" } => {
  if (status) return { tagStatus: "success", tagColor: "success" };
  if (status === null) return { tagStatus: "upcoming", tagColor: "primary" };
  return { tagStatus: "failed", tagColor: "error" };
};

export const getTimeAgo = (time: string) => {
  return dayjs(time).fromNow();
};
