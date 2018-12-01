import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import * as renderer from 'react-test-renderer';
import { SKILLS_QUERY } from '../../../graphql/skills';
import { fetchSkills } from '../../../queries/skills';

jest.mock('react-dom/server', () => {}, { virtual: true });

const variables =  { term: 'name' };
const mocks = [
  {
    request: {
        query: SKILLS_QUERY,
        variables,
      },
    result: {
        data: {
          skills: [
            {
              id: 1,
              name: 'name1',
            },
          ],
        },
      },
  },
];
console.log(SKILLS_QUERY);
describe('fetchSkills', () => {
  it('succeeds to fetch skills', done => {
      class Container extends React.Component<any, any, any> {
        public componentWillReceiveProps({ skills }) {

            expect(skills.length).toBe(1);
            expect(skills[0].name).toEqual('name1');
            done();
          }

        public render() {

            return null;
          }
      }

      const ContainerWithData = fetchSkills(Container);

      renderer.create(
         <MockedProvider mocks={mocks}>
            <ContainerWithData {...variables} />
          </MockedProvider>,
        );

    });

});
