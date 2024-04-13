import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { getRankings } from "../service/sitesService";
import {  Box, Container, Grid, Typography } from "@mui/material";

type Column = {
  id: "name" | "trade_volume_24h_btc" | "logo" | "trust_score_rank" | "url";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: any) => JSX.Element;
};

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "trade_volume_24h_btc", label: "trade volume 24h btc", minWidth: 100 },
  {
    id: "trust_score_rank",
    label: "Trust Score Rank",
    minWidth: 100,
    align: "right",
  },
  {
    id: "url",
    label: "URL",
    minWidth: 170,
    format: (value: string) => (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    ),
  },
];

interface RankingData {
  name: string;
  trade_volume_24h_btc: string;
  logo: string;
  trust_score_rank: number;
  url: string;
}

export default function TableItem() {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: rankings } = useQuery({
    queryKey: ["rankings"],
    queryFn: getRankings,
  });

  const firstRaking = rankings?.[0];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Typography>{firstRaking?.name}</Typography>
      
          <Box>
            <img
              src={firstRaking?.image}
              alt="site logo"
              width={200}
              height={200}
            />
          </Box>
          <a href={firstRaking?.url}>{firstRaking?.url}</a>
        </Paper>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 600,
            }}
          >
            <TableContainer sx={{ maxHeight: "80%" }}>
              <Table stickyHeader>
                <TableHead aria-label="sticky table">
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rankings?.map((ranking: RankingData) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={ranking.name}
                    >
                      {columns.map((column) => {
                        const value = ranking[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rankings?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
