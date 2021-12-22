import * as React from 'react';
import { useSelect, SelectOption } from '@mui/base';
import { styled } from '@mui/system';

const Root = styled('div')`
  position: relative;
  display: inline-block;
  vertical-align: baseline;
`;

const Toggle = styled('div')`
  min-width: 150px;
  min-height: calc(1.5em + 10px);
  padding: 5px;
  background: var(--color, #333);
  box-shadow: 0 5px 13px -3px var(--color, #333);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #fff;
  cursor: default;

  & .placeholder {
    opacity: 0.5;
  }
`;

const Listbox = styled('ul')`
  background: #eee;
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  position: absolute;
  height: auto;
  transition: opacity 0.1s ease;
  width: 100%;
  box-shadow: 0 5px 13px -3px #333;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end;
  }

  & > li {
    padding: 5px;

    &:hover {
      background: #ccc;
    }
  }
`;

interface Props {
  options: SelectOption<string>[];
}

function CustomSelect({ options }: Props) {
  const { getButtonProps, getListboxProps, getOptionProps, value } = useSelect({
    options,
  });

  const [listboxVisible, setListboxVisible] = React.useState(false);

  return (
    <Root
      onMouseOver={() => setListboxVisible(true)}
      onMouseOut={() => setListboxVisible(false)}
      onFocus={() => setListboxVisible(true)}
      onBlur={() => setListboxVisible(false)}
    >
      <Toggle {...getButtonProps()} style={{ '--color': value } as any}>
        {value ?? <span className="placeholder">nothing selected</span>}
      </Toggle>
      <Listbox {...getListboxProps()} className={listboxVisible ? '' : 'hidden'}>
        {options.map((option) => (
          <li key={option.value} {...getOptionProps(option)}>
            {option.label}
          </li>
        ))}
      </Listbox>
    </Root>
  );
}

const options = [
  {
    label: 'Red',
    value: '#D32F2F',
    index: 0,
  },
  {
    label: 'Green',
    value: '#4CAF50',
    index: 1,
  },
  {
    label: 'Blue',
    value: '#2196F3',
    index: 2,
  },
];

export default function UseSelect() {
  return (
    <p>
      Select a color: <CustomSelect options={options} />
    </p>
  );
}
