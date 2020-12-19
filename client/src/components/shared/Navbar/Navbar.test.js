import Navbar from "./Navbar";
import { shallow } from "enzyme";
describe('Navmenu', () => {
  it('Navbar shallow test', () => {
    shallow(<Navbar />);
  })
})
