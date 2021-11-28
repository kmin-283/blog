import React, {FC, useState} from 'react';
import HierarchicalList from '@/components/HierarchicalList/HierarchicalList';

export interface NavigationMenuButtonProps {
  internalLinks: string;
}


const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({internalLinks}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <div>
      <button id='menuButton' aria-haspopup='true' aria-expanded={isOpen} onClick={openMenu}>
        a
      </button>
      {isOpen && <HierarchicalList labelledBy='menuButton' internalLinks={internalLinks}/>}
    </div>
  );
};

export default NavigationMenuButton;
