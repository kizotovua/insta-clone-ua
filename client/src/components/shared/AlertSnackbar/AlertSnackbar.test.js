import AlertSnackbar from "./AlertSnackbar";
import { render } from '@testing-library/react';
import { mount } from "enzyme";

describe('AlertSnackbar', () => {

  it('renders without crashes', () => {
    render(<AlertSnackbar />)
  });

  it('Snackbar is opened and has duration time', () => {
    const wrapper = mount(
        <AlertSnackbar timeout={1000}
                       status='any string'
                       msgType="error"/>);

    expect(wrapper.find('[data-testid=\'snackBar\']').first().props().open)
      .toBeTruthy();

    expect(wrapper.find('[data-testid=\'snackBar\']').first().props().autoHideDuration)
      .toEqual(1000)
    });
});