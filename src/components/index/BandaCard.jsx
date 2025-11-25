import { Link } from "react-router-dom";
import CardExample1 from "@assets/img/CardExample1.png";
import CardExample2 from "@assets/img/CardExample2.jpg";
import CardExample3 from "@assets/img/CardExample3.png";
import CardExample3 from "@assets/img/CardExample3.webp";

export default function BandaCard({ href }) {
  return (
    <Link to={href}>
      <div className="card card-sm max-w-50">
        <figure className="hover-gallery h-52 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src= {CardExample1}
          />
          <img
            className="w-full h-full object-cover"
            src= {CardExample2}
          />
          <img
            className="w-full h-full object-cover"
            src= {CardExample3}
          />
          <img
            className="w-full h-full object-cover"
            src= {CardExample4}
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
