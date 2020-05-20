/**
 * What is purpose of this file?
 * https://stackoverflow.com/questions/55344422/what-is-adapter-in-enzyme
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
