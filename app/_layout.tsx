import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

import { SessionProvider } from "@/providers/ctx";
import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";

export default function Root() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </RootSiblingParent>
    </Provider>
  );
}
