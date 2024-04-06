import React from "react";
import { Title } from "@mantine/core";
import { IconHome, IconAppWindow } from "@tabler/icons-react";
import classes from "./navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, RepoData } from "../../App";
import axios from "axios";
import { LIST_REPOS } from "../../constants/endpoints";

const nav = [
  {
    header: "General",
    links: [{ link: "/home", label: "Home", icon: IconHome }],
  },

  {
    header: "Repos",
    links: [],
  },
];

export function NavbarSegmented() {
  const [active, setActive] = React.useState("Home");
  const { setRepos } = React.useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + LIST_REPOS)
      .then((response) => {
        const data = response.data.data as RepoData[];

        setRepos(data);

        let repoNavs = nav.find(({ header }) => header === "Repos");

        if (repoNavs) {
          repoNavs.links = data.map((repo) => ({
            link: `/repo/${repo.id}`,
            label: repo.name,
            icon: IconAppWindow,
          }));
        }

        const currentActiveLabel = nav.reduce((activeLabel, { links }) => {
          if (activeLabel) return activeLabel;

          const activeLink = links.find(
            ({ link }) => location.pathname === link
          );

          return activeLink ? activeLink.label : activeLabel;
        }, "");

        setActive(currentActiveLabel);
      });
  }, []);

  const xnav = nav.map(({ header, links }) => {
    return (
      <div key={header} style={{ marginTop: "20px" }}>
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
    </nav>
  );
}
