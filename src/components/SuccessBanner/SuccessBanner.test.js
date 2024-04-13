import React from 'react';
import { render } from '@testing-library/react';
import SuccessBanner from './SuccessBanner';

describe('SuccessBanner component', () => {
  it('renders with the correct message', () => {
    const message = 'Success! Your action was completed.';
    const { getByRole } = render(<SuccessBanner message={message} />);
    const successBanner = getByRole('alert');

    expect(successBanner).toBeInTheDocument();
    expect(successBanner).toHaveTextContent(message);
    expect(successBanner).toHaveClass('alert-success');
  });
});
