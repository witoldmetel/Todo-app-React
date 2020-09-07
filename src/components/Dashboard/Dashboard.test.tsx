import * as React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

describe.skip('<Dashboard>', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper).toMatchSnapshot();
  });
});
