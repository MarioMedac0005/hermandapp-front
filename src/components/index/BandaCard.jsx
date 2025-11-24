import { Link } from "react-router-dom";

export default function BandaCard({ href }) {
  return (
    <Link to={href}>
      <div className="card card-sm max-w-50">
        <figure className="hover-gallery h-52 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="src/assets/img/CardExample1.png"
          />
          <img
            className="w-full h-full object-cover"
            src="src/assets/img/CardExample2.jpg"
          />
          <img
            className="w-full h-full object-cover"
            src="src/assets/img/CardExample3.png"
          />
          <img
            className="w-full h-full object-cover"
            src="src/assets/img/CardExample4.webp"
          />
        </figure>
        <div className="card text-sm text-left mt-3.5">
          <h2 className="card-title flex justify-between">La Macarena</h2>
          <p className="text-gray-600">Córdoba</p>
        </div>
      </div>
    </Link>
  );
}
