import React from "react";
import { Center, Container, Loader, Title } from "@mantine/core";
import { IconHome, IconAppWindow } from "@tabler/icons-react";
import classes from "./navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, RepoData } from "../../App";
import axios from "axios";
import { LIST_REPOS } from "../../constants/endpoints";
import { notifications } from "@mantine/notifications";

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
  const [isLoading, setIsLoading] = React.useState(true);

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
      })
      .catch((e) => {
        notifications.show({
          title: "Error",
          message: "Failed to fetch repos",
          color: "red",
        });
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const xnav = nav.map(({ header, links }, index) => {
    if (header === "Repos" && isLoading) {
      return (
        <Container>
          <Center mt={40}>
            <Loader />
          </Center>
        </Container>
      );
    }

    return (
      <div key={header}>
        <Title
          order={2}
          className={classes.navTitle}
          mb={8}
          mt={index !== 0 ? 20 : undefined}
        >
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
