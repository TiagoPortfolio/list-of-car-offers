import { useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getFilters } from './Filters/slice'
import useOffersListQuery from './api/useOffersList'
import VehicleFallbackImage from '../../assets/vehicle_fallback_image.jpeg'
import OffersFilters from './Filters'

function OffersList() {
  const filters = useSelector(getFilters)

  const offersListQuery = useOffersListQuery()

  const filteredList = useMemo(() => {
    if (offersListQuery.status === 'success') {
      const getSortFunction = <
        D extends typeof offersListQuery.data[number],
      >() => {
        const nameSort = (a: D, b: D) =>
          a.carGroupInfo.modelExample.name.localeCompare(
            b.carGroupInfo.modelExample.name,
          )
        const priceSortAsc = (a: D, b: D) =>
          a.prices.totalPrice.amount.value - b.prices.totalPrice.amount.value
        const priceSortDesc = (a: D, b: D) =>
          b.prices.totalPrice.amount.value - a.prices.totalPrice.amount.value

        if (filters.orderBy === 'PRICE_ASC') {
          return priceSortAsc
        }

        if (filters.orderBy === 'PRICE_DESC') {
          return priceSortDesc
        }

        return nameSort
      }

      const sortedList = offersListQuery.data.sort(getSortFunction())

      if (filters.searchTerm !== '') {
        return sortedList.filter((offer) =>
          offer.carGroupInfo.modelExample.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()),
        )
      }

      return sortedList
    }

    return []
  }, [filters.orderBy, filters.searchTerm, offersListQuery])

  return (
    <Container>
      {(() => {
        if (offersListQuery.status === 'error') {
          return <div>Error: {JSON.stringify(offersListQuery.error)}</div>
        }

        if (offersListQuery.status === 'loading') {
          return <LoadingIndicator>Loading...</LoadingIndicator>
        }

        return (
          <>
            <OffersFilters />

            <Grid>
              {filteredList.map((offer) => (
                <Offer key={offer.id}>
                  <OfferTitle title={offer.carGroupInfo.modelExample.name}>
                    {offer.carGroupInfo.modelExample.name}
                  </OfferTitle>
                  <img
                    src={offer.carGroupInfo.modelExample.imageUrl}
                    onError={({ currentTarget }) => {
                      console.log(currentTarget)
                      currentTarget.onerror = null
                      currentTarget.src = VehicleFallbackImage
                    }}
                    loading="lazy"
                    draggable="false"
                  ></img>
                  <OfferPrice>
                    <span>{offer.prices.totalPrice.amount.currency}</span>
                    <span>{offer.prices.totalPrice.amount.display}</span>
                  </OfferPrice>
                </Offer>
              ))}
            </Grid>
          </>
        )
      })()}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
`

const Offer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.2rem;
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
  padding: 1rem;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: rgb(255, 95, 0);
    color: white;
  }
`

const OfferTitle = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
`

const OfferPrice = styled.div`
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LoadingIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
`

export default OffersList
