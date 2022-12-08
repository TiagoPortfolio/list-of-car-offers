import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilters } from "./Filters/slice";
import styled from "styled-components";
import useOffersListQuery from "./api/useOffersList";

function OffersList() {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const offersListQuery = useOffersListQuery();

  if (offersListQuery.data) {
    return (
      <Grid>
        {offersListQuery.data.map((offer) => (
          <Offer key={offer.id}>
            <span>{offer.carGroupInfo.modelExample.name}</span>
            <img src={offer.carGroupInfo.modelExample.imageUrl} />
            <span>{offer.prices.totalPrice.amount.display}</span>
          </Offer>
        ))}
      </Grid>
    );
  }

  if (offersListQuery.status === "error") {
    return <div>Error: {JSON.stringify(offersListQuery.error)}</div>;
  }

  return <div>Loading...</div>;
}

const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
`;

const Offer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default OffersList;
