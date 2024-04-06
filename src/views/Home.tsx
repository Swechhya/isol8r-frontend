import { Box, Button, Group, Title } from "@mantine/core";
import { TableSort } from "../components/table/Table";
import { useDisclosure } from "@mantine/hooks";
import LaunchModal from "../components/LaunchModal/LaunchModal";
import React from "react";
import axios from "axios";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  React.useEffect(() => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/gh/setup", {
        clientID: "Iv1.3484a5cbceec7189",
        clientSecret: "12d77149d9c0c525894462db85891771a4eb71b9",
        installID: "49284279",
        privateKey: `-----BEGIN RSA PRIVATE KEY----- MIIEogIBAAKCAQEAoMMBu924C/MtujoSsFOrauGD92aW0yPTKQ6PmYsvq2vyjVCz X2X7PH50qcukuhp3ouQ1NfiEWxIyYTNvGpKhzBLgrHqDvBv9GzHzHyUsujtEn7Oi e9hY0ZFvQyC8s9P8nJK71QXa/UpVUejIW0jxFoggxVy6dofGWM4IwertXkuABDto bI6VXIb1HoeAqhaKYfLFvXt5b+czof7EvaUJP06SRxYm4JJL8s/gfN/6Ued2vVH9 WUSzLYKeChOx8XDE/3RMsAV8DKFIvh+fLFSmAl9KoAcO3w8ccAGo0wUHCthtHpLb 8HPPL75EYmQzWMv48/KAu4hiSaKaEMTxqmDLtQIDAQABAoIBAGVItyzvkeclfOfZ crDY5iTelFAouFmqNn2liN+KC6yKxDQ4ZepyzAje+w2HGe+OgVWFRekM/AaMvmTz DMrHG10Bf7/rKFg5oguiOrSirT1f3epoOLSiJ8NRR7IZTApYQs06vVCG8eOnE34Z lTG+EPbLKSpvM6M+A78rf+T86DQBibHiTIVPvtp+TbP/JjK9dgrSCCmflnPfPs9e MZnuPoJHadwC8owkp26OHxSHc9WUiziDSCQPvIENS6qthaLeEunA4t62EUlh9CaV qH1LpjS9bPHO/AZunlmiKvA1N0DwtkqNCjXzcw/vYPMy27g0B1N0VZwjlqt9LmuN mwb5tTkCgYEAzGBiPyYtMuFawfu/5rp3UzQW0phZ4YvX8kmRxWhqIp1gqtAMUcTL /Dtvip68beQieSmFklF8qso1plZIB8x0jc/sSI5wBVIIcaObUHu38RhzqdgVq1P4 Trm0+Uc/+n9WuJzWFpVCO0xqSVRr3SLuamJNn0yKtSuW8/EQmP6HicsCgYEAyV5b sc1qcrlKO0fmefHIGzC8THPiwvWxxEY0LJSCPGaYZ5YbqQtP8VTo7+j8UyV2UcFK lcPkQHsltFUwF1AAwV+YZ7sz7LTyghwnooI1yfqmgwm2po6bUYxiTtXVpMesEY/K dLZWI6iWB8+JaYXvN7JxxfCKKhEDkIsKIGu8UH8CgYBi/+VXdaS7WtJd2RcSKw0W LstHZClVyinm4aBNIdEXx2hGFdWB3nR5UEktusrH6JSSYHylbfeXu6/VTUJDFNT4 xNlOJEE7MouIkJnxmJx3m0Kb6WJFxb0oVWjGv67MJtbZQo+qDM8ybkemEdDWI8+d lNTI74jZTa4nqIRDuDfrlQKBgGUN9mRHWwlR1V/kmFRQMwT6MzUG3yDJ3jlKpfpN WQJo1kj9usndxHOvEer7+EzduwASSZTZJt35LxXNvoGkg4yHpdtAxjEfKaiD6pwS Tl4bbJ7MLB5v6KBHHDrF8x5rmf2CNK7XpmjkvM4Up7gOH9vKsHAOY7fyq+BI9n8I sguPAoGAOKsVAAVslYcdpP8kT/0uUHfupPo84SDZyfL3Mrb9hZxQ40FMoyfoPhTj ryJyPjAowhztv+ilEtME6I1GMqHESu4E3GzvX8w1Q+bgpkdTRLsmRqDhcTLj5pKq 6+3rjAp+j4125Ej40VB5mxR07ool9a1QvZQQik6PUwMTsHm3JmQ= -----END RSA PRIVATE KEY-----`,
        appID: "870502",
      })
      .then((response) => {
        console.log({ response });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Box>
      <Group align="center" justify="space-between" mb={32}>
        <Title order={1}>Environments 🚀</Title>
        <Button size="md" radius="xl" color="teal" onClick={open}>
          Deploy New Environment
        </Button>
      </Group>

      <TableSort />

      <LaunchModal opened={opened} close={close} />
    </Box>
  );
}
