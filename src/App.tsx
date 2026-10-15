import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import AlbumDetail from "./pages/AlbumDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="gioi-thieu" element={<About />} />
        <Route path="album/:albumId" element={<AlbumDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
