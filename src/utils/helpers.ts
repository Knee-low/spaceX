export const getStatusText = (
  status: boolean | null
): { tagStatus: string; tagColor: "success" | "primary" | "error" } => {
  if (status) return { tagStatus: "success", tagColor: "success" };
  if (status === null) return { tagStatus: "upcoming", tagColor: "primary" };
  return { tagStatus: "failed", tagColor: "error" };
};
