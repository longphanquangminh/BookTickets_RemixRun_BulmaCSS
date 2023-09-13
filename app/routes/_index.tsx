import type { V2_MetaFunction } from "@remix-run/node";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import BookingPage from "~/pages/BookingPage";
import { rootReducer } from "~/reducer/rootReducer";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  let store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <div className='m-0 p-0'>
        <BookingPage />
      </div>
    </Provider>
  );
}
