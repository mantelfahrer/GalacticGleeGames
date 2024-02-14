import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const ScrollToTop = (props: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
