import { useEffect, useRef, useState } from "react";

type Props = {
    text: string;
    searchTerm: string;
    // activeIndex: number;
    // onMatchCountChange: (count: number) => void;
};

const TextDisplay = ({ text, searchTerm }: Props) => {

    const [activeMatchIndex, setActiveMatchIndex] = useState(0);
    const [matchCount, setMatchCount] = useState(0);
    let matchIndex = 0;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    const matchCountLengh = parts.filter((part) => part.toLowerCase() === searchTerm.toLowerCase()).length;

    const matchRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const nextWord = () => setActiveMatchIndex((prev) => prev + 1 < matchCount ? prev + 1 : 0);
    const prevWord = () => setActiveMatchIndex((prev) => prev - 1 >= 0 ? prev - 1 : matchCount - 1);

    // آپدیت تعداد نتایج
    useEffect(() => {
        setMatchCount(matchCountLengh);
    }, [searchTerm, text]);

    useEffect(() => {
        const el = matchRefs.current[activeMatchIndex];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeMatchIndex]);

    return (
        <div className="flex flex-col gap-3">
            {searchTerm.trim() &&
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 select-none">
                        <h5 className="font-bold text-xl">how many times it found:</h5>
                        <span className="text-amber-300 font-bold text-lg">{matchCountLengh}</span>
                    </div>
                    <div className=" border border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24" onClick={() => prevWord()} className="border-b">
                            <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24" onClick={() => nextWord()}>
                                <path d="M7 10l5 5 5-5H7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            }

            <p className="font-semibold text-justify select-none">
                {parts.map((part, i) => {
                    const isMatch = part.toLowerCase() === searchTerm.toLowerCase();

                    if (isMatch && searchTerm.trim()) {
                        const currentIndex = matchIndex;
                        matchIndex++;

                        return (
                            <span
                                key={i}
                                ref={(el) => { matchRefs.current[currentIndex] = el }}
                                className={`highlight ${currentIndex === activeMatchIndex && "active"}`}
                            >
                                {part}
                            </span>
                        );
                    } else {
                        return <span key={i}>{part}</span>;
                    }
                })}
            </p>
        </div>
    );

}

export default TextDisplay
