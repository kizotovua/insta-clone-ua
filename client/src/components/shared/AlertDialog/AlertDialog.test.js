import AlertDialog from "./AlertDialog";
import { render } from '@testing-library/react';
import { shallow } from "enzyme";

describe('AlertDialog', () => {
  const testFunc = jest.fn();

  it('renders', () => {
    render(<AlertDialog
      handleClose={testFunc} confirmHandler={testFunc}/>);
  });

  it('MUI Dialog receives prop "open={}"' , () => {
    const wrapper = shallow(<AlertDialog
            isOpen={false}
            handleClose={testFunc}
            confirmHandler={testFunc}/>);

    expect(wrapper.find('[data-testid="wrapper"]').prop('open')).toBeFalsy();
  });

  it('can be closed on click', () => {
    const wrapper = shallow(
      <AlertDialog handleClose={testFunc}
                   confirmHandler={testFunc}/>);
    wrapper.find('[data-testid="cancelButton"]').simulate('click');
    expect(testFunc).toHaveBeenCalledTimes(1)
  });

  it('can confirm action', () => {
    const wrapper = shallow(
      <AlertDialog handleClose={testFunc}
                   confirmHandler={testFunc}/>);
    wrapper.find('[data-testid="confirmButton"]').simulate('click');
    expect(testFunc).toHaveBeenCalledTimes(1)
  });

  it('confirm button receives disabled attribute', () => {
    const wrapper = shallow(
      <AlertDialog handleClose={testFunc}
                   confirmHandler={testFunc}
                   disabledButton={true}/>);
    expect(wrapper.find('[data-testid="confirmButton"]').props('disabled'))
      .toBeTruthy();
  });

  it('renders title and text from props', () => {
    const wrapper = shallow(
      <AlertDialog handleClose={testFunc}
                   confirmHandler={testFunc}
                   titleText={'any string'}
                   caption={'any string'} />);

    expect(wrapper.find('[data-testid="dialogTitle"]').props().children)
      .toBe('any string');
    expect(wrapper.find('[data-testid="dialogText"]').props().children)
      .toBe('any string');
  });
})