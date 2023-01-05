import classNames from 'classnames';
import * as React from 'react';

interface FieldContainerProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

const FieldContainer: React.FunctionComponent<FieldContainerProps> = ({
  label,
  error,
  children,
  required
}) => {
  return (
    <div>
      <label>
        {label && (
          <p className='font-medium text-xs mb-1'>
            {label} {required && <span className='text-red-400'>*</span>}
          </p>
        )}
        <div
          className={classNames([
            'border border-transparent rounded',
            error && 'border-red-400'
          ])}
        >
          {children}
        </div>
      </label>
      <p className='h-6 text-xs font-medium mt-1 text-red-400'>{error}</p>
    </div>
  );
};

export default FieldContainer;
