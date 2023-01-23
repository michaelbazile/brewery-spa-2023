import { ComponentChildren } from "preact";
import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
import BeerIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/beer.tsx";

type Props = {
  children: ComponentChildren;
};

export default function Footer({ children }: Props) {
  const menus = [
    {
      title: "Documentation",
      children: [
        {
          name: "Getting Started",
          href: "https://github.com/michaelbazile/brewery-spa-2023#readme",
        },
      ],
    },
    {
      title: "Community",
      children: [
        { name: "Blogs", href: "https://dev.to/michael_bazile" },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/michael-bazile/",
        },
      ],
    },
  ];

  return (
    <div class="bg-white flex flex-col md:flex-row w-full gap-8 md:gap-16 px-8 py-8 text-sm">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <BeerIcon class="inline-block" />
          <div class="font-bold text-2xl">
            New Orleans Finest
          </div>
        </div>
      </div>

      {menus.map((item) => (
        <div class="mb-4" key={item.title}>
          <div class="font-bold">{item.title}</div>
          <ul class="mt-2">
            {item.children.map((child) => (
              <li class="mt-2" key={child.name}>
                <a
                  class="text-gray-500 hover:text-gray-700"
                  href={child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div class="text-gray-500 space-y-2">
        <div class="text-xs">
          RSM Code Challenge 2023<br />
          All right reserved.
        </div>

        <a
          href="https://github.com/michaelbazile/brewery-spa-2023"
          class="inline-block hover:text-black"
        >
          <BrandGithub />
        </a>
      </div>
    </div>
  );
}
