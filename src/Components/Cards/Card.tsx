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
}
export default function CardComponent({
  title,
  description,
  imageUrl,
}: CardProps) {
  return (
    <Card sx={{ maxWidth: 345 }} key={imageUrl}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={imageUrl}
          alt={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
