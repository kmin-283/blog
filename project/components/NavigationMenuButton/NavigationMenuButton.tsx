import React, {FC, useState} from 'react';
import HierarchicalList from '@/components/HierarchicalList/HierarchicalList';
import styles from './NavigationMenuButton.module.css';

export interface NavigationMenuButtonProps {
  internalLinks: string;
}

const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({internalLinks, children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <div className={styles.navMenuButton}>
      <button className={styles.button} id='menubutton' aria-haspopup='true' aria-expanded={isOpen} onClick={openMenu}>
        <p>{children}</p>
      </button>
      {isOpen && <HierarchicalList role='menu' labelledBy='menubutton' internalLinks={internalLinks}/>}
    </div>
  );
};

export default NavigationMenuButton;
