import * as React from "react";

export function useRefreshByUser(refetch: () => Promise<unknown>) {
  const [isRefetchingByUser, setIsRefetchingByUser] = React.useState(false);

  async function refetchByUser() {
    setIsRefetchingByUser(true);
    // console.log("Hey user makes refresh.");

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
}
