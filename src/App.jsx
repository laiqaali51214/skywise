import { useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import Footer from "./components/Footer";

export default function App() {
  const [data, setData] = useState(null);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />

      {/* Fixed header */}
      <div className="top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-24">
        <CardContainer data={data} setData={setData} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
