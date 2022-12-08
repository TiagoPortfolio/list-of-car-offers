import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { changedOrderByFilter, getFilters, OffersFiltersState } from './slice'
import MagnifyingGlassIcon from '../../../assets/magnifier.png'
import { changedSearchTermFilter } from './slice'

function OffersFilters() {
  const filters = useSelector(getFilters)
  const dispatch = useDispatch()

  return (
    <FiltersContainer>
      <TextInputContainer>
        <img
          src={MagnifyingGlassIcon}
          alt="Search"
        />
        <TextInput
          type="text"
          value={filters.searchTerm}
          onChange={(e) => {
            dispatch(changedSearchTermFilter(e.target.value))
          }}
        />
      </TextInputContainer>
      <OrderByContainer>
        <span>Order by:</span>
        <Select
          name="orderBy"
          value={filters.orderBy}
          onChange={(e) => {
            dispatch(
              changedOrderByFilter(
                e.target.value as OffersFiltersState['orderBy'],
              ),
            )
          }}
        >
          <option value="NAME">Vehicle Name</option>
          <option value="PRICE_ASC">Lowest Price First</option>
          <option value="PRICE_DESC">Highest Price First</option>
        </Select>
      </OrderByContainer>
    </FiltersContainer>
  )
}

const FiltersContainer = styled.div`
  display: flex;
  padding: 1em;
  gap: 2em;
`

const TextInputContainer = styled.div`
  display: flex;
  flex: 1;
  place-items: center;
  gap: 0.5em;
  width: 100%;
`

const TextInput = styled.input`
  font-size: 16px;
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  width: 100%;

  &:focus {
    border-color: rgb(255, 95, 0);
  }
`

const OrderByContainer = styled.div`
  display: flex;
  place-items: center;
  gap: 0.5em;
`

const Select = styled.select`
  height: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
`

export default OffersFilters
