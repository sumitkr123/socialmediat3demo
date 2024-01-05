"use client";

import { type NextPage } from "next";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage: NextPage<ErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
