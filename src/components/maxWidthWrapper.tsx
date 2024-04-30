import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const defaultClassName = 'mx-auto w-full max-w-screen-xl px-2.5 md:px-20';
  
  const combinedClassName = className ? `${defaultClassName} ${className}` : defaultClassName;
  
  return <div className={combinedClassName}>
    {children}
  </div>;
};

export default MaxWidthWrapper;
