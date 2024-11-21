import { FunctionComponent } from 'react';
import { Modal } from 'react-bootstrap';
import PokemonDetails from './PokemonDetails';

type Props = {
  id: string;
  isOpen: boolean;
  toggle: () => void;
};

const PokemonDetailsModal: FunctionComponent<Props> = ({ id, isOpen, toggle }) => {
  return (
    <Modal size='xl' show={isOpen} onHide={toggle}>
      <PokemonDetails id={id} onBackClick={toggle} />
    </Modal>
  );
};

export default PokemonDetailsModal;
