import { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';
import { padStart } from 'lodash';
import { getImgUrl } from '../utils/utils';

type Props = {
  id: string;
  name: string;
  onClick: () => void;
};

const PokemonListCard: FunctionComponent<Props> = ({ id, name, onClick }) => {
  return (
    <Card className='pokemon-card bg-primary-subtle p-4 shadow' onClick={onClick}>
      <div className='d-flex justify-content-end text-underline'>#{padStart(id, 3, '0')}</div>
      <img className='mw-100 mh-100' src={getImgUrl(id)} />
      <h4 className='text-capitalize'>{name}</h4>
    </Card>
  );
};

export default PokemonListCard;
