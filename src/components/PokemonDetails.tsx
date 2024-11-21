import { Alert, Badge, Card, Col, Row, Spinner } from 'react-bootstrap';
import { usePokemon } from '../hooks/usePokemon';
import { getImgUrl } from '../utils/utils';
import { padStart } from 'lodash';
import { FunctionComponent } from 'react';

type Props = {
  id: string;
  onBackClick: () => void;
};

const PokemonDetails: FunctionComponent<Props> = ({ id, onBackClick }) => {
  // Fetch pokemon data
  const { data, error, isLoading } = usePokemon(id);

  return (
    <Card className='pokemon-card bg-primary-subtle p-4'>
      <div className='d-flex justify-content-end'>
        <a role='button' onClick={onBackClick}>
          &#10005;
        </a>
      </div>

      {isLoading ? (
        <div className='text-center'>
          <Spinner animation='border' role='status' />
        </div>
      ) : error || !data ? (
        <div className='text-center'>
          <Alert variant='danger'>An error occured while fetching the data: {error?.message}</Alert>
        </div>
      ) : (
        <>
          <Row>
            <Col xs='12' md='8' className='text-center'>
              {id && <img className='mw-100 mh-100' src={getImgUrl(id)} />}
            </Col>
            <Col xs='12' md='4' className='text-start'>
              {/* Id */}
              <h5 className='text-underline'>#{padStart(id, 3, '0')}</h5>

              {/* Name */}
              <h2 className='fw-bold text-capitalize'>{data.name}</h2>

              {/* Types */}
              {data.types.map((e) => (
                <Badge key={e.type.name} className='me-1 text-capitalize'>
                  {e.type.name}
                </Badge>
              ))}

              {/* Pokemon Size */}
              <Row className='mt-4 mw-100'>
                <Col xs='6'>
                  <div className='w-100 m-1 p-2 d-flex justify-content-between bg-info rounded'>
                    <div className='fw-bold'>Height</div>
                    <div>{data.height}</div>
                  </div>
                </Col>

                <Col xs='6'>
                  <div className='w-100 m-1 p-2 d-flex justify-content-between bg-info rounded'>
                    <div className='fw-bold'>Weight</div>
                    <div>{data.weight}</div>
                  </div>
                </Col>
              </Row>

              {/* Abilities*/}
              <h3 className='mt-4'>Abilities</h3>
              <Row className='mw-100'>
                {data.abilities.map((e) => (
                  <Col key={e.ability.name} xs='6'>
                    <div className='w-100 m-1 p-2 text-center bg-info rounded text-capitalize fw-bold'>
                      {e.ability.name}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default PokemonDetails;
