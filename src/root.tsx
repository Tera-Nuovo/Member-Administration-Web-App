import { Show, Suspense, createEffect } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start";
import "./root.scss";
import Nav from "./components/Nav";
import { theme } from "./components/ThemeButton";
import { UserPermissionsProvider } from "./components/userPermissionsContext";
import { UserProvider } from "./components/userContext";



export default function Root() {

  return (
    <Html lang="en" data-theme={theme()}>
      <Head>
        <Title>Grobund WebApp</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <UserProvider>
        <UserPermissionsProvider>
          <Nav />
          <ErrorBoundary>
            <Suspense fallback={<div class="container">Loading...</div>}>
              <Routes>
                <FileRoutes />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </UserPermissionsProvider>
        </UserProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
