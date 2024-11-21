import { debounce } from 'lodash';
import { FunctionComponent, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

// Debounce timeout
const DEBOUNCE_TIME = 300;

type Props = {
  className?: string;
  onSearchChange: (e: string) => void;
};

const SearchBar: FunctionComponent<Props> = ({ className, onSearchChange }) => {
  // Refs
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Debounced version of callback
  const debouncedOnChange = useMemo(() => debounce(onSearchChange, DEBOUNCE_TIME), [onSearchChange]);

  // Hook invoked when input value changes
  const handleSearchChange = (e: string) => {
    // Update local state
    setSearchTerm(e);

    // Propagate value to parent
    debouncedOnChange(e);
  };

  return (
    <Form.Control
      className={className}
      type='text'
      placeholder='Filter results...'
      value={searchTerm}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
