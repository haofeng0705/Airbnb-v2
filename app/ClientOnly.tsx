'use client';

/* Here is the explanation for the code above:
1. We use React hooks to run a side effect only after the component has mounted.
2. We use the state variable to conditionally render the children only after the component has mounted.
3. We render the component with a wrapping <></> fragment to avoid introducing an extra node to the DOM. */
import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly;
