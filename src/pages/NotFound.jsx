import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Page not found
        </h1>
        <Link to="/" className="mt-6 inline-block text-cyan-300 underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
