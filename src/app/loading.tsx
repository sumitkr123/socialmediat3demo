import { type NextPage } from "next";

type LoadingProps = {};

const Loading: NextPage<LoadingProps> = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-50">
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-light-1 h-11 w-11 animate-bounce rounded-full bg-red-500 text-center text-[30px]">
          L
        </p>
        <p className="text-light-1 animate-bounce-down h-11 w-11 rounded-full bg-yellow-500 text-center text-[30px]">
          O
        </p>
        <p className="text-light-1 h-11 w-11 animate-bounce rounded-full bg-cyan-500 text-center text-[30px]">
          A
        </p>
        <p className="text-light-1 h-11 w-11 animate-ping rounded-full bg-indigo-500 text-center text-[30px]">
          D
        </p>
        <p className="text-light-1 animate-bounce-down mx-2 h-11 w-11 rounded-full bg-yellow-500 text-center text-[30px]">
          I
        </p>
        <p className="text-light-1 h-11 w-11 animate-bounce rounded-full bg-amber-500 text-center text-[30px]">
          N
        </p>
        <p className="text-light-1 animate-bounce-down h-11 w-11 rounded-full bg-lime-500 text-center font-serif text-[30px]">
          G
        </p>
      </div>
    </div>
  );
};

export default Loading;
