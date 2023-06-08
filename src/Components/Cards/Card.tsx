import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  postKey?: string;
  user?: User | null;
}
export default function CardComponent({
  title,
  description,
  imageUrl,
  postKey,
  user,
}: CardProps) {
  const navigate = useNavigate();

  function redirectPage() {
    navigate(`/cardScreen/${postKey}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }} key={imageUrl} onClick={redirectPage}>
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
