import { useState } from "react";

export const useLoadingOnClick = () => {
  const [isLoading, setIsLoading] = useState(false);

  const enableLoading = (e) => {
    if (isLoading) return;
    setIsLoading(true);
  };

  const disableLoading = (e) => {
    if (!isLoading) return;
    setIsLoading(false);
  };

  return { isLoading, enableLoading, disableLoading };
};

export default useLoadingOnClick;
