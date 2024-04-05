import { useState } from "react";
import { Title } from "@mantine/core";
import {
  IconShoppingCart,
  IconMessage2,
  IconMessages,
  IconSettings,
  IconFileAnalytics,
  IconDatabaseImport,
  IconLogout,
  IconSwitchHorizontal,
  IconHome,
} from "@tabler/icons-react";
import classes from "./navbar.module.css";

const nav = [
  {
    header: "General",
    links: [
      { link: "", label: "Home", icon: IconHome },
      { link: "", label: "Settings", icon: IconSettings },
    ],
  },
  {
    header: "Docs",
    links: [
      { link: "", label: "Getting Started", icon: IconFileAnalytics },
      { link: "", label: "API Reference", icon: IconDatabaseImport },
      { link: "", label: "FAQ", icon: IconMessage2 },
      { link: "", label: "Contact Support", icon: IconMessages },
    ],
  },
  {
    header: "Repos",
    links: [{ link: "", label: "Applications", icon: IconShoppingCart }],
  },
];

export function NavbarSegmented() {
  const [active, setActive] = useState("Home");

  const xnav = nav.map(({ header, links }) => {
    return (
      <div key={header}>
        <Title order={3} className={classes.navTitle} mb={8}>
          {header}
        </Title>
        {links.map((item) => {
          return (
            <a
              className={classes.link}
              data-active={item.label === active || undefined}
              href={item.link}
              key={item.label}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{xnav}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
