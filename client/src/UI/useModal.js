import { useState } from 'react';

export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    console.log('toggle');
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
}
