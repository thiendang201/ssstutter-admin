export type WithEmptyMessageProps = {
  message: string;
  isEmpty: boolean;
};

export const WithEmptyMessage = <T,>(Component: React.ComponentType<T>) => {
  return (props: WithEmptyMessageProps & T) => {
    const { message, isEmpty } = props;
    return isEmpty ? (
      <div className="flex">
        <p className="text-dark-grey font-medium text-sm m-auto">{message}</p>
      </div>
    ) : (
      <Component {...props} />
    );
  };
};
