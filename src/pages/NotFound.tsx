
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-white h-[100dvh] p-4 flex flex-col items-center justify-center">
          <div
            className="h-[400px] mt-lg-[-200px] aspect-[1/1] bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage:
                "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
            }}
          >
          </div>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl font-bold text-black text-center">404</h1>
          <h2 className="text-2xl mb-2 text-center">Looks like you're lost</h2>
          <p className="mb-6 text-gray-600 text-center">The page you are looking for is not available!</p>
          <Button asChild>
            <Link to={"/"}>Go to Home</Link>
          </Button>
        </div>
    </section>
  );
}
