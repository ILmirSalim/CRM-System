import React, { ReactNode } from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void
  children: ReactNode
  className?: string
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}