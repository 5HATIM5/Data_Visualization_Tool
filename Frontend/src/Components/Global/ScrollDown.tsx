import { ArrowDownIcon } from "@heroicons/react/24/outline";

const ScrollDown = () => {
  return (
    <div className="relative cursor-pointer">
      <div className="fixed right-4 md:right-2 bottom-10 flex flex-col items-center justify-center">
        <span className="uppercase text-[0.64rem] font-extrabold mr-1 rotate-90 text-[#1C1B20]">
          Scroll
        </span>
        <ArrowDownIcon className="w-5 h-5 text-[#1C1B20] animate-bounce mt-7 mr-1" />
      </div>
    </div>
  );
};

export default ScrollDown;
