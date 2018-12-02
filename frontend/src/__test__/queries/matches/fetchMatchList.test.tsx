import { MockedProvider } from 'react-apollo/test-utils';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MATCH_LIST_QUERY } from '../../../graphql/matches';
import { fetchMatchList } from '../../../queries/matches';

jest.mock('react-dom/server', () => {}, { virtual: true });

const mocks = [
  {
    request: {
        query: MATCH_LIST_QUERY,
      },
    result: {
        data: {
          matchList: {
            likedUserList: [
                {
                  displayName: 'name',
                  mainPhotoUrl: 'image_url',
                },
              ],
            chatList: [
                {
                  id: 1,
                  name: 'name1',
                },
                {
                  id: 2,
                  name: 'name2',
                },
              ],
          },
        },
      },
  },
];

describe('fetchMatchList', () => {
  it('succeeds to fetch match list', done => {
      class Container extends React.Component<any, any, any> {
        componentWillReceiveProps({ matchList }) {
            const userList = matchList.likedUserList;
            const chatList = matchList.chatList;

            expect(userList.length).toBe(1);
            expect(userList[0].displayName).toEqual('name');
            expect(userList[0].mainPhotoUrl).toEqual('image_url');

            expect(chatList.length).toBe(2);

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
          </MockedProvider>,
        );

    });

});
