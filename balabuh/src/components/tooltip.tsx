import React from 'react';

export function Tooltip({
  tooltip,
  children,
}: {
  tooltip: { text: string; placement: 'left' | 'bottom' };
  children: React.ReactNode;
}) {
  const child = React.Children.only(children);
}
