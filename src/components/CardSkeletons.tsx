import _ from "lodash";

import CardSkeleton from "./products/CardSkeleton";
import Grid from "./Grid";

interface Props {
  isLoading: boolean;
  pageSize: number;
}

const CardSkeletons = ({ isLoading, pageSize }: Props) => (
  <Grid>
    {isLoading &&
      _.range(0, pageSize).map((skeleton) => <CardSkeleton key={skeleton} />)}
  </Grid>
);

export default CardSkeletons;
