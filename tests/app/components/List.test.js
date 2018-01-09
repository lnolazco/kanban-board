import React from 'react';
import { shallow } from 'enzyme';

import Table from '../../../app/components/Table';

const props = {
  headers: ['label 1', 'label 2'],
  data: [<div key="user1">user 1</div>, <div key="user2">user 2</div>],
};

describe('Table Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Table {...props} />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should have a table class', () => {
    expect(wrapper.find('.table').length);
  });

  it('should have a header section', () => {
    expect(wrapper.find('.table__head').length);
  });

  it('should add 2 headers', () => {
    expect(wrapper.find('.table__head th').length).toBe(2);
  });

  it('should have a body', () => {
    expect(wrapper.find('.table__body').length);
  });
});
