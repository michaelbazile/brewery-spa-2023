import BeerIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/beer.tsx";
type Props = {
  active: string;
};

export default function Header({ active }: Props) {
  const menus = [
    {
      name: "GitHub",
      href: "https://github.com/michaelbazile/brewery-spa-2023",
    },
    {
      name: "README",
      href: "https://github.com/michaelbazile/brewery-spa-2023#readme",
    },
  ];

  return (
    <div class="header bg-white w-full  py-6 px-8 flex flex-col md:flex-row gap-4">
      <div class="flex items-center flex-1">
        <BeerIcon size={40} olor="#f28e1c" />
        <div class="text-2xl  ml-1 font-bold">
          Beer Cheers New Orleans
        </div>
      </div>
      <ul class="flex items-center gap-6">
        {menus.map((menu) => (
          <li>
            <a
              href={menu.href}
              target="_blank"
              rel="noreferrer noopener"
              class={"text-gray-500 hover:text-gray-700 py-1 border-gray-500" +
                (menu.href === active ? " font-bold border-b-2" : "")}
            >
              {menu.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
