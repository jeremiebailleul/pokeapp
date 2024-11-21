import { FunctionComponent, useMemo, useState } from 'react';
import { Alert, Spinner, Row, Col, Form, Button } from 'react-bootstrap';
import { usePokemons } from '../hooks/usePokemons';
import { extractIdFromUrl } from '../utils/utils';
import PokemonListCard from './PokemonListCard';
import PokemonDetailsModal from './PokemonDetailsModal';

const LIMITS = [20, 50, 150, 1000];

type Props = {
  searchTerm: string;
};

const PokemonList: FunctionComponent<Props> = ({ searchTerm }) => {
  // State
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  // Fetch data
  const { data, error, isLoading } = usePokemons(offset, limit);

  // Pagination
  const next = data?.next;
  const previous = data?.previous;

  // Extract pokemons from results
  const pokemons = data?.results;

  // Filtered pokemon against search term
  const filteredPokemons = useMemo(
    () => pokemons?.filter((e) => e.name.toUpperCase().includes(searchTerm.toUpperCase())),
    [pokemons, searchTerm]
  );

  // Invoked when a pokemon card is clicked
  const handleCardClick = (id: string) => {
    setSelectedId(id);
    setIsDetailsModalOpen(true);
  };

  // Error handling
  if (error) return <Alert variant='danger'>An error occured while fetching the data: {error.message}</Alert>;

  return (
    <>
      {/* Pagination */}
      <div className='mb-4 d-flex justify-content-between'>
        {/* Records per page */}
        <div className='d-flex align-items-center gap-2'>
          <Form.Select
            value={limit}
            onChange={(e) => {
              setLimit(+e.target.value);
              setOffset(0);
            }}
          >
            {LIMITS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
          <div className='text-nowrap'>results per page</div>
        </div>

        {/* Previous/Next */}
        <div>
          <Button className='me-1' variant='secondary' disabled={!previous} onClick={() => setOffset((e) => e - limit)}>
            &#10094;
          </Button>
          <Button className='ms-1' variant='secondary' disabled={!next} onClick={() => setOffset((e) => e + limit)}>
            &#10095;
          </Button>
        </div>
      </div>

      {/* Pokemon list */}
      {isLoading ? (
        <Spinner animation='border' role='status' />
      ) : (
        <Row className='list'>
          {filteredPokemons?.length ? (
            filteredPokemons?.map((e) => {
              const id = extractIdFromUrl(e.url);
              return (
                <Col key={e.name} xs={12} sm={6} md={4} lg={3} className='mb-4'>
                  <PokemonListCard id={id} name={e.name} onClick={() => handleCardClick(id)} />
                </Col>
              );
            })
          ) : (
            <p>No results</p>
          )}
        </Row>
      )}

      {/* Details Modal */}
      {selectedId && (
        <PokemonDetailsModal
          id={selectedId}
          isOpen={isDetailsModalOpen}
          toggle={() => setIsDetailsModalOpen((e) => !e)}
        />
      )}
    </>
  );
};

export default PokemonList;
