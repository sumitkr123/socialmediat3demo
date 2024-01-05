import { type NextPage } from "next";
import Link from "next/link";

type NotFoundProps = {};

const NotFound: NextPage<NotFoundProps> = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 overflow-y-auto bg-white">
      <div className="col-sm-10 text-center">
        <div className="four_zero_four_bg">
          <h1 className="text-heading2-bold text-center text-green-700">404</h1>
        </div>

        <div className="showImage"></div>

        <div className="contant_box_404">
          <h3 className="h2 text-heading2-bold text-green-700">{`Looks like you're lost`}</h3>
          <br></br>

          <p className="text-[20px] text-slate-900">
            {"Page you are looking for is not avaible!"}
          </p>

          <Link
            href={"/"}
            className="link_404 text-body-semibold rounded-xl p-3 text-[18px] text-white hover:scale-110 hover:underline"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
