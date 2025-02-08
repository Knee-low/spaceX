import { getStatusText } from "@/utils/helpers";

export const useHooks = ({ status }: { status: boolean }) => {
  const { tagStatus, tagColor } = getStatusText(status);
  return {
    tagStatus,
    tagColor,
  };
};
