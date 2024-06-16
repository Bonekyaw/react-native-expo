import * as React from "react";
import { useFocusEffect } from 'expo-router';

export function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch])
  );
}
