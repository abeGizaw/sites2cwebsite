import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}
export default function CardComponent({
  title,
  description,
  imageUrl,
  index,
}: CardProps) {
  return (
    <Card sx={{ maxWidth: 345 }} key={index}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={`https://picsum.photos/id/${index}/300`}
          alt="https://picsum.photos"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
