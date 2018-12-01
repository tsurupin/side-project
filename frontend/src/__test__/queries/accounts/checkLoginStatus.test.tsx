import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import * as renderer from 'react-test-renderer';
import { LOGIN_STATUS_QUERY } from '../../../graphql/accounts';
import checkLoginStatus from '../../../queries/accounts/checkLoginStatus';

jest.mock('react-dom/server', () => {}, { virtual: true });

const mocks = [
  {
    request: {
        query: LOGIN_STATUS_QUERY,
      },
    result: {
        data: {
          loginStatus: {
            logined: false,
          },
        },
      },
  },
];

describe('CheckLoginStatusQuery', () => {
  it('checkLoginStatus', done => {
      class Container extends React.Component<any, any, any> {
        public componentWillReceiveProps(nextProps) {
            expect(nextProps.loginStatus.loading).toBeFalsy;
            done();
          }

        public render() {
            return null;
          }
      }

      const ContainerWithData :any = checkLoginStatus(Container);

      renderer.create(
          <MockedProvider mocks={mocks}>
            <ContainerWithData />
          </MockedProvider>,
        );

    });

});
