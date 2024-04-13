import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { getCripto } from "../service/cryptoServices";
import Deposits from "./Deposits";


const defaultTheme = createTheme();

export default function Dashboard() {
  const { data: etherum } = useQuery({
    queryKey: ["etherum"],
    queryFn: () => getCripto("ethereum"),
    gcTime: 0,
  });

  const { data: bitcoin } = useQuery({
    queryKey: ["bitcoin"],
    queryFn: () => getCripto("bitcoin"),
    gcTime: 0
  });


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
        
          <Container maxWidth="lg" sx={{ mt:3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
              <Deposits  name={etherum?.name} priceUsd={etherum?.priceUsd} />  
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                   <Deposits  name={bitcoin?.name} priceUsd={bitcoin?.priceUsd} />  
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
