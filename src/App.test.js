import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Header from './layouts/home/Header'

describe('#App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });

  it('has header', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<Header />)).toBe(true)
  })

})
