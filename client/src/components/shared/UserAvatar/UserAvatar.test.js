import { shallow } from 'enzyme';
import UserAvatar from "./UserAvatar";
import {ProfileContext} from "../../../context/ProfileContext";

it('UserAvatar', () => {

  const profile = {
    avatar: 'image.jpg'
  }

  const component  = shallow(
    <ProfileContext.Provider value={profile}>
      <UserAvatar classname="123"/>
    </ProfileContext.Provider>
    );
  expect(component.prop('classname')).toBe('123');
})