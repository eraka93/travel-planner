import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"

import Home from "./pages/Home"
import Countries from "./pages/Countries"
import Country from "./pages/Country"
import ErrorPage from "./pages/ErrorPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} errorElement={<ErrorPage />} />
      <Route path="/all" element={<Countries />} errorElement={<ErrorPage />} />
      <Route
        path="/country/:name"
        element={<Country />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Route>,
  ),
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
