import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../components/Title";

export type ChartProps = {
  name: string | undefined;
  priceUsd: string | undefined;
};

export default function Currency({ name, priceUsd }: ChartProps) {

  const formatPrice = (price: string | undefined): string => {
    if (!price || isNaN(parseFloat(price))) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(price));
  };

  const dateOfToday = new Date().toLocaleString();
  const price = formatPrice(priceUsd);


  return (
    <React.Fragment>
      <Title>{name}</Title>
      <Typography component="p" variant="h4">
        {price}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {dateOfToday}
      </Typography>
    </React.Fragment>
  );
}
