import { useState } from "react";
import { Title } from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconHome,
  IconAppWindow,
} from "@tabler/icons-react";
import classes from "./navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const nav = [
  {
    header: "General",
    links: [
      { link: "/home", label: "Home", icon: IconHome },
      { link: "", label: "Settings", icon: IconSettings },
    ],
  },

  {
    header: "Repos",
    links: [{ link: "/repo/capi", label: "CAPI", icon: IconAppWindow }],
  },
];

export function NavbarSegmented() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentActiveLabel = nav.reduce((activeLabel, { links }) => {
    if (activeLabel) return activeLabel;

    const activeLink = links.find(({ link }) => location.pathname === link);

    return activeLink ? activeLink.label : activeLabel;
  }, "");

  const [active, setActive] = useState(currentActiveLabel || "Home");

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

                if (item.link) {
                  setActive(item.label);
                  navigate(item.link);
                }
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
