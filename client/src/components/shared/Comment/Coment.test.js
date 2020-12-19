import { render } from '@testing-library/react';
import Comment from "./Comment"
import { BrowserRouter } from 'react-router-dom';
import React from "react";

describe('Comment', () => {
  const mockFn = jest.fn();
  jest.mock("../../../utils/api/deleteComment", () => Promise.resolve({m: "ok"}))

  it('renders without crashes', () => {
    render(
      <BrowserRouter>
        <Comment text=''
                 commentID=''
                 date=''
                 username=''
                 userID=''
                 updateFn={mockFn}/>
      </BrowserRouter>);
  });
});