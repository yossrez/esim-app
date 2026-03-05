import Link from "next/link";

interface ErrStateProps {
  code: number;
  description: string;
}

export default function ErrState({ code, description }: ErrStateProps) {
  return (
    <main>
      <div className="flex flex-col items-center pt-32">
        <h1 className="lg:text-4xl sm:text-3xl text-2xl text-center leading-16 font-semibold">
          <span className="sm:text-6xl text-4xl">{code}</span>
          <br />
          {description}
        </h1>
        <Link
          href="/"
          className="bg-primary text-white w-full max-w-90 text-center rounded-md py-2.5 mt-10"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
