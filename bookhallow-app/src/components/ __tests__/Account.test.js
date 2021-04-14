import React from 'react';
import { shallow } from 'enzyme';
import Account from '../Account';
describe('Account', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Account />);

    expect(component).toMatchSnapshot();
  });
});
