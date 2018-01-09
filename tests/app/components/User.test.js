import React from 'react';
import { shallow } from 'enzyme';

import User from '../../../app/components/User';

const props = {
  id: 1,
  firstname: 'demo',
  surname: 'test',
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
};

describe('List Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<User {...props} />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should update the state firstname when the text has changed', () => {
    const btn = wrapper.find('input').at(0);
    btn.simulate('change', { target: { value: 'firstname test' } });
    expect(wrapper.state().firstname).toBe('firstname test');
  });

  it('should update the state surname when the text has changed', () => {
    const btn = wrapper.find('input').at(1);
    btn.simulate('change', { target: { value: 'surname test' } });
    expect(wrapper.state().surname).toBe('surname test');
  });

  it('should call onUpdate prop function when the button update is clicked', () => {
    const btn = wrapper.find('.btn--primary');
    btn.simulate('click');
    expect(props.onUpdate).toHaveBeenCalled();
  });

  it('should call onDelete props function when the button delete is clicked', () => {
    const btn = wrapper.find('.btn--secondary');
    btn.simulate('click');
    expect(props.onDelete).toHaveBeenCalled();
  });
});
