import React from 'react';
import { shallow } from 'enzyme';

import { AppContainer } from '../../../app/components/App';

const props = {
  users: [
    { id: 1, firstname: 'demo1', surname: 'demo1' },
    { id: 2, firstname: 'demo2', surname: 'demo2' },
  ],
  getAll: () => {},
  update: () => {},
  addUser: () => {},
  deleteUser: () => {},
};

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppContainer {...props} />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should have one header', () => {
    expect(wrapper.find('.app__header').length);
  });

  it('should add a Table component', () => {
    expect(wrapper.find('Table').length);
  });
});
