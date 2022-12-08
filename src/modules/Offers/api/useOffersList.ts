import { useQuery } from "@tanstack/react-query";
import offersJson from "./offers.json";

const offersListQuery = () => ({
  queryKey: ["offers"] as const,
  queryFn: fetchOffersList,
});

const fetchOffersList = async () => {
  // Use local JSON file instead with a 1 second delay to simulate network latency
  return new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  }).then(() => {
    return offersJson.offers;
  });
};

export default function useOffersListQuery() {
  return useQuery(offersListQuery());
}
