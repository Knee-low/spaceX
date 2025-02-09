import { LinkType } from "@/components/playground/hooks";
import { LINKS } from "@/utils/constants";
import { useState } from "react";

export const useHooks = ({ links }: { links: LinkType }) => {
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false);
  const onClickView = () => {
    setIsShowDetails(!isShowDetails);
  };

  const linksArray = Object.entries(links)
    .filter(([link, value]) => LINKS.includes(link) && !!value)
    .map(([key, value]) => {
      return {
        type: key === "webcast" ? "video" : key,
        data: value,
      };
    });

  const [detailsArray] = Object.entries(links)
    .filter(([link, value]) => link === "patch" && !!value)
    .map(([, value]) => {
      const { small, large } = value;
      return {
        small,
        large,
      };
    });

  return {
    linksArray,
    detailsArray,
    isShowDetails,
    onClickView,
  };
};
