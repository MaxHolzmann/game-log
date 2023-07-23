import "../app/globals.css";
import { SessionProvider } from "next-auth/react";
import { DragDropContextProvider } from "react-beautiful-dnd";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
