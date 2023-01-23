import { Brewery } from "../routes/index.tsx";
import MapContainer from "./MapContainer.tsx";
import WorldIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/world-www.tsx";
import Phone from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/phone.tsx";

export default function BreweryListCard(
  {
    name,
    brewery_type,
    city,
    state,
    postal_code,
    latitude,
    longitude,
    street,
    website_url,
    phone,
  }: Brewery,
) {
  const breweryInfo = {
    coordinates: { latitude, longitude },
    breweryName: name,
  };
  return (
    <div class="card">
      <div class="skeleton">
        <MapContainer {...breweryInfo} />
      </div>
      <div class="content">
        <h3>{name}</h3>
        <div style={{ margin: "5px" }}>
          <h1>
            A {brewery_type} type of brewery located at {street}, {city},{" "}
            {state}, {postal_code}
          </h1>
        </div>
        <div class="card__info">
          {!website_url
            ? "No website available for this brewery."
            : (
              <div class="card_link">
                <WorldIcon class="inline-block" />
                <a
                  style={{ color: "blue" }}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={website_url}
                >
                  Visit Site
                </a>
              </div>
            )}
          {!phone ? "No number avaiable" : (
            <div class="card__link">
              Give them a ring
              <a style={{ color: "black" }} href={`tel:${phone}`}>
                <Phone class="" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
