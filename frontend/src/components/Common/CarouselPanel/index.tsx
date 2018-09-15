import * as React from "react";
import { Image, ScrollView } from "react-native";
import { UserPhoto } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  photos: UserPhoto[];
};
const tempImageUrl =
  "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1LjkxNiAyNS45MTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1LjkxNiAyNS45MTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik03LjkzOCw4LjEzYzAuMDksMC40MTQsMC4yMjgsMC42ODIsMC4zODksMC44NDljMC4zODMsMi42NjYsMi43NzYsNC45MzgsNC42OTgsNC44NDMgICAgYzIuNDQ1LTAuMTIsNC4xNzgtMi43NTUsNC41NjctNC44NDNjMC4xNjEtMC4xNjYsMC4zMTYtMC41MjEsMC40MDktMC45MzhjMC4xMDQtMC40NzksMC4yMTYtMS4yMDEtMC4wNzItMS41ODMgICAgYy0wLjAxNy0wLjAyLTAuMTI3LTAuMTIxLTAuMTQ2LTAuMTM4YzAuMjc1LTAuOTkyLDAuODc5LTIuNzYyLTAuNjI1LTQuMzUzYy0wLjgxNS0wLjg2Mi0xLjk0Ny0xLjI5NS0yLjk3LTEuNjM3ICAgIGMtMy4wMi0xLjAwOS01LjE1MiwwLjQwNi02LjEzNiwyLjc1OUM3Ljk4MSwzLjI1Niw3LjUyMiw0LjMxMyw4LjA3OCw2LjMyQzguMDI0LDYuMzU2LDcuOTc1LDYuNDAyLDcuOTM0LDYuNDU4ICAgIEM3LjY0NSw2LjgzOSw3LjgzMyw3LjY1MSw3LjkzOCw4LjEzeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMy41NTcsMjIuNzkyYy0wLjA4NC0xLjgzNS0wLjE4OC00Ljc0My0xLjc5MS03LjEyMmMwLDAtMC40NTctMC42MjMtMS41NDEtMS4wMzcgICAgYzAsMC0yLjM1NC0wLjcxNy0zLjQzOC0xLjQ5MmwtMC40OTUsMC4zMzlsMC4wNTUsMy4yMThsLTIuOTcyLDcuOTM0Yy0wLjA2NSwwLjE3NC0wLjIzMSwwLjI4OS0wLjQxNiwwLjI4OSAgICBzLTAuMzUxLTAuMTE1LTAuNDE2LTAuMjg5bC0yLjk3MS03LjkzNGMwLDAsMC4wNTUtMy4yMDgsMC4wNTQtMy4yMThjMC4wMDcsMC4wMjctMC40OTYtMC4zMzktMC40OTYtMC4zMzkgICAgYy0xLjA4MiwwLjc3NS0zLjQzNywxLjQ5Mi0zLjQzNywxLjQ5MmMtMS4wODQsMC40MTQtMS41NDEsMS4wMzctMS41NDEsMS4wMzdjLTEuNjAyLDIuMzc5LTEuNzA4LDUuMjg3LTEuNzkyLDcuMTIyICAgIGMtMC4wNTgsMS4yNjgsMC4yMDgsMS43NDEsMC41NDIsMS44NzZjNC4xNDYsMS42NjQsMTUuOTY1LDEuNjY0LDIwLjExMiwwQzIzLjM1LDI0LjUzNCwyMy42MTQsMjQuMDYsMjMuNTU3LDIyLjc5MnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMTMuMDY1LDE0Ljg0N2wtMC4xMzQsMC4wMDNjLTAuNDMyLDAtMC44NjgtMC4wODQtMS4yOTYtMC4yMzJsMS4xNzgsMS44MDNsLTEuMDU3LDEuMDIgICAgbDEuMDg4LDYuNjA3YzAuMDA5LDAuMDU3LDAuMDU4LDAuMDk4LDAuMTE2LDAuMDk4YzAuMDU3LDAsMC4xMDYtMC4wNDEsMC4xMTYtMC4wOThsMS4wODgtNi42MDdsLTEuMDU4LTEuMDJsMS4xNjEtMS43NzYgICAgQzEzLjg4OCwxNC43NTYsMTMuNDg3LDE0LjgzLDEzLjA2NSwxNC44NDd6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+C";
const renderImage = (photo: any) => {
  const { imageUrl, id } = photo;
  console.log(imageUrl);
  return (
    <Image
      key={id}
      resizeMode="cover"
      source={{ uri: imageUrl }}
      style={styles.image}
    />
  );
};
const CarouselPanel: React.SFC<Props> = (props) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {// props.photos.map((photo) => renderImage(photo))
      [
        {
          id: 1,
          imageUrl: "https://uploads.themler.io/store/sample1-people.png"
        },
        {
          id: 2,
          imageUrl: "https://uploads.themler.io/store/sample1-people.png"
        }
      ].map((photo) => renderImage(photo))}
    </ScrollView>
  );
};

export default CarouselPanel;
