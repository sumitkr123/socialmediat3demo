export const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-50">
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="h-11 w-11 animate-bounce rounded-full bg-red-500 text-center text-[30px] text-light-1">
          L
        </p>
        <p className="animate-bounce-down h-11 w-11 rounded-full bg-yellow-500 text-center text-[30px] text-light-1">
          O
        </p>
        <p className="h-11 w-11 animate-bounce rounded-full bg-cyan-500 text-center text-[30px] text-light-1">
          A
        </p>
        <p className="h-11 w-11 animate-ping rounded-full bg-indigo-500 text-center text-[30px] text-light-1">
          D
        </p>
        <p className="animate-bounce-down mx-2 h-11 w-11 rounded-full bg-yellow-500 text-center text-[30px] text-light-1">
          I
        </p>
        <p className="h-11 w-11 animate-bounce rounded-full bg-amber-500 text-center text-[30px] text-light-1">
          N
        </p>
        <p className="animate-bounce-down h-11 w-11 rounded-full bg-lime-500 text-center font-serif text-[30px] text-light-1">
          G
        </p>
      </div>
    </div>
  );
};
