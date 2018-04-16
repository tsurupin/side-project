import { MockedProvider } from 'react-apollo/test-utils';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MATCH_LIST_QUERY } from '../../../graphql/matches';
import { fetchMatchList } from '../../../queries/matches';

jest.mock('react-dom/server', () => {}, {virtual: true});

const mocks = [
    {
      request: {
        query: MATCH_LIST_QUERY
      },
      result: {
        data: {
          matchList: {
              likedUserList: [
                  {
                    displayName: "name",
                    mainPhotoUrl: "image_url"
                  }
              ],
              chatList: [
                  {
                      id: 1,
                      name: "name"
                  }
              ]
          }
        }
      }
    }
  ];
 
describe('fetchMatchList', () => {
    it("succeeds to fetch match list", done => {
      class Container extends React.Component<any, any, any> {
          componentWillReceiveProps(nextProps) {
              console.log(nextProps)
            expect(nextProps.matchList.likedUserList).toBeFalsy;
            done();
          }
      
          render() {
            return null;
          }
        }
      
        const ContainerWithData :any = fetchMatchList(Container);
      
        renderer.create(
          <MockedProvider mocks={mocks}>
            <ContainerWithData />
          </MockedProvider>
        );
     
    });

});