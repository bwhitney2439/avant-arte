import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

interface Props {
  children: React.ReactNode;
  query: UseQueryResult<any, Error>;
}
const View = ({ children, query }: Props) => {
  const { isLoading, isError, error } = query;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return <>{children}</>;
};

export default View;
