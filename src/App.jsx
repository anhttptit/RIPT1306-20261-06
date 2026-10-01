import { useState } from "react";
import { glasses } from "./data/glasses";
import Model from "./components/Model";
import GlassesList from "./components/GlassesList";

const money = (n) => n.toLocaleString("vi-VN") + " đ";

export default function App() {
  const [glassId, setGlassId] = useState(null);
  const glass = glasses.find((g) => g.id === glassId);

  return (
    <main className="page">
      <section className="stage">
        <Model glass={glass} />
        {glass ? (
          <div className="info">
            <h2>{glass.name}</h2>
            <p className="price">{money(glass.price)}</p>
            <p className="muted">{glass.desc}</p>
          </div>
        ) : (
          <div className="info">
            <p className="muted">Chọn một mẫu kính bên phải để thử.</p>
          </div>
        )}
      </section>

      <section>
        <h1>Phòng thử kính</h1>
        <GlassesList glasses={glasses} selectedId={glassId} onSelect={setGlassId} />
        <button className="remove" onClick={() => setGlassId(null)} disabled={!glass}>
          Bỏ kính
        </button>
      </section>
    </main>
  );
}
