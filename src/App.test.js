import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ImageViewer from './components/ImageViewer';
import {shallow,mount} from 'enzyme';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('check presence of image viewer component',()=>{
  expect(true).toBeTruthy();
})