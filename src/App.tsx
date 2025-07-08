import { useState } from "react";
import SearchInput from "./components/SearchInput";
import TextDisplay from "./components/TextDisplay";
import { sampleText } from "./static/sampletext";

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex justify-center items-center min-h-dvh w-full">
      <main className="flex justify-center items-start flex-col max-w-lg gap-5 p-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <TextDisplay
          text={sampleText}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}
