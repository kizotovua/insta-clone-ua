import CommentTextArea from "./CommentTextArea";
import { render } from '@testing-library/react';
import { shallow } from "enzyme";

describe('CommentTextArea', () => {
  const mockFn = jest.fn();

  it('renders without crashes', () => {
    render(<CommentTextArea changeHandler={mockFn}
                            disabled={false}
                            submitFn={mockFn}/>);

  });

  it('runs func on change', () => {
    const wrapper = shallow(<CommentTextArea changeHandler={mockFn}
                            disabled={false}
                            submitFn={mockFn}/>);


    wrapper.find('[data-testid="input"]').first().simulate('change');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('runs func on click', () => {
    const wrapper = shallow(<CommentTextArea changeHandler={mockFn}
                                             disabled={false}
                                             submitFn={mockFn}/>);


    wrapper.find('[data-testid="button"]').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('runs func on click', () => {
    const wrapper = shallow(<CommentTextArea changeHandler={mockFn}
                                             disabled={true}
                                             submitFn={mockFn}/>);


    expect(wrapper.find('[data-testid="button"]').prop('disabled')).toBeTruthy();

  });

})