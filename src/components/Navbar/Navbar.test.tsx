import * as React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';

describe.skip('<Navbar>', () => {
  it('renders without crashing', () => {
    shallow(<Navbar />);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Navbar />);

    expect(wrapper).toMatchSnapshot();
  });
});
