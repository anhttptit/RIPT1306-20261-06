import { useState } from "react";
import { colors } from "./data/colors";
import CarPreview from "./components/CarPreview";
import ColorPicker from "./components/ColorPicker";

export default function App() {
  const [colorId, setColorId] = useState("red");
  const color = colors.find((c) => c.id === colorId);

  return (
    <main className="page">
      <section className="stage">
        <CarPreview color={color} />
      </section>

      <section className="info">
        <h1>RIPT Sedan</h1>
        <p className="muted">
          Màu đang chọn: <b>{color.name}</b>
        </p>
        <ColorPicker colors={colors} selectedId={colorId} onSelect={setColorId} />
      </section>
    </main>
  );
}
