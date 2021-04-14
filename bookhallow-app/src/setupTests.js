// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
