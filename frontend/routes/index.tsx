import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BreweryList from "../islands/BreweryList.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export interface Brewery {
  name?: string;
  brewery_type?: string;
  website_url?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  street?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
}

export const handler: Handlers<Brewery | null> = {
  async GET(_, ctx) {
    const resp = await fetch(
      `https://api.openbrewerydb.org/breweries?by_city=new_orleans

      `,
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const brewery: Brewery = await resp.json();
    return ctx.render(brewery);
  },
};

export default function Home(breweryList: PageProps) {
  return (
    <>
      <Head>
        <title>RSM Brewery List Code Challenge</title>
        <link rel="stylesheet" href={asset("style.css")} />
      </Head>
      <Header active="" />
      <BreweryList {...breweryList} />
      <Footer children />
    </>
  );
}
