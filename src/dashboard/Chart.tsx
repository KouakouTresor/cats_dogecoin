import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import Title from "../components/Title";
import { getCripto } from "../service/cryptoServices";
import { useQuery } from "@tanstack/react-query";

export default function Chart() {
  const theme = useTheme();

  function createData(
    time: string,
    changePercent24Hr?: number
  ): { time: string; changePercent24Hr: number | null } {
    return { time, changePercent24Hr: changePercent24Hr ?? null };
  }

  const { data: cryptos } = useQuery({
    queryKey: ["cryptos"],
    queryFn: getCripto,
  });

  const data = cryptos.map((crypto: any) =>
    createData(crypto.name, parseFloat(crypto.changePercent24Hr))
  );

  return (
    <React.Fragment>
      <Title>Dogecoin</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: "Change Percentage (%)",
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "changePercent24Hr",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
