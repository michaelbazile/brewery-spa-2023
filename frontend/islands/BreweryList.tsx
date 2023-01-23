import { PageProps } from "$fresh/server.ts";
import BreweryListCard from "./BreweryListCard.tsx";
import { Brewery } from "../routes/index.tsx";

export default function BreweryList({ data: breweryList }: PageProps) {
  return (
    <div class="card-container">
      {
        <div>
          {breweryList.map((b: Brewery) => {
            return <BreweryListCard {...b} />;
          })}
        </div>
      }
    </div>
  );
}
