import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Artwork = {
  artwork: {
    _score: number;
    medium_display: string;
    artist_display: string;
    date_display: string;
    id: number;
    image_id: string;
    title: string;
    place_of_origin: string;
    image_url: string;
  };
};

function ImgMediaCard({ artwork }: Artwork) {
  const {
    id,
    title,
    image_url,
    artist_display,
    date_display,
    medium_display,
    place_of_origin,
  } = artwork;

  const detailsArr = [
    id,
    place_of_origin,
    medium_display,
    artist_display,
    date_display,
  ];

  const renderDescription = () => {
    return detailsArr.map((detail, idx) => {
      return (
        <Typography
          key={`detail-${id}-${idx}`}
          component={"span"}
          variant={"body2"}
        >
          {detail}
          <br />
        </Typography>
      );
    });
  };
  return (
    <Card sx={{ maxWidth: 1000, marginTop: 6 }}>
      <CardMedia component="img" alt="searched artwork" image={image_url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {renderDescription()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard;
