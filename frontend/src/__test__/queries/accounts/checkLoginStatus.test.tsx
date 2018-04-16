import { MockedProvider } from 'react-apollo/test-utils';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { LOGIN_STATUS_QUERY } from '../../../graphql/accounts';
import checkLoginStatus from '../../../queries/accounts/checkLoginStatus';

jest.mock('react-dom/server', () => {}, {virtual: true});

const mocks = [
    {
      request: {
        query: LOGIN_STATUS_QUERY
      },
      result: {
        data: {
          loginStatus: {
            logined: false
          }
        }
      }
    }
  ];
 
  
describe('CheckLoginStatusQuery', () => {
    it("checkLoginStatus", () => {
      class Container extends React.Component<any, any, any> {
          componentWillReceiveProps(nextProps) {
            expect(nextProps.loginStatus.loading).toBeFalsy
          }
      
          render() {
            return null;
          }
        }
      
        const ContainerWithData :any = checkLoginStatus(Container);
      
        renderer.create(
          <MockedProvider mocks={mocks}>
            <ContainerWithData />
          </MockedProvider>
        );
     
    });

})