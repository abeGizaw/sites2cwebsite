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
  authorUID?: string;
}
export default function CardComponent({
  title,
  description,
  imageUrl,
  postKey,
}: CardProps) {
  const navigate = useNavigate();

  /**
   * When Card gets clicked on, navigate to the card's unqiue screen
   * @date 6/8/2023 - 10:13:22 PM
   */
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
