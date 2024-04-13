import React, { useState } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container,
} from "@mui/material";


type Ticket = {
  count: number;
  price: number;
  total: number;
};

const TicketSelection = () => {

  const baseEuro = 4;
  const dogecoinAmount = baseEuro * 6.16;
  const [ticket, setTicket] = useState<Ticket>({
    count: 0,
    price: dogecoinAmount,
    total: 0,
  });

  const handleAddTicket = () => {
    const newCount = ticket.count + 1;
    const newTotal = newCount * dogecoinAmount;
    const discount = newCount >= 2 ? newTotal * 0.05 : 0;

    setTicket({
      count: newCount,
      price: dogecoinAmount,
      total: newTotal - discount,
    });
  };

  const handleRemoveTicket = () => {
    const newCount = Math.max(0, ticket.count - 1);
    const newTotal = newCount * dogecoinAmount;

    //Apply the discount if there are at least two tickets
    const discount = newCount >= 2 ? newTotal * 0.05 : 0;
    setTicket({
      count: newCount,
      price: dogecoinAmount,
      total: newTotal - discount,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        height: 340,
      }}
    >
      <h3  >
        Acheter billiet JO '24
      </h3>
      <List>
        <ListItem>
          <ListItemText
            primary="Nombre de billiets"
            secondary={ticket.count}
          />
         
          <Button
            variant="outlined"
            onClick={handleRemoveTicket}
            disabled={ticket.count <= 0}
          >
            -
          </Button>
          <Button variant="outlined" onClick={handleAddTicket}>
            +
          </Button>
        </ListItem>
        
        <ListItem>
          <ListItemText
            primary="Price: dogecoin "
            secondary={`dogecoin ${ticket.total.toFixed(2)}`}
          />
          {ticket.count >= 2 && (
            <Typography color="success" sx={{ color: "green" }}>
      
              5 % Réduction appliquée!
            </Typography>
          )}
        </ListItem>
      </List>
     
     
    </Paper>
    </Container>
  );
};

export default TicketSelection;
