import * as React from 'react';
import { shallow } from 'enzyme';

import { RandomAvatar } from './RandomAvatar';

describe('<RandomAvatar>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RandomAvatar randomFace={'randomFace'} />);

    expect(wrapper).toMatchSnapshot();
  });
});
