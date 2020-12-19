import Feed from "./Feed";
import { act, render } from '@testing-library/react';

jest.mock('../../utils/api/fetchPosts', () => jest.fn());
const subscriptionsTest = {
  recommendations: [1,2,2,3],
  following: [5,6,7,8]
}

it('Feed',  () => {

 act (() => {
      render(<Feed subscriptions={subscriptionsTest} />);
  });

})