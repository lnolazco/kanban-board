import React from 'react';
import { shallow } from 'enzyme';

import Root from '../../app/config/Root';

describe('Root Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Root />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });
});
